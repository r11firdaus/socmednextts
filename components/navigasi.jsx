import Link from "next/link"
import Router from "next/router"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "../lib/dataStore"
import loadMessage from "../lib/loadData/loadMessage"
import ChatsChannel from "../lib/websocket/chats_channel"
import saveMessage from '../lib/saveData/saveMessage'

const Navigasi = () => {
  const dispatch = useDispatch()
  const { isOnline, newWSMessage } = useSelector((state) => state)
  
  useEffect(() => {
    const token = getData('token', 0)
    token && !isOnline && ChatsChannel(dispatch, isOnline)
    setTimeout(async () => {
      const user_id = getData('user_id', 0)
      isOnline && await loadMessage(user_id)
      console.log('internet: '+isOnline)
    }, 500);
  }, [isOnline])

  const logout = async () => {
      localStorage.clear()
      Router.push('/login')
  }
  
  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container row mx-auto">
          <a className="navbar-brand col-sm-2" href="#">MeSo</a>
          <div className="col-sm-8 d-flex justify-content-evenly text-light text-center" href="#">
          <div className="col"><Link href="/">Home</Link></div>
          <div className="col"><a href="#">Profile</a></div>
          <div className="col"><Link href="/chats">Chats</Link></div>
          <div className="col"><a href="#" onClick={() => logout()}>logout</a></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default memo(Navigasi)