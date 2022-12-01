import { memo, useEffect } from "react"

const Navigasi = () => {
  useEffect(() => {
    console.log('nav mounted')
    const token = localStorage.getItem('token');
    token && websocket();
  }, [])
  
  return (
    <div>Navigasi</div>
  )
}

export default memo(Navigasi)