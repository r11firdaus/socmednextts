import { memo } from "react"
import LoginForm from "../components/loginForm"
const Login = () => { 
  return (
    <div className="mt-3">
      <LoginForm type='login'/>
    </div>
  )
}

export default memo(Login)