import Link from "next/link"
import Router from "next/router"
import { memo } from "react"
import { deleteData } from "../lib/dataStore"
import ChatsChannel from "../lib/websocket/chats_channel"
import CommentsChannel from "../lib/websocket/comments_channel"
import { useAuthStore } from "../lib/zustand/store"

const SessionNav = () => {
  const isLogin = useAuthStore((state) => state.isLogin)

  const logout = () => {
    localStorage.clear()
    deleteData('token', 0)
    deleteData('email', 0)
    deleteData('user_id', 0)
    useAuthStore.setState({isLogin: false})
    ChatsChannel.unsubscribe()
    CommentsChannel(false)
    Router.push('/login')
  }

  return(<>
    {isLogin ?
      <div className="col"><a href="#" onClick={() => logout()}>logout</a></div> :
      <div className="col"><Link href="/login">login</Link></div>
    }
  </>)
}

export default memo(SessionNav)