import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiFillFileAdd,
} from "react-icons/ai";
import { IoMdNotifications, IoMdChatboxes } from "react-icons/io";
import { doLogout } from "../../helpers/Auth";
import NoChat from "../../assets/nochat-logo.png";
import Error from "../Error";
import { Dispatch } from "redux";
import useApi from "../../helpers/Api";
import { connect } from "react-redux";
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

  // wait user write to search
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

  return (
    <Container>
      <Link to="/">
        <img src={NoChat} alt="NoChat logo" />
      </Link>
      <Search>
        <AiOutlineSearch />
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
              users.map((item: any) => (
                <Link
                  to={`/user/${item.name}`}
                  className="seachItem"
                  key={item._id}
                >
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={`foto de perfil de ${item.name}`}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="Avatar"
                    />
                  )}
                  <p>
                    {item.name} <br />
                    <small>{item.email}</small>
                  </p>
                </Link>
              ))}
          </SearchArea>
        )}
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
            <Link to="/addpost">
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
