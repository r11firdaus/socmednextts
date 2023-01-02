import MessagesTypes from "./messages";
import UserTypes from "./users";

export interface MessagesStore {
  data: MessagesTypes,
  unreadMessages: number,
  setUnreadMessages: (count: number) => void,
  incrementUnreadMessages: () => void
}

export interface UserStore extends UserTypes {
  isOnline: boolean
}

export interface AuthStore {
  isLogin: boolean
}

export interface UseNavStore {
  showBottom: boolean,
  showTop: boolean,
  ShowBottomTrue: () => void,
  ShowBottomFalse: () => void,
  ShowTopTrue: () => void,
  ShowTopFalse: () => void,
}