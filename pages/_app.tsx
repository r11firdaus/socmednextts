import '../styles/globals.css'
import '../styles/spinner.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useAuthStore } from '../lib/zustand/store'
import { useEffect, useState } from 'react'
import { getData } from '../lib/dataStore'

const Navbar = dynamic(() => import("../components/navbar"), {ssr: false})
const Spinner = dynamic(() => import("../components/spinner"), {ssr: false})

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const user_id = getData('user_id', 0)
    const token = getData('token', 0)
    const email = getData('email', 0)

    token && email && user_id && useAuthStore.setState({isLogin: true})

    setloading(false)
  }, [])
  

  return (
    <>
      {
        loading ? <div className="h-100"><Spinner types='ring' /></div> :
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      }
    </>
  )
}
