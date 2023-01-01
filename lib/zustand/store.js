import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useMessageStore = create(subscribeWithSelector((set) => ({
  data: {},
  unreadMessages: 0,
  setUnreadMessages: (count) => set((state) => ({ unreadMessages:  count }))
})))

export const useUserStore = create(subscribeWithSelector((set) => ({
  isOnline: false,
})))

export const useAuthStore = create(subscribeWithSelector((set) => ({
  isLogin: false,
})))

export const useNavStore = create(subscribeWithSelector((set) => ({
  showBottom: true,
  showTop: true,
  ShowBottomTrue: () => set((state) => ({ showBottom: true })),
  ShowBottomFalse: () => set((state) => ({ showBottom: false })),
  ShowTopTrue: () => set((state) => ({ showTop: true })),
  ShowTopFalse: () => set((state) => ({ showTop: false })),
})))