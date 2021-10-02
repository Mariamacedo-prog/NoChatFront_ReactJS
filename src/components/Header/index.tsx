import React from "react";
import { Link } from "react-router-dom";
import { Container, Search, Menu, Button } from "./styles";
import { doLogout } from "../../helpers/Auth";
import NoChat from "../../assets/nochat-logo.png";
import { Dispatch } from "redux";

import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiFillFileAdd,
} from "react-icons/ai";
import { connect } from "react-redux";
import { IoMdNotifications, IoMdChatboxes } from "react-icons/io";

const Header = (props: any) => {
  const hadleLogout = () => {
    doLogout();
    window.location.href = "/signin";
  };

  return (
    <Container>
      <Link to="/">
        <img src={NoChat} alt="NoChat logo" />
      </Link>
      <Search>
        <AiOutlineSearch />
        <input type="text" placeholder="Pesquisar..." />
      </Search>
      <Menu>
        <ul>
          <li>
            <Link to="/">
              <AiOutlineHome />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <AiFillFileAdd />
              <p>Publicar</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoMdChatboxes />
              <p>Chat</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoMdNotifications />
              <p>Notificações</p>
            </Link>
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
        <AiOutlineLogout /> SAIR
      </Button>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: state.user.name,
    email: state.user.email,
    _id: state.user._id,
    description: state.user.description,
    avatar: state.user.avatar,

    publications: state.user.publications,
    chats: state.user.chats,
    followers: state.user.followers,
    followings: state.user.followings,
  };
};

const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispachToProps)(Header);
