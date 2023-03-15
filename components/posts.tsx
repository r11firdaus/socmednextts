import Link from "next/link"
import { memo } from "react"
import setDateTime from "../lib/setDateTime"
import PostsTypes from "../types/posts"

const Posts = (props: { posts: PostsTypes[] }): JSX.Element => {
  const posts = props.posts
  
  return (<>
    { posts.map((e) => (
      <div className="card my-2 border border-secondary bg-dark text-light" key={e.id}>
        <div className="card-body">
          <Link href={`/profile/${e.email}`}><strong>{e.email}</strong></Link>
          <span className="px-2 py-2"><small className="text-secondary mr-3">{setDateTime(e.created_at)}</small></span>
          <span dangerouslySetInnerHTML={{ __html: e.content }} />
          <div className="position-absolute bottom-0 end-0 px-2 py-2"><Link href={`/post/${e.id}`}>Comments</Link></div>
        </div>
      </div>
    )) }
  </>)
  
}

export default memo(Posts)