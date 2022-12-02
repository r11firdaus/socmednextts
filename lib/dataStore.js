import { crypt, decrypt } from './encriptor'

const setData = (key, value) => {
  const siteData = localStorage.getItem('site')
  let initialData = siteData ? JSON.parse(siteData) : {}

  const encryptKey = crypt(process.env.NEXT_PUBLIC_ENC_KEY, key)
  const encryptValue = crypt(process.env.NEXT_PUBLIC_ENC_KEY, value)

  initialData[encryptKey] = encryptValue
  localStorage.setItem('site', JSON.stringify(initialData))
}

const getData = (key) => {
  const siteData = localStorage.getItem('site')
  if (siteData) {
    let initialData = JSON.parse(siteData)
    const encryptKey = crypt(process.env.NEXT_PUBLIC_ENC_KEY, key)
    const res = initialData[encryptKey]
  
    return decrypt(process.env.NEXT_PUBLIC_ENC_KEY, res)
  }

}

export { setData, getData }