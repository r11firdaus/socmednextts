import { memo, useEffect } from "react"
import { getData } from "../../lib/dataStore"
import { ChatsChannel } from "../../lib/websocket/chats_channel"
import { useAuthStore, useMessageStore, useNavStore, useUserStore } from '../../lib/zustand/store'
import MessagesTypes from "../../types/messages"
import Bottomnav from "./bottomnav"
import Topnav from "./topnav"

const Navigasi = ():JSX.Element => {
  const { isOnline } = useUserStore((state) => state)
  const  { showBottom, showTop } = useNavStore(state => state)
  const changeUnreadMessages = useMessageStore(state => state.setUnreadMessages)

  useEffect(() => {
    console.log('nav loaded')
    const isLogin = useAuthStore.getState().isLogin
    !isOnline && isLogin && ChatsChannel

    useAuthStore.subscribe(auth => {
      !auth.isLogin && ChatsChannel.unsubscribe()
    })

    useUserStore.subscribe(async user => {
      if (user.isOnline) {
        const user_id = getData('user_id', 0)
        const data = await getData('messages', 1)?.data
        let unreadMessages = 0
        data?.map((obj: {[key: string]: MessagesTypes[]}) => {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const element = obj[key];
              element.map((msg) => {
                msg.receiver_id == user_id && !msg.status && unreadMessages++
              })
            }
          }
        })
        changeUnreadMessages(unreadMessages)
      }
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