import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiFillFileAdd,
  AiFillWechat,
} from "react-icons/ai";
import { IoMdChatboxes } from "react-icons/io";
import { doLogout } from "../../helpers/Auth";
import NoChat from "../../assets/nochat-logo.png";
import Error from "../Error";

import useApi from "../../helpers/Api";
import Chat from "../Chat";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Container, Search, Menu, Button, SearchArea } from "./styles";

const Header = (props: any) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const [users, setUsers] = useState([] as any);
  const [q, setQ] = useState("");
  const api = useApi();
  const hadleLogout = () => {
    doLogout();
    window.location.href = "/signin";
  };

  // wait user stop typing to search
  let typingTimer: any;
  let interval = 2000;

  const userIsWriting = () => {
    clearTimeout(typingTimer);
  };

  const getUsers = async () => {
    const json = await api.getUsers(q);
    if (json.error) {
      setErrors(json.error);
    } else {
      setUsers(json.users);
    }
  };

  const userWrote = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(getUsers, interval);
  };

  const closingSearchArea = () => {
    setTimeout(() => setOpen(false), 500);
  };

  const openingChatArea = () => {
    if (props.openChat === true) {
      props.setOpenChat(false);
    } else {
      props.setOpenChat(true);
    }
  };

  const newChat = async (id: string) => {
    props.setChatOpen(true);
    props.setSelectedChat(id);
    props.setOpenChat(true);
  };

  return (
    <>
      <Container>
        <Link to="/">
          <img src={NoChat} alt="NoChat logo" />
        </Link>
        <Search>
          <AiOutlineSearch id="searchSvg"/>
          <input
            type="text"
            placeholder="Pesquisar..."
            onFocus={() => setOpen(true)}
            onBlur={closingSearchArea}
            onKeyUp={userWrote}
            onKeyDown={userIsWriting}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {open && (
            <SearchArea>
              {errors !== "" && <Error error={errors} />}
              {users &&
                users.map((user: any) => (
                  <div key={user._id}>
                    <Link to={`/user/${user.name}`} className="seachItem">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={`foto de perfil de ${user.name}`}
                        />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="Avatar"
                        />
                      )}
                      <p>
                        {user.name} <br />
                        <small>{user.email}</small>
                      </p>
                    </Link>
                    {user._id !== props._id && (
                      <AiFillWechat
                        className="buttonNewChat"
                        onClick={() => newChat(user._id)}
                      />
                    )}
                  </div>
                ))}
            </SearchArea>
          )}
        </Search>
        <Menu>
          <ul>
            <li id="homeMenuButton">
              <Link to="/">
                <AiOutlineHome />
              </Link>
              <p>Home</p>
            </li>
            <li>
              <Link to="/addpost">
                <AiFillFileAdd />
              </Link>
              <p>Publicar</p>
            </li>
            <li>
              <IoMdChatboxes onClick={openingChatArea} />
              <p>Chat</p>
            </li>
            <li>
              <Link to="/profile">
                {props.avatar !== "" ? (
                  <img
                    src={`${props.avatar}`}
                    alt={`foto de perfil de ${props.name}`}
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Avatar"
                  />
                )}
                <p>Meu perfil</p>
              </Link>
            </li>
          </ul>
        </Menu>
        <Button onClick={hadleLogout}>
          <p>
            <AiOutlineLogout />
            SAIR
          </p>
        </Button>
      </Container>
    </>
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
export default connect(mapStateToProps, mapDispachToProps)(Header);
