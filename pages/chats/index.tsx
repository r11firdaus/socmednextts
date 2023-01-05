import Link from "next/link"
import { useEffect, useState } from "react"
import { getData } from "../../lib/dataStore"
import { useMessageStore, useUserStore } from "../../lib/zustand/store"
import setDateTime from "../../lib/setDateTime";
import MessagesTypes from "../../types/messages";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx
  const user_id = getData('user_id', 0, ctx)
  const token = getData('token', 0, ctx)

  if (!user_id || !token) ctx.res.writeHead(302, {location: '/'}).end()

  return {
    props: { user_id, token }
  }
}

interface WithUnreadMessages extends MessagesTypes {
  unreadMessages: number
}

const index = (): JSX.Element => {
  const [chats, setchats] = useState<WithUnreadMessages[]>([])

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
  }
  
  return (
    <div className="container mt-5 py-5 text-light">
      <ol className="list-group">
        {chats.length > 0 && chats.map((e) => (
          <Link href={`/chats/${e.unique_id}`} key={e.id}>
            <li className="list-group-item d-flex justify-content-between align-items-start bg-dark text-light">
              <div className="ms-2 me-auto" style={{"width": "70%"}}>
                <div className="d-flex flex-row">
                  <div className="fw-bold msg-txt">
                    {e.opponent}
                  </div>
                  {e.unreadMessages > 0 && <span className="badge bg-primary rounded-pill mx-2">{e.unreadMessages}</span>}
                </div>
                <div className="msg-txt">{e.content}</div>
              </div>
              <div className="d-flex align-items-end flex-column mb-3">
                <small className="mt-auto" style={{"fontSize": "10px"}}>{setDateTime(e.created_at)}</small>
              </div>
            </li>
          </Link>
        ))}
      </ol>
    </div>
  )
}

export default index