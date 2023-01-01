import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { getData } from '../../lib/dataStore'
import { getAPI, postAPI } from '../..//lib/callAPI'
import appendComment from "../../components/comment/appendComment"
import setDateTime from '../../lib/setDateTime'

const CommentsCard = dynamic(import("../../components/commentsCard"), {ssr: false})

export const getServerSideProps = async (ctx) => {
  const { query } = ctx
  const post_id = query.post_id

  const res = await fetch(`http://localhost:4000/api/v1/posts/${post_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()

  return {props: {data: data.data}}
}

const postDetail = (props) => {
  const { data } = props
  const [comments, setcomments] = useState([])
  const user_id = getData('user_id', 0)
  const token = getData('token', 0)

  useEffect(() => {
    async function fetchData () {
      const comments = await getAPI({ path: `comments?post_id=${data.id}`})
      comments.data && setcomments(comments.data)
    }
    fetchData()
  }, [])
  
  const sendComment = async (e) => {
    e.preventDefault()

    const postText = document.getElementById('postText')
    if (postText.value.trim() !== '') {
      const body = {
        content: postText.value,
        user_id: await getData('user_id', 0),
        post_id: data.id
      }
      const comment = await postAPI({ path: 'comments', body })

      if (comment.data) {
        const data = comment.data
        postText.value = ''
        appendComment(data)
      }
    }
  }

  return (
    <div className='container mt-5 mb-5 pb-3 pt-5 text-light'>
      <div className="card my-2 border border-light bg-dark px-3 py-3">
        <strong className='card-title'>{data.email}</strong>
        <small className="text-secondary mb-3">{setDateTime(data.created_at)}</small>
        <p>{data.content}</p>
      </div>

      <div className="pl-3 py-3"><h5>Comments</h5></div>
      
      {<CommentsCard comments={comments} post_id={data.id} user_id={user_id} token={token} />}
      {user_id && token &&
        <div className="row my-3">
          <div className="col-8">
            <textarea className="form-control" placeholder="Just write" id="postText" />
          </div>
          <div className="col-4">
            <button className="form-control btn btn-success" onClick={(e) => sendComment(e)}>Send</button>
          </div>
        </div>
      }

      
    </div>
  )
}

export default postDetail