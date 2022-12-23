import { memo, useEffect } from "react"
import ChatsChannel from "../../lib/websocket/chats_channel"
import { useAuthStore, useUserStore } from '../../lib/zustand/store'
import Bottomnav from "./bottomnav"
import Topnav from "./topnav"

const Navigasi = ():JSX.Element => {
  const { isOnline } = useUserStore((state) => state)

  useEffect(() => {
    console.log('navbar loaded')
    const isLogin = useAuthStore.getState().isLogin
    !isOnline && isLogin && ChatsChannel

    useAuthStore.subscribe(auth => {
      !auth.isLogin && ChatsChannel.unsubscribe()
    })

    return () => useUserStore.destroy()
  }, [])
    
  return (
    <>
      <Topnav />
      <Bottomnav />
    </>
  )
}

export default memo(Navigasi)