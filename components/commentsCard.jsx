import { useEffect } from "react"
import CommentsChannel from "../lib/websocket/comments_channel"

const CommentsCard = (props) => {
  useEffect(() => {
    props.user_id && props.token && CommentsChannel
    return () => CommentsChannel.unsubscribe()
  }, [])
  
  return (
    <div className="container" id={`sectionPost-${props.post_id}`}>
      { props.comments.map(e => (
        <div className="card border-secondary bg-dark" key={e.id}>
          <div className="card-body">
            <strong>{e.email}</strong>
            <p>{e.content}</p>
          </div>
        </div>
      )) }
    </div>
  )
}

export default CommentsCard