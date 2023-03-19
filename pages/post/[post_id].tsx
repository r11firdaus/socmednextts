import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { getData } from '../../lib/dataStore'
import { getAPI } from '../../lib/callAPI'
import setDateTime from '../../lib/setDateTime'
import { GetServerSideProps } from 'next'
import PostsTypes from '../../types/posts'
import fetch from 'node-fetch'

const CommentsCard = dynamic(import("../../components/commentsCard"), {ssr: false})
const TextEditor = dynamic(import("../../components/textEditor"), {ssr: false})

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx
  const post_id = query.post_id

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data: any = await res.json()

  return {props: {data: data.data}}
}

const PostDetail = (props: { data: PostsTypes }): JSX.Element => {
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

  return (
    <div className='container mt-3 py-5' id='comment-section'>
      <div className="card my-2 border border-light bg-dark px-3 py-3">
        <strong className='card-title text-light'>{data.email}</strong>
        <small className="text-secondary mb-3">{setDateTime(data.created_at)}</small>
        <span className='text-light' dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>

      <div className="pl-3 py-3"><h5>Comments</h5></div>
      
      {<CommentsCard comments={comments} post_id={data.id} user_id={user_id} token={token} />}
      {user_id && token && <div className='comment-form-container'><TextEditor data={props.data} path={'comments'} /></div>}
    </div>
  )
}

export default PostDetail