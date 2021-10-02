import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GrConfigure } from "react-icons/gr";
import { PublicationsType } from "../../reducers/UserReducer";
import { Dispatch } from "redux";
import Publication from "../../components/Publication";
import { StateUser } from "../../reducers/UserReducer";
import useApi from "../../helpers/Api";
import {
  Container,
  HeaderProfile,
  ProfileImage,
  ProfileConfig,
  ProfileInfo,
  PostButtons,
  UserFeed,
  PostInfo,
} from "./styles";

const Profile = (props: any) => {
  const api = useApi();
  const [user, setUser] = useState({} as StateUser);
  const [category, setCategory] = useState("publication");
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const getUserInformation = async () => {
      const info = await api.userInfo();
      props.setName(`${info.name}`);
      props.setEmail(`${info.email}`);
      props.setId(`${info._id}`);
      props.setFollowers(info.followers);
      props.setFollowings(info.followings);
      props.setChats(info.chats);

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

  useEffect(() => {
    const getUserPublications = async () => {
      const json = await api.getPublications({
        author: user._id,
        cat: category,
      });

      setPublications(json.publications);
    };
    getUserPublications();
  }, [api, user, category]);

  console.log(user);
  console.log(publications);

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
          <div onClick={() => setCategory("publication")}>Publicações</div>
          <div onClick={() => setCategory("picture")}>Fotos</div>
          <div onClick={() => setCategory("article")}>Artigos</div>
        </PostButtons>

        <UserFeed>
          {publications.map(
            (item: PublicationsType) =>
              item.category === category && (
                <div key={item._id}>
                  <PostInfo>
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
                    <Link to={`/user/${props.name}`}>{props.name}</Link>
                  </PostInfo>

                  {item.category === "publication" && (
                    <Publication item={item} />
                  )}
                  {item.category === "article" && (
                    <>
                      <img src={item.image} alt="imagem" />
                      <p>{item.title}</p>
                    </>
                  )}
                  {item.category === "picture" && (
                    <>
                      <img src={item.image} alt="imagem" />
                      <p>{item.title}</p>
                    </>
                  )}
                </div>
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
