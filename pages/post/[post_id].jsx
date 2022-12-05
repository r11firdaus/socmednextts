import { useEffect, useState } from 'react'

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
  

  return (
    <div className='container mt-5 pt-5 text-light'>
      <div className="card my-2 border border-light bg-dark px-3 py-3">
        <strong className='card-title'>{data.email}</strong>
        <p>{data.content}</p>
      </div>

      <div className="pl-3 py-3"><h5>Comments</h5></div>
      <div className="container">
        { comments.map(e => (
          <div className="card border-secondary bg-dark" key={e.id}>
            <div className="card-body">
              <strong>{e.email}</strong>
              <p>{e.content}</p>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default postDetail