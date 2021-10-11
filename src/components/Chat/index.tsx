import React, { useState, useEffect } from "react";
import useApi from "../../helpers/Api";
import { Link } from "react-router-dom";
import { ChatUser, StateUser } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  Container,
  ChatConversarion,
  ListChatItem,
  ListChatContainer,
  BackButton,
  ChatContainter,
  UserInfo,
  MessagesContainter,
  InputMessageArea,
  MessageItem,
} from "./styles";

interface MessageData {
  author: string;
  date: string;
  id: string;
  msg: string;
  type: string;
}

interface ChatData {
  userInfo: {
    username: string;
    avatar?: string;
  };
  chat: {
    messages: MessageData[];
    users: [];
    _id: string;
  };
}

const Chat: React.FC = (props: any) => {
  const api = useApi();
  const [userOpenedChatId, setUserOpenedChatId] = useState("");
  const [currentUser, setCurrentUser] = useState({} as StateUser);
  const [errors, setErrors] = useState("");
  const [chat, setChat] = useState({} as ChatData);

  useEffect(() => {
    const newChat = async () => {
      if (props.chatSelected !== "") {
        const json = await api.newChat(props.chatSelected);
        if (json.error) {
          setErrors(json.error);
        } else {
          setChat(json);
          props.setChatOpen(true);
        }
      }
    };
    newChat();
  }, [api, props.chatSelected]);

  const handleHour = (date: string) => {
    const newDate = new Date(date);
    const minutes =
      newDate.getMinutes() < 10
        ? `0${newDate.getMinutes()}`
        : newDate.getMinutes();
    const time = `${newDate.getHours()}:${minutes}`;
    return `${time}`;
  };

  useEffect(() => {
    const getUserInformation = async () => {
      const json = await api.userInfo();
      if (json.error) {
        setErrors(json.error);
      } else {
        setCurrentUser(json);
      }
    };
    getUserInformation();
  }, [api]);

  return (
    <Container>
      <ListChatContainer>
        {currentUser.chats &&
          currentUser.chats.map((item: ChatUser) => (
            <ListChatItem key={item.id}>
              {item.avatar === "noChat.jpg" ? (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLuox6vatPBS6w8edvrLbqXzHimyKXOVejMQ&usqp=CAU"
                  alt={item.title}
                />
              ) : (
                <img src={item.avatar} alt={item.title} />
              )}
              <div>
                <h2>{item.title}</h2>
                <p>{item.lastMessage}</p>
              </div>
              <small>{handleHour(item.lastMessageDate)}</small>
            </ListChatItem>
          ))}
      </ListChatContainer>

      {chat && (
        <ChatConversarion className={props.isChatOpen ? "opened" : "closed"}>
          <BackButton onClick={() => props.setChatOpen(false)}>
            <AiOutlineArrowLeft />
          </BackButton>
          {chat.chat && chat.userInfo && (
            <ChatContainter>
              <UserInfo>
                {chat.userInfo.avatar ? (
                  <img
                    src={chat.userInfo.avatar}
                    alt={`foto de perfil de ${chat.userInfo.username}`}
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Avatar"
                  />
                )}
                <Link to={`/user/${chat.userInfo.username}`}>
                  {chat.userInfo.username}
                </Link>
              </UserInfo>
              <MessagesContainter>
                {chat.chat.messages &&
                  chat.chat.messages.map((message: MessageData) => (
                    <MessageItem
                      key={message.id}
                      className={
                        message.author === props._id
                          ? "myMessage"
                          : "anotherUserMessage"
                      }
                    >
                      <p className={message.type}>{message.msg}</p>
                      <small>{handleHour(message.date)}</small>
                    </MessageItem>
                  ))}
              </MessagesContainter>
              <InputMessageArea>input</InputMessageArea>
            </ChatContainter>
          )}
        </ChatConversarion>
      )}
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: state.user.name,
    _id: state.user._id,
    avatar: state.user.avatar,
    isChatOpen: state.user.isChatOpen,
    chatSelected: state.user.chatSelected,
  };
};

const mapDispachToProps = (dispatch: Dispatch) => {
  return {
    setChatOpen: (status: boolean) =>
      dispatch({
        type: "OPEN_CHAT",
        payload: status,
      }),
    setSelectedChat: (chat: {}) =>
      dispatch({
        type: "SET_CHAT_SELECTED",
        payload: chat,
      }),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Chat);
