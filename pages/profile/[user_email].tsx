import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getAPI } from "../../lib/callAPI"
import { getData } from "../../lib/dataStore"
import PostsTypes from "../../types/posts"
import UserTypes from "../../types/users"

const Spinner = dynamic(() => import('../../components/spinner'), { ssr: false })
const Posts = dynamic(() => import('../../components/posts'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx
  const user_email = query.user_email

  return { props: { user_email }}
}

const Userpage = (props: { user_email: string }): JSX.Element => {
  const [loading, setloading] = useState(true)
  const [userData, setuserData] = useState<UserTypes>({ user_id: 0 })
  const [posts, setposts] = useState<PostsTypes[]>([])

  useEffect(() => {
    fetchData()
    return () => {
      
    }
  }, [])

  const fetchData = async () => {
    let datauser = userData
    const email = getData('email', 0)

    if (props.user_email == email) {
      const user = {
        email,
        user_id: getData('user_id', 0)
      }

      datauser = user
    } else {
      const res = await getAPI({path: `users/0?email=${props.user_email}`})
      
      if (res.data) {
        const changeResStructure: UserTypes = {
          ...res.data,
          user_id: res.data.id
        }
        datauser = changeResStructure 
      }
      else console.log(res.message)
    }

    if (datauser.email) {
      setuserData(datauser)
      const user_posts = await getAPI({ path: `user_posts?user_id=${datauser.user_id}` })
      user_posts.data && setposts(user_posts.data)
    }
    console.log(datauser)

    
    setloading(false)
  }
  
  return (<>
        {loading ?
          <div className="h-100"><Spinner types="ripple" /></div> : 
          <div className="container mt-5 py-5">
            <div className="card my-2 mb-3 border border-secondary bg-dark text-light">
              <div className="card-body d-flex">
                <div className="mr-auto d-flex align-content-center flex-wrap m-2">
                  {/* <Image src={""} alt={""} /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg>
                </div>
                <div className="p-2">
                  <strong>{userData.email}</strong><br />
                  <small className="text-secondary">Fullstack Developer</small>
                </div>
              </div>
            </div>

            <div className="container-fuid mt-5 mb-3">
            <div className="ms-3 mb-3 text-light"><h5>Post</h5></div>
              <Posts posts={posts} />
            </div>
          </div>
        }
  </>
  )
}

export default Userpage