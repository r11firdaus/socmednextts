import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useMessageStore = create(subscribeWithSelector((set) => ({
  data: {}
})))

export const useUserStore = create(subscribeWithSelector((set) => ({
  isOnline: false,
})))

export const useAuthStore = create(subscribeWithSelector((set) => ({
  isLogin: false,
})))