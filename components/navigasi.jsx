import Link from "next/link"
import { memo, useEffect } from "react"
import ChatsChannel from "../lib/websocket/chats_channel"
import { useUserStore } from '../lib/zustand/store'
import SessionNav from './session'

const Navigasi = () => {
  const { isOnline } = useUserStore((state) => state)

  useEffect(() => {
    console.log('navbar loaded')
    !isOnline && ChatsChannel

    return () => useUserStore.destroy()
  }, [])
    
  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container row mx-auto">
          <a className="navbar-brand col-sm-2" href="#">MeSo</a>
          <div className="col-sm-8 d-flex justify-content-evenly text-light text-center" href="#">
          <div className="col"><Link href="/">Home</Link></div>
          <div className="col"><a href="#">Profile</a></div>
          <div className="col"><Link href="/chats">Chats</Link></div>
          <SessionNav />
          </div>
        </div>
      </nav>
    </>
  )
}

export default memo(Navigasi)