import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useAuthStore } from '../lib/zustand/store'
import { useEffect, useState } from 'react'
import { getData } from '../lib/dataStore'

const Navigasi = dynamic(() => import("../components/navigasi"), {ssr: false})

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
        loading ? <div className='text-light'>LOADING...</div> :
        <>
          <Navigasi />
          <Component {...pageProps} />
        </>
      }
    </>
  )
}
