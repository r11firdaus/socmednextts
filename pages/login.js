const login = () => {
  const loginSubmit = async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const res = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    })

    console.log(await res.json())
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4 p-5 shadow-sm border rounded-3">
        <h2 className="text-center mb-4 text-primary">Login Form</h2>
        <form onSubmit={(e) => loginSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control border border-primary" id="email" aria-describedby="emailHelp" />
          </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control border border-primary" id="password" />
            </div>
            <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
        <div className="mt-3">
          <p className="mb-0  text-center">Don't have an account? <a href="signup.html" className="text-primary fw-bold">SignUp</a></p>
        </div>
      </div>
    </div>
  )
}

export default login