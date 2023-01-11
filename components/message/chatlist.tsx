import Link from 'next/link'
import { memo } from 'react'
import setDateTime from '../../lib/setDateTime'
import { WithUnreadMessages } from '../../types/messages'

const Chatlist = (props: { chats: WithUnreadMessages[] }) => {
  return (
    <ol className="list-group">
      {props.chats.length > 0 && props.chats.map((e) => (
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
  )
}

export default memo(Chatlist)