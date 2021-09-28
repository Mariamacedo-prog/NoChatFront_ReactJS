import React, { useState, useEffect } from "react";
import useApi from "../../helpers/Api";
import { StateUser, ChatUser } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GrConfigure } from "react-icons/gr";
import {
  Container,
  HeaderProfile,
  ProfileImage,
  ProfileConfig,
  ProfileInfo,
} from "./styles";

const Profile = (props: any) => {
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
            <div>
              <div>
                {props.followings}
                <p>Seguindo</p>
              </div>
              <div>
                {props.followings}
                <p>Seguidores</p>
              </div>
            </div>

            <GrConfigure />
          </ProfileConfig>
        </HeaderProfile>
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
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(Profile);
