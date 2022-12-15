import Link from "next/link"
import { useEffect, useState } from "react"
import { getData } from "../../lib/dataStore"
import { useMessageStore, useUserStore } from "../../lib/zustand/store"

const index = () => {
  const [chats, setchats] = useState([])

  useEffect(() => {
    fetchData()
    useMessageStore.subscribe(state => fetchData())
    useUserStore.subscribe(state => state.isOnline && fetchData())
    return () => useMessageStore.destroy()
  }, [])

  const fetchData = async () => {
    console.warn('load messages')
    const data = await getData('messages', 1)
    
    if (data) {
      const user_id = getData('user_id', 0)
      let newChats = []
      for (var key in data.data) {
        if (data.data.hasOwnProperty(key)) {
          let lastMessage = data.data[key][0]
          let unreadMessages = 0
          data.data[key].map(e => e.receiver_id == user_id && !e.status && unreadMessages++)
          lastMessage['unreadMessages'] = unreadMessages
          newChats.push(lastMessage)
        }
      }
      setchats(newChats)
    }
  }
  
  return (
    <div className="container mt-5 py-5 text-light">
      <ol className="list-group">
        {chats?.map((e) => (
          <Link href={`/chats/${e.unique_id}`} key={e.id}>
            <li className="list-group-item d-flex justify-content-between align-items-start bg-dark text-light">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{e.opponent}</div>
                {e.content}
              </div>
              {e.unreadMessages > 0 && <span className="badge bg-primary rounded-pill">{e.unreadMessages}</span>}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  )
}

export default index