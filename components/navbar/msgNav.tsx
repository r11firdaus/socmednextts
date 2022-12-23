import Link from "next/link"
import Router from "next/router"
import { memo } from "react"

const MsgNav = (props: { opponent: string }): JSX.Element => {
  console.log('msgnav load')
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top text-light">
      <div className="nav-item d-flex flex-row mx-3">
        <Link className="navbar-brand" href="#" onClick={() => Router.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        </Link>
        <Link className="navbar-brand" href="#">{props.opponent}</Link>
      </div>
    </nav>
  )
}

export default memo(MsgNav)