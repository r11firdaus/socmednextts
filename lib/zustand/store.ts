import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { AuthStore, MessagesStore, UseNavStore, UserStore } from '../../types/store'

const initMessageData = {
  unique_id: '',
  user_id: 0,
  content: '',
  created_at: '',
  updated_at: '',
  id: 0,
  receiver_id: 0,
  status: null,
  opponent: ''
}

export const useMessageStore = create(subscribeWithSelector<MessagesStore>((set) => ({
  data: initMessageData,
  unreadMessages: 0,
  setUnreadMessages: (count) => set((state) => ({ unreadMessages:  count })),
  incrementUnreadMessages: () => set((state) => ({ unreadMessages:  state.unreadMessages++ }))
})))

export const useUserStore = create(subscribeWithSelector<UserStore>((set) => ({
  isOnline: false,
  user_id: 0,
})))

export const useAuthStore = create(subscribeWithSelector<AuthStore>((set) => ({
  isLogin: false,
})))

export const useNavStore = create(subscribeWithSelector<UseNavStore>((set) => ({
  showBottom: true,
  showTop: true,
  ShowBottomTrue: () => set((state) => ({ showBottom: true })),
  ShowBottomFalse: () => set((state) => ({ showBottom: false })),
  ShowTopTrue: () => set((state) => ({ showTop: true })),
  ShowTopFalse: () => set((state) => ({ showTop: false })),
})))