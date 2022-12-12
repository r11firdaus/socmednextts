import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getData } from "../../lib/dataStore"

const index = () => {
  const [chats, setchats] = useState([])
  const { isOnline, newWSMessage } = useSelector((state) => state)

  useEffect(() => {
    setTimeout(() => {
      isOnline && fetchData()
    }, 1000);
  }, [isOnline, newWSMessage])

  const fetchData = async () => {
    const data = await getData('messages', 1)

    let newChats = []
    for (var key in data.data) {
      if (data.data.hasOwnProperty(key)) newChats.push(data.data[key][0])
    }
    setchats(newChats)
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