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
      let newChats = []
      for (var key in data.data) {
        if (data.data.hasOwnProperty(key)) newChats.push(data.data[key][0])
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
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
          </Link>
        ))}
      </ol>
    </div>
  )
}

export default index