export interface ChatUser {
  chatId: string;
  avatar: string;
  lastMessage: string;
  lastMessageDate: string;
  title: string;
  with: string;
  id: string;
}
interface CommentType {
  id: string;
  author: string;
  username: string;
  date: string;
  avatar: string;
  msg: string;
  type?: string;
}
export interface PublicationsType {
  category: string;
  comment: CommentType[];
  description?: string;
  like: [];
  title?: string;
  userId: string;
  _id: string;
  image?: string;
  username: string;
  avatar?: string;
  createdAt?: string | undefined;
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
  isChatOpen?: boolean;
  chatSelected?: string;
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
  isChatOpen: false,
  chatSelected: "",
};

type Actions = ActionsString | ActionsArray;

const UserReducer = (state: StateUser = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_ID":
      return { ...state, _id: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_AVATAR":
      return { ...state, avatar: action.payload };
    case "SET_FOLLOWERS":
      return { ...state, followers: action.payload };
    case "SET_FOLLOWINGS":
      return { ...state, followings: action.payload };
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    case "OPEN_CHAT":
      return { ...state, isChatOpen: action.payload };
    case "SET_CHAT_SELECTED":
      return { ...state, chatSelected: action.payload };
    case "SET_PUBLICATIONS":
      return {
        ...state,
        publications: action.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
