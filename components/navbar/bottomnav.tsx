import Link from "next/link"
import Router from "next/router"
import { deleteData, getData } from "../../lib/dataStore"
import { ChatsChannel } from "../../lib/websocket/chats_channel"
import { useAuthStore, useMessageStore, useUserStore } from "../../lib/zustand/store"
import SessionNav from "../session"

const Bottomnav = ():JSX.Element => {
  const { isLogin } = useAuthStore(state => state)
  const { unreadMessages } = useMessageStore(state => state)

  const logout = () => {
    localStorage.clear()
    deleteData('token', 0)
    deleteData('email', 0)
    deleteData('user_id', 0)
    useAuthStore.setState({isLogin: false})
    useUserStore.setState({isOnline: false})
    ChatsChannel.unsubscribe()
    Router.push('/login')
  }

  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand fixed-bottom border-top border-light">
      { isLogin ?
        <ul className="navbar-nav nav-justified w-100">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-newspaper" viewBox="0 0 16 16">
                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
                <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/chats" className="nav-link position-relative">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                { unreadMessages > 0 && 
                  <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger">
                    { unreadMessages < 10 ? unreadMessages : '9+' }
                    <span className="visually-hidden">unread messages</span>
                  </span>
                }
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <Link href={`/profile/${getData('email', 0)}`} className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
            </Link>
          </li>
        </ul> :
        <div className="d-flex justify-content-center w-100">
          <SessionNav />
        </div>
      }
    </nav>
  )
}

export default Bottomnav