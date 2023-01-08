import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { getAPI } from "../../lib/callAPI"
import UserTypes from "../../types/users"

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
    const res = await getAPI({path: `users/0?email=${props.user_email}`})
    const userdata: UserTypes = res.data
    
    if (userdata) {
      setuserData(userdata)
    } else console.log(res.message)

    setloading(false)
  }
  
  return (
    <div className="text-light mt-5 pt-2">
        {loading ? <span>Loading...</span> : <span>{userData.email}</span>}
    </div>
  )
}

export default userpage