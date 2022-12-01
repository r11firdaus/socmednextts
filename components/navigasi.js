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
          <div className="col"><a href="#">Home</a></div>
          <div className="col"><a href="#">Posts</a></div>
          <div className="col"><a href="#">Trending</a></div>
          <div className="col"><a href="#">Shop</a></div>
          <div className="col"><a href="#" onClick={() => logout()}>logout</a></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default memo(Navigasi)