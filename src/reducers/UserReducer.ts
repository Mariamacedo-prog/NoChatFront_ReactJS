import { Action } from "redux";

import { isLogged } from "../helpers/Auth";

export interface StateUser {
  logged?: boolean;
  name?: string;
}

const initialState = {
  logged: isLogged(),
  name: "maria",
};

const UserReducer = (state: StateUser = initialState, action: Action) => {
  switch (action.type) {
    case "IS_LOGGED":
      return { ...state, logged: action.type.payload };
      break;
  }

  return state;
};

export default UserReducer;
