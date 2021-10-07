import { Switch, Redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import PagePublication from "../pages/PagePublication";
import Home from "../pages/Home";
import { isLogged } from "../helpers/Auth";
import Route from "./Routehandler";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useApi from "../helpers/Api";
import { StateUser } from "../reducers/UserReducer";

const Routes: React.FC = (props: any) => {
  let logged = isLogged();
  const api = useApi();

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
    if (logged) {
      const getUserInformation = async () => {
        const info = await api.userInfo();
        reduxUpdate(info);
      };
      getUserInformation();
    }
  }, [api, logged]);

  return (
    <Switch>
      <Route exact path="/signin" public>
        {!logged ? <SignIn /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/signup" public>
        {!logged ? <SignUp /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/profile" private>
        <Profile />
      </Route>
      <Route exact path="/post/:id" private>
        <PagePublication />
      </Route>
      <Route exact path="/" private>
        <Home />
      </Route>

      <Route private>
        <NotFound />
      </Route>
    </Switch>
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

export default connect(mapStateToProps, mapDispachToProps)(Routes);
