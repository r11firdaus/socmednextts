import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
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

const userpage = (props: { user_email: string }): JSX.Element => {
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
              <div className="card-body">
                <strong>{userData.email}</strong>
              </div>
            </div>

            <div className="container-fuid mt-5 mb-3">
            <div className="ms-3 mb-3 text-light"><h5>Posts</h5></div>
              <Posts posts={posts} />
            </div>
          </div>
        }
  </>
  )
}

export default userpage