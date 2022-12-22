import Link from "next/link"

type Props = {
  email: string,
  id: number|string,
  content: string,
  user_id?: string|number
}

const Posts = (props: Props):JSX.Element => {
  return (
    <div className="card my-2 border border-secondary bg-dark text-light">
      <div className="card-body">
        <strong>{props.email}</strong>
        <p>{props.content}</p>
        <div className="position-absolute bottom-0 end-0 px-2 py-2"><Link href={`/post/${props.id}`}>Comments</Link></div>
      </div>
    </div>
  )
}

export default Posts