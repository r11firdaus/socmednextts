import Link from "next/link"
import Router from "next/router"
import { memo, useState } from "react"
import { setData } from "../lib/dataStore"
import { useAuthStore, useUserStore } from "../lib/zustand/store"
import { postAPI } from "../lib/callAPI"

const LoginForm = (props) => {
  const [loading, setloading] = useState(false)
  const submit = async (e) => {
    setloading(true)
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const body = { email, password }

    const res = await postAPI({ path: `auth/${ props.type === 'login' ? 'login' : 'signup' }`, body })

    if (res.data) {
      setData('token', res.data.token, 0)
      setData('email', res.data.email, 0)
      setData('user_id', res.data.id, 0)
      useUserStore.setState({ isOnline: true })
      useAuthStore.setState({ isLogin: true })
      location.href = '/'
    }
    setloading(false)
  }

  return (
    <div className="vh-100 d-flex justify-content-center">
      <div className="col p-5 shadow-sm border rounded-3">
        <h2 className="text-center mb-4 text-light">{props.type === 'login' ? 'Login' : 'Signup'}</h2>
        <form onSubmit={(e) => submit(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control border border-light" id="email" aria-describedby="emailHelp" />
          </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control border border-light" id="password" />
            </div>
            <p className="small"><a className="text-light" href="forget-password.html">Forgot password?</a></p>
            <div className="d-grid">
              {!loading ? 
                <button className="btn btn-success" type="submit">{props.type === 'login' ? 'Login' : 'Signup'}</button> :
                <a className="btn btn-secondary" href="#">please wait...</a>
              }
            </div>
        </form>
        <div className="mt-3">
        {props.type === 'login' ? 
          <p className="mb-0 text-center text-light">Don't have an account? <Link href="/signup" className="text-light fw-bold">SignUp</Link></p>
         : <p className="mb-0 text-center text-light">Already have an account? <Link href="/login" className="text-light fw-bold">Login</Link></p>}
        </div>
      </div>
    </div>
  )
}

export default memo(LoginForm)