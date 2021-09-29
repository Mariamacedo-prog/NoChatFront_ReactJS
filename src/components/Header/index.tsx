import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Search, Menu, Button } from "./styles";
import { doLogout } from "../../helpers/Auth";
import NoChat from "../../assets/nochat-logo.png";
import useApi from "../../helpers/Api";
import { Dispatch } from "redux";
import { StateUser } from "../../reducers/UserReducer";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiFillFileAdd,
} from "react-icons/ai";
import { connect } from "react-redux";
import { IoMdNotifications, IoMdChatboxes } from "react-icons/io";

const Header = (props: any) => {
  const api = useApi();
  const [user, setUser] = useState({} as StateUser);

  useEffect(() => {
    const getUserInformation = async () => {
      const info = await api.userInfo();
      props.setName(`${info.name}`);
      props.setEmail(`${info.email}`);
      props.setId(`${info._id}`);
      props.setFollowers(info.followers);
      props.setFollowings(info.followings);
      props.setChats(info.chats);
      props.setPublications(info.publications);

      if (info.description) {
        props.setDescription(`${info.description}`);
      }
      if (info.avatar) {
        props.setAvatar(`${info.avatar}`);
      }
      setUser(info);
    };
    getUserInformation();
  }, [api]);

  console.log(user);

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
                  src={`https://nochat-api.herokuapp.com/media/${props.avatar}`}
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
  return {
    setName: (name: string) =>
      dispatch({
        type: "SET_NAME",
        payload: name,
      }),
    setEmail: (email: string) =>
      dispatch({
        type: "SET_EMAIL",
        payload: email,
      }),
    setId: (id: string) =>
      dispatch({
        type: "SET_ID",
        payload: id,
      }),
    setDescription: (description: string) =>
      dispatch({
        type: "SET_DESCRIPTION",
        payload: description,
      }),
    setAvatar: (avatar: string) =>
      dispatch({
        type: "SET_AVATAR",
        payload: avatar,
      }),
    setFollowers: (followers: []) =>
      dispatch({
        type: "SET_FOLLOWERS",
        payload: followers,
      }),
    setFollowings: (followings: []) =>
      dispatch({
        type: "SET_FOLLOWINGS",
        payload: followings,
      }),
    setChats: (chats: []) =>
      dispatch({
        type: "SET_CHATS",
        payload: chats,
      }),
    setPublications: (publications: []) =>
      dispatch({
        type: "SET_PUBLICATIONS",
        payload: publications,
      }),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Header);
