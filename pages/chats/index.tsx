import { useEffect, useState } from "react"
import { getData } from "../../lib/dataStore"
import { useMessageStore, useUserStore } from "../../lib/zustand/store"
import { WithUnreadMessages } from "../../types/messages";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("../../components/spinner"), { ssr: false })
const Chatlist = dynamic(() => import("../../components/message/chatlist"), { ssr: false })

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx
  const user_id = getData('user_id', 0, ctx)
  const token = getData('token', 0, ctx)

  if (!user_id || !token) ctx.res.writeHead(302, {location: '/'}).end()

  return {
    props: { user_id, token }
  }
}



const index = (): JSX.Element => {
  const [chats, setchats] = useState<WithUnreadMessages[]>([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    fetchData()
    useMessageStore.subscribe(state => state.data, fetchData)
    useUserStore.subscribe(state => state.isOnline && fetchData())
    return () => useMessageStore.destroy()
  }, [])

  const fetchData = async () => {
    console.warn('load messages')
    const data = await getData('messages', 1)
    
    if (data) {
      const user_id = getData('user_id', 0)
      let newChats: WithUnreadMessages[] = []
      data.data.map((e: {[key: string]: WithUnreadMessages[]}) => {
        for (var key in e) {
          if (e.hasOwnProperty(key)) {
            let lastMessage = e[key][0]
            let unreadMessages = 0
            e[key].map(e => e.receiver_id == user_id && !e.status && unreadMessages++)
            lastMessage['unreadMessages'] = unreadMessages
            newChats.push(lastMessage)
          }
        }
      })
      setchats(newChats)
    }
    setloading(false)
  }
  
  return (
    <>
    {
      loading ? <div className="h-100"><Spinner types='ripple' /></div> :
        <div className="container mt-3 py-5">
          <Chatlist chats={chats} />
        </div>
    }
    </>
  )
}

export default index