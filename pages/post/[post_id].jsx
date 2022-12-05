import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { getData } from '../../lib/dataStore'

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

  useEffect(() => {
    async function fetchData () {
      const res = await fetch(`http://localhost:4000/api/v1/comments?post_id=${data.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status == 200) {
        const resJson = await res.json()
        setcomments(resJson.data)
        console.log(resJson.data)
      }
    }
    fetchData()
  }, [])
  
  const sendComment = async (e) => {
    e.preventDefault()

    const postText = document.getElementById('postText')

    const res = await fetch(`http://localhost:4000/api/v1/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': await getData('token')
      },
      body: JSON.stringify({
        content: postText.value,
        user_id: await getData('user_id'),
        post_id: data.id
      })
    })

    if (res.status === 200) {
      let resJson = await res.json()
      postText.value = ''
      // dipake buat comment
      // let cloneComments = [...comments]
      // resJson.data['email'] = await getData('email')
      // cloneComments.push(resJson.data)
      // setcomments(cloneComments)
    }
  }

  return (
    <div className='container mt-5 pt-5 text-light'>
      <div className="card my-2 border border-light bg-dark px-3 py-3">
        <strong className='card-title'>{data.email}</strong>
        <p>{data.content}</p>
      </div>

      <div className="pl-3 py-3"><h5>Comments</h5></div>
      
      <CommentsCard comments={comments} post_id={data.id} />

      <div className="row my-3">
        <div className="col-8">
          <textarea className="form-control" placeholder="Just write" id="postText" />
        </div>
        <div className="col-4">
          <button className="form-control btn btn-success" onClick={(e) => sendComment(e)}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default postDetail