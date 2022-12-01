import Link from "next/link"
import Router from "next/router"

const LogiForm = (props) => {
  const submit = async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const res = await fetch(`http://localhost:4000/api/v1/auth/${props.type === 'login' ? 'login' : 'signup'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await res.json()
    if (res.status === 200) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('email', data.data.email)
      localStorage.setItem('user_id', data.data.id)
      Router.push('/')
    }
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
              <button className="btn btn-success" type="submit">{props.type === 'login' ? 'Login' : 'Signup'}</button>
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

export default LogiForm