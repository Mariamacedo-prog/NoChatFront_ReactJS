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

export interface PublicationsType {
  category: string;
  comment: [];
  description?: string;
  like: [];
  title?: string;
  userId: string;
  _id: string;
  image?: string;
}

export interface StateUser {
  name?: string;
  email?: string;
  _id?: string;
  avatar?: string;
  chats: ChatUser[];
  followers: string[];
  followings: string[];
  publications: PublicationsType[];
  description?: string;
}

interface ActionsString {
  type: string;
  payload: string | number;
}

interface ActionsArray {
  type: "SET_FOLLOWERS" | "SET_FOLLOWINGS" | "SET_CHATS" | "SET_PUBLICATIONS";
  payload: [];
}

const initialState = {
  name: "",
  email: "",
  _id: "",
  description: "",
  avatar: "",
  publications: [],
  chats: [],
  followers: [],
  followings: [],
};

type Actions = ActionsString | ActionsArray;

const UserReducer = (state: StateUser = initialState, action: Actions) => {
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
    case "SET_CHATS":
      return { ...state, chats: action.payload };
      break;
    case "SET_PUBLICATIONS":
      return {
        ...state,
        publications: action.payload,
      };
      break;

    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
