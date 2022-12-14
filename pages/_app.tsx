import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

export default function App({ Component, pageProps }: AppProps) {
  const Navigasi = dynamic(() => import("../components/navigasi"), {ssr: false})

  return (
    <>
      <Navigasi />
      <Component {...pageProps} />
    </>
  )
}
