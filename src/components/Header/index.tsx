import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiFillWechat
} from "react-icons/ai";

import {GiPhotoCamera} from "react-icons/gi";
import {IoIosLogOut, IoIosChatboxes} from "react-icons/io";

import { BsFilePpt, BsChatLeft } from "react-icons/bs";
import { doLogout } from "../../helpers/Auth";
import NoChat from "../../assets/nochat-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useApi from "../../helpers/Api";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as C from "./styles";

const Header = (props: any) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const [users, setUsers] = useState([] as any);
  const [q, setQ] = useState("");
  const api = useApi();

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

  const handleLogout = () => {
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
      <C.Container>
        <div>
          <Link to="/">
            <img src={NoChat} alt="NoChat logo" />
          </Link>
          <C.Search>
            <AiOutlineSearch id="searchSvg" />
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
              <C.SearchArea>
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
                {users &&
                  users.map((user: any) => (
                    <div key={user._id}>
                      <Link to={`/user/${user.name}`} className="searchItem">
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
                          {user.name && (
                            <h5
                              className={
                                user.name.length > 20 ? "bigName" : undefined
                              }
                            >
                              {user.name}
                            </h5>
                          )}
                          <br />
                          {user.email && (
                            <small
                              className={
                                user.email.length > 30 ? "bigEmail" : undefined
                              }
                            >
                              {user.email}
                            </small>
                          )}
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
              </C.SearchArea>
            )}
          </C.Search>
        </div>
        <C.MenuArea>
          <div className="separateArea"></div>
          <C.Menu>
            <ul>
              <li id="homeMenuButton">
                <Link to="/">
                  <AiOutlineHome />
                </Link>
                <p>Home</p>
              </li>
              <li>
                <Link to="/addpost">
                  <GiPhotoCamera />
                </Link>
                <p>Publicar</p>
              </li>
              <li>
                <IoIosChatboxes onClick={openingChatArea} />
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
                </Link>
                <p>Perfil</p>
              </li>
            </ul>
          </C.Menu>
          <C.Button onClick={handleLogout}>
           <p> <IoIosLogOut  />  </p> 
          </C.Button>
        </C.MenuArea>
      </C.Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
