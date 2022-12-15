import Router from "next/router"
import { memo } from "react"
import { deleteData } from "../lib/dataStore"
import { useAuthStore } from "../lib/zustand/store"

const SessionNav = () => {
  const isLogin = useAuthStore((state) => state.isLogin)

  const logout = () => {
    localStorage.clear()
    deleteData('token', 0)
    deleteData('email', 0)
    deleteData('user_id', 0)
    useAuthStore.setState({isLogin: false})
    Router.push('/login')
  }

  return(<>
    {isLogin ?
      <div className="col"><a href="#" onClick={() => logout()}>logout</a></div> :
      <div className="col"><a href="#" onClick={() => logout()}>login</a></div>
    }
  </>)
}

export default memo(SessionNav)