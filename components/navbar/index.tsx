import { memo, useEffect } from "react"
import { ChatsChannel } from "../../lib/websocket/chats_channel"
import { useAuthStore, useNavStore, useUserStore } from '../../lib/zustand/store'
import Bottomnav from "./bottomnav"
import Topnav from "./topnav"

const Navigasi = ():JSX.Element => {
  const { isOnline } = useUserStore((state) => state)
  const  { showBottom, showTop } = useNavStore(state => state)

  useEffect(() => {
    console.log('nav loaded')
    const isLogin = useAuthStore.getState().isLogin
    !isOnline && isLogin && ChatsChannel

    useAuthStore.subscribe(auth => {
      !auth.isLogin && ChatsChannel.unsubscribe()
    })

    return () => useUserStore.destroy()
  }, [])
    
  return (
    <>
      { showTop && <Topnav /> }
      { showBottom && <Bottomnav /> }
    </>
  )
}

export default memo(Navigasi)