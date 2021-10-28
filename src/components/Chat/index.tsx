import React, { useState, useEffect, useRef } from "react";
import useApi from "../../helpers/Api";
import { Link } from "react-router-dom";
import { ChatUser, StateUser } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai";
import io from "socket.io-client";
import * as C from "./styles";

type socketUsers = {
  userId: string;
  socketId: string;
};
interface MessageData {
  author: string;
  date: string;
  id: string;
  msg: string;
  type: string;
  to: string;
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
  const [currentUser, setCurrentUser] = useState({} as StateUser);
  const [errors, setErrors] = useState("");
  const [chat, setChat] = useState({} as ChatData);
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState(false);
  const [chatMessages, setChatMessages] = useState([] as MessageData[]);
  const socket: any = useRef();

  useEffect(() => {
    if (errors !== "") {
      toast.error(errors, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errors]);

  useEffect(() => {
    socket.current = io("https://nochat-api.herokuapp.com");
  }, [chat, props._id, message]);

  useEffect(() => {
    socket.current.emit("addUser", props._id);
  }, [props._id, message]);

  useEffect(() => {
    const newChat = async () => {
      if (props.chatSelected !== "") {
        const json = await api.newChat(props.chatSelected);
        if (json.error) {
          setErrors(json.error);
        } else {
          setChat(json);
          setChatMessages(json.chat.messages);
        }
      }
    };
    newChat();
  }, [api, props.chatSelected, message]);

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

  //Para verificar onde esta a barra de rolagem e descer para o final da conversa.
  useEffect(() => {
    let body = document.getElementById("scrollConversation");
    if (body) {
      if (body.scrollHeight > body.offsetHeight) {
        body.scrollTop = body.scrollHeight - body.offsetHeight;
      }
    }
  }, [chatMessages]);

  const handleHour = (date: string) => {
    const newDate = new Date(date);
    const minutes =
      newDate.getMinutes() < 10
        ? `0${newDate.getMinutes()}`
        : newDate.getMinutes();
    const time = `${newDate.getHours()}:${minutes}`;
    return `${time}`;
  };
  const newChat = async (id: string) => {
    props.setChatOpen(true);
    props.setSelectedChat(id);
  };

  const handleInputKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      handleMessage(chat.chat.users.filter((item) => item !== props._id)[0]);
      setMsg("");
    }
  };

  const handleMessage = async (id: string) => {
    setErrors("");
    const json = await api.sendMessage(msg, id);

    if (json.error) {
      setErrors(json.error);
    } else {
      setMsg("");
      message === true ? setMessage(false) : setMessage(true);

      socket.current.on("getMessage", (newMessage: MessageData) => {
        if (id) {
          if (newMessage.author === id) {
            message === true ? setMessage(false) : setMessage(true);
          }
        }
      });

      return json;
    }
  };

  const deleteMessage = async (id: string) => {
    setErrors("");
    const json = await api.deleteMessage(id);

    if (json.error) {
      setErrors(json.error);
    } else {
      message === true ? setMessage(false) : setMessage(true);
      return json;
    }
  };

  return (
    <C.Container>
      <C.ListChatContainer>
        {errors !== "" && (
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"dark"}
          />
        )}
        {currentUser.chats &&
          currentUser.chats.map((item: ChatUser) => (
            <C.ListChatItem key={item.id} onClick={() => newChat(item.with)}>
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
            </C.ListChatItem>
          ))}
      </C.ListChatContainer>

      {chat && (
        <C.ChatConversation className={props.isChatOpen ? "opened" : "closed"}>
          <C.BackButton onClick={() => props.setChatOpen(false)}>
            <AiOutlineArrowLeft />
          </C.BackButton>
          {chat.chat && chat.userInfo && (
            <C.ChatContainer>
              <C.UserInfo>
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
              </C.UserInfo>
              <C.MessagesContainer id="scrollConversation">
                {chatMessages &&
                  chatMessages.map((message: MessageData) => (
                    <C.MessageItem
                      key={message.id}
                      className={
                        message.author === props._id
                          ? "myMessage"
                          : "anotherUserMessage"
                      }
                    >
                      {message.author === props._id &&
                        message.type === "text" && (
                          <AiFillDelete
                            onClick={() => deleteMessage(message.id)}
                          />
                        )}
                      <p className={message.type}>{message.msg}</p>
                      <small>{handleHour(message.date)}</small>
                    </C.MessageItem>
                  ))}
              </C.MessagesContainer>
              <C.InputMessageArea>
                <input
                  type="text"
                  name="msg"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyUp={handleInputKeyUp}
                />

                <button
                  onClick={() =>
                    handleMessage(
                      chat.chat.users.filter((item) => item !== props._id)[0]
                    )
                  }
                >
                  Enviar
                </button>
              </C.InputMessageArea>
            </C.ChatContainer>
          )}
        </C.ChatConversation>
      )}
    </C.Container>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
