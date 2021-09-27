import React from "react";
import { Link } from "react-router-dom";
import { Container, Search, Menu, Button } from "./styles";
import { doLogout } from "../../helpers/Auth";
import NoChat from "../../assets/nochat-logo.png";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiFillFileAdd,
} from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

const Header = () => {
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
              <IoMdNotifications />
              <p>Notificações</p>
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

export default Header;
