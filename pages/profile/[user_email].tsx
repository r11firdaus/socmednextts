import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { getAPI } from "../../lib/callAPI"
import { getData } from "../../lib/dataStore"
import UserTypes from "../../types/users"

const Spinner = dynamic(() => import('../../components/spinner'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx
  const user_email = query.user_email

  return { props: { user_email }}
}

const userpage = (props: { user_email: string }): JSX.Element => {
  const [loading, setloading] = useState(true)
  const [userData, setuserData] = useState<UserTypes>({ user_id: 0 })

  useEffect(() => {
    fetchData()
    return () => {
      
    }
  }, [])

  const fetchData = async () => {
    const email = getData('email', 0)
    if (props.user_email == email) {
      const user = {
        email,
        user_id: getData('user_id', 0)
      }

      setuserData(user)
    } else {
      const res = await getAPI({path: `users/0?email=${props.user_email}`})
      const userdata: UserTypes = res.data
      
      if (userdata) {
        setuserData(userdata)
      } else console.log(res.message)
    }

    setloading(false)
  }
  
  return (
    <div className="h-100 text-light mt-5 pt-2">
        {loading ?
          <Spinner types="ripple" /> : 
        <>
          <div className="card my-2 border border-secondary bg-dark text-light">
            <div className="card-body">
              <strong>{userData.email}</strong>
            </div>
          </div>
        </>
        }
    </div>
  )
}

export default userpage