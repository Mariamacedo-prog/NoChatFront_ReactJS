import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GrConfigure } from "react-icons/gr";
import { PublicationsType } from "../../reducers/UserReducer";
import { Dispatch } from "redux";
import Publication from "../../components/Publication";
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
  const [category, setCategory] = useState("publication");

  console.log(props.publications);
  return (
    <>
      <Container>
        <HeaderProfile>
          <ProfileImage>
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
          {props.publications.map(
            (item: PublicationsType) =>
              item.category === category && (
                <div key={item._id}>
                  <PostInfo>
                    {props.vatar !== "" ? (
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
                    <Link to={`/user/${props.name}`}>{props.name}</Link>
                  </PostInfo>
                  {item.category === "publication" && (
                    <Publication
                      item={item}
                      name={props.name}
                      avatar={props.avatar}
                    />
                  )}
                  {item.category === "article" && <p>{item.title}</p>}
                  {item.category === "picture" && <p>{item.image}</p>}
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
    publications: state.user.publications,
    chats: state.user.chats,
    followers: state.user.followers,
    followings: state.user.followings,
  };
};

const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(Profile);
