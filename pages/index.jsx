import Head from 'next/head'
import { useEffect, useState } from 'react'
import Alert from '../components/alert'
import Posts from '../components/posts'
import { getAPI, postAPI } from '../lib/callAPI'
import { getData } from '../lib/dataStore'

export default function Home() {
  const [posts, setposts] = useState([])
  const [alert, setalert] = useState({ show: false, status: null, statusText: '', type: '' })
  const [refetch, setrefetch] = useState(false)
  const user_id = getData('user_id', 0)
  const token = getData('token', 0)
  let page = 0

  useEffect(() => {
    fetchData()
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onScroll = async () => {
    if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
        window.removeEventListener("scroll", onScroll);
        setrefetch(true)
        await fetchData()
    }
  }

  const fetchData = async () => {
    const getPosts = await getAPI({ path: `posts?${user_id ? 'user_id='+user_id+'&' : ''}page=${page}` })
      
    if (getPosts.data) {
      setposts((prevState) => [...prevState, ...getPosts.data])
      if (getPosts.data.length == 10) {
        page++
        window.addEventListener("scroll", onScroll);
      }
    }
    setrefetch(false)
  }
  
  const sendPost = async(e) => {
    e.preventDefault()
    const postText = document.getElementById('postText')
    if (postText.value.trim() !== '') {
      const body = {
        content: postText.value,
        img_url: '',
        user_id: await getData('user_id', 0)
      }

      const post = await postAPI({path: 'posts', body })
      if (post.data) {
        postText.value = ''
        setalert({ show: true, status: 'Success.', statusText: 'Post successfully added!', type: 'success' })
        setTimeout(() => {
          setalert({show: false})
        }, 5000);
      } else {
        setalert({ show: true, status: post.status, statusText: post.message, type: 'danger' })
        setTimeout(() => {
          setalert({show: false})
        }, 5000);
      }
    }
  }

  return (
    <div className="container mt-5 py-5">
      <Head>
        <title>MeSo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {alert.show && <Alert data={alert} />}
        {user_id && token &&
          <div className="row my-3">
            <div className="col-8">
              <textarea className="form-control" placeholder="Just write" id="postText" />
            </div>
            <div className="col-4">
              <button className="form-control btn btn-success" onClick={(e) => sendPost(e)}>Send</button>
            </div>
          </div>
        }

        <hr />
        <div className="container-fuid my-3">
          <Posts posts={posts} />
        </div>
        { refetch && <p className="text-light">Refetching...</p>}
    </div>
  )
}
