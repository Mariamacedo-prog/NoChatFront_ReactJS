import { Action } from "redux";
const initialState = {
  email: "",
};

const UserReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.type.payload };
      break;
  }
  return state;
};

export default UserReducer;
