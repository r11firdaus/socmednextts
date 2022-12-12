import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import store from '../lib/redux/store'

export default function App({ Component, pageProps }: AppProps) {
  const Navigasi = dynamic(() => import("../components/navigasi"), {ssr: false})

  return (
    <>
      <Provider store={store}>
        <Navigasi />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
