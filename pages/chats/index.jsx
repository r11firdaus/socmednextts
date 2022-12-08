import { useEffect, useState } from "react"
import { getData } from "../../lib/dataStore"

const index = () => {
  const [chats, setchats] = useState([])

  useEffect(() => {
    async function fetchData() {
      const user_id = await getData('user_id')
      const res = await fetch(`http://localhost:4000/api/v1/messages?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': await getData('token')
        }
      })

      if (res.status == 200) {
        const data = await res.json()
        let newChats = []
        data.data.map(e => newChats.push(e[e.length-1]))
        setchats(newChats)
        console.log(data)
      }
    }
    fetchData()
  }, [])
  
  return (
    <div className="container mt-5 py-5 text-light">
      <ol className="list-group">
        {chats?.map((e) => (
          <li className="list-group-item d-flex justify-content-between align-items-start bg-dark text-light" key={e.id}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{e.opponent}</div>
              {e.content}
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default index