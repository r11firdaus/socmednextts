import { crypt, decrypt } from './encriptor'
import { setCookie, getCookie } from 'cookies-next';

const setData = (key, value, location) => {
  const checkIsDataPresent = localStorage.getItem(crypt(process.env.NEXT_PUBLIC_ENC_KEY, key))
  checkIsDataPresent && localStorage.removeItem(crypt(process.env.NEXT_PUBLIC_ENC_KEY, key))

  const encryptKey = crypt(process.env.NEXT_PUBLIC_ENC_KEY, `${key}`)
  const encryptValue = crypt(process.env.NEXT_PUBLIC_ENC_KEY, JSON.stringify(value))

  if (location === 0) setCookie(encryptKey, encryptValue)
  else localStorage.setItem(encryptKey, encryptValue)
}

const getData = (key, location) => {
  let siteData;

  if (location === 0) siteData = getCookie(crypt(process.env.NEXT_PUBLIC_ENC_KEY, key))
  else siteData = localStorage.getItem(crypt(process.env.NEXT_PUBLIC_ENC_KEY, key))

  if (siteData) return JSON.parse(decrypt(process.env.NEXT_PUBLIC_ENC_KEY, siteData))
}

export { setData, getData }