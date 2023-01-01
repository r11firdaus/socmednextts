import { useEffect } from "react"
import setDateTime from "../lib/setDateTime"
import CommentsChannel, { commentApp } from "../lib/websocket/comments_channel"

const CommentsCard = (props) => {
  useEffect(() => {
    props.user_id && props.token && CommentsChannel(props.post_id)
    return () => commentApp.unsubscribe()
  }, [])
  
  return (
    <div className="container" id={`sectionComment-${props.post_id}`}>
      { props.comments.map(e => (
        <div className="card border-secondary bg-dark" key={e.id}>
          <div className="card-body">
            <strong>{e.email}</strong>
            <p>{e.content}</p>
            <small>{setDateTime(e.created_at)}</small>
          </div>
        </div>
      )) }
    </div>
  )
}

export default CommentsCard