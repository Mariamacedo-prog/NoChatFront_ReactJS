import { Action } from "redux";

export interface ChatUser {
  chatId: string;
  avatar: string;
  lastMessage: string;
  lastMessageDate: Date;
  title: string;
  with: string;
  id: string;
}

export interface StateUser {
  name?: string;
  email?: string;
  _id?: string;
  avatar?: string;
  chats: ChatUser[];
  followers: string[];
  followings: string[];
  description?: string;
}

interface ActionsString {
  type: string;
  payload: string | number;
}

const initialState = {
  name: "",
  email: "",
  _id: "",
  description: "",
  avatar: "",
  chats: [],
  followers: [],
  followings: [],
};

const UserReducer = (
  state: StateUser = initialState,
  action: ActionsString
) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
      break;
    case "SET_EMAIL":
      return { ...state, email: action.payload };
      break;
    case "SET_ID":
      return { ...state, _id: action.payload };
      break;
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
      break;
    case "SET_AVATAR":
      return { ...state, avatar: action.payload };
      break;

    case "SET_FOLLOWERS":
      return { ...state, followers: action.payload };
      break;
    case "SET_FOLLOWINGS":
      return { ...state, followings: action.payload };
      break;

    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
