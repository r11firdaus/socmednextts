import Link from "next/link"
import { memo } from "react"

type Props = {
  email: string,
  id: number|string,
  content: string,
  user_id?: string|number
}

const Posts = (props: { posts: Props[] }): JSX.Element => {
  const posts = props.posts
  
  return (<>
    { posts.map((e) => (
      <div className="card my-2 border border-secondary bg-dark text-light" key={e.id}>
        <div className="card-body">
          <strong>{e.email}</strong>
          <p>{e.content}</p>
          <div className="position-absolute bottom-0 end-0 px-2 py-2"><Link href={`/post/${e.id}`}>Comments</Link></div>
        </div>
      </div>
    )) }
  </>)
  
}

export default memo(Posts)