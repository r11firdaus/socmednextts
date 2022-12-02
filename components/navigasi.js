import Link from "next/link"
import Router from "next/router"
import { memo, useEffect } from "react"
import websocket from '../lib/actioncable'
import { getData } from '../lib/dataStore'

const Navigasi = () => {
  useEffect(() => {
    console.log('nav mounted')
    const token = getData('token');
    token && websocket();
  }, [])

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
          <div className="col"><a href="#">Chats</a></div>
          <div className="col"><a href="#" onClick={() => logout()}>logout</a></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default memo(Navigasi)