import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GrConfigure } from "react-icons/gr";
import { PublicationsType } from "../../reducers/UserReducer";
import { Dispatch } from "redux";
import Publication from "../../components/Publication";
import Article from "../../components/Article";
import Button from "../../components/Button";
import { StateUser } from "../../reducers/UserReducer";
import useApi from "../../helpers/Api";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  Container,
  HeaderProfile,
  ProfileImage,
  ProfileConfig,
  ProfileInfo,
  PostButtons,
  UserFeed,
  PostItem,
  ButtonsArea,
} from "./styles";

const Profile = (props: any) => {
  const api = useApi();
  const [user, setUser] = useState({} as StateUser);
  const [category, setCategory] = useState("publication");
  const [publications, setPublications] = useState([]);
  const [like, setLike] = useState(false);
  const [idPubli, setIdPubli] = useState("");

  function reduxUpdate(info: StateUser) {
    props.setName(info.name);
    props.setEmail(info.email);
    props.setId(info._id);
    props.setFollowers(info.followers);
    props.setFollowings(info.followings);
    props.setChats(info.chats);

    if (info.description) {
      props.setDescription(info.description);
    }
    if (info.avatar) {
      props.setAvatar(info.avatar);
    }
  }

  useEffect(() => {
    const getUserInformation = async () => {
      const info = await api.userInfo();
      setUser(info);
      reduxUpdate(info);
      console.log("chamou 1");
    };
    getUserInformation();
  }, [api]);

  useEffect(() => {
    const getUserPublications = async () => {
      const json = await api.getPublications({
        author: user._id,
        cat: category,
      });
      console.log("chamou 2");
      setPublications(json.publications);
    };
    getUserPublications();
  }, [api, user, category, like]);

  useEffect(() => {
    const getLike = async (idPubli: string) => {
      let id = idPubli;
      const json = await api.updateLike({ id });

      if (like !== json.liked) {
        setLike(json.liked);
      } else {
        setLike(!json.liked);
        setLike(json.liked);
      }
    };

    getLike(idPubli);
  }, [api, idPubli]);

  return (
    <>
      <Container>
        <HeaderProfile>
          <ProfileImage>
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
          </ProfileImage>
          <ProfileInfo>
            <h1> {props.name}</h1>
            <small>{props.email}</small>
            <div>{props.description !== "" && <p>{props.description}</p>}</div>
          </ProfileInfo>
          <ProfileConfig>
            <ul>
              <div>
                <li>{props.followings.length}</li>
                <li>Seguindo</li>
              </div>

              <div>
                <li>{props.followers.length}</li>
                <li>Seguidores</li>
              </div>
            </ul>
            <GrConfigure />
          </ProfileConfig>
        </HeaderProfile>
        <PostButtons>
          <div
            onClick={() => setCategory("publication")}
            className={category === "publication" ? "selected" : undefined}
          >
            Publicações
          </div>
          <div
            onClick={() => setCategory("picture")}
            className={category === "picture" ? "selected" : undefined}
          >
            Fotos
          </div>
          <div
            onClick={() => setCategory("article")}
            className={category === "article" ? "selected" : undefined}
          >
            Artigos
          </div>
        </PostButtons>

        <UserFeed>
          {publications &&
            publications.map(
              (item: PublicationsType) =>
                item.category === category && (
                  <PostItem key={item._id}>
                    {item.category === "publication" && (
                      <>
                        <Publication
                          item={item}
                          userTitle={props.name}
                          avatar={props.avatar}
                        />
                        <ButtonsArea>
                          <Button
                            classes={
                              item.like.some((item) => item === user._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => setIdPubli(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                          <Button>
                            <AiOutlineShareAlt />
                          </Button>
                        </ButtonsArea>
                      </>
                    )}
                    {item.category === "article" && (
                      <>
                        <Article
                          item={item}
                          userTitle={props.name}
                          avatar={props.avatar}
                        />
                        <ButtonsArea>
                          <Button
                            classes={
                              item.like.some((item) => item === user._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => setIdPubli(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                          <Button>
                            <AiOutlineShareAlt />
                          </Button>
                        </ButtonsArea>
                      </>
                    )}

                    {item.category === "picture" && (
                      <>
                        <Publication
                          item={item}
                          userTitle={props.name}
                          avatar={props.avatar}
                        />
                        <ButtonsArea className="picture">
                          <Button
                            classes={
                              item.like.some((item) => item === user._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => setIdPubli(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                        </ButtonsArea>
                      </>
                    )}
                  </PostItem>
                )
            )}
        </UserFeed>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: state.user.name,
    email: state.user.email,
    _id: state.user._id,
    description: state.user.description,
    avatar: state.user.avatar,
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
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Profile);
