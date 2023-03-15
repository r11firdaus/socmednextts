import Link from "next/link"
import { Fragment, useEffect } from "react"
import setDateTime from "../lib/setDateTime"
import CommentsChannel, { commentApp } from "../lib/websocket/comments_channel"

const CommentsCard = (props) => {
  useEffect(() => {
    props.user_id && props.token && CommentsChannel(props.post_id)
    return () => commentApp && commentApp.unsubscribe()
  }, [])
  
  return (
    <div className="container" id={`sectionComment-${props.post_id}`}>
      { props.comments.map(e => (
        <div className="card border-secondary bg-dark" key={e.id}>
          <div className="card-body text-light">
            <Link href={`/profile/${e.email}`}><strong>{e.email}</strong></Link>
            <span dangerouslySetInnerHTML={{ __html: e.content }} />
            <small>{setDateTime(e.created_at)}</small>
          </div>
        </div>
      )) }
    </div>
  )
}

export default CommentsCard