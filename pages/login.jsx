import { memo } from "react"
import LoginForm from "../components/loginForm"
const login = () => { 
  return (
    <LoginForm type='login'/>
  )
}

export default memo(login)