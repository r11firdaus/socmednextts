import { crypt, decrypt } from './encriptor'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

/*
  location
    cookie = 0
    localStorage = 1
    all = 3
*/

const setData = (key, value, location) => {  
  const encryptKey = crypt(process.env.NEXT_PUBLIC_ENC_KEY, `${key}`)
  const encryptValue = crypt(process.env.NEXT_PUBLIC_ENC_KEY, JSON.stringify(value))
  const checkIsDataPresent = localStorage.getItem(encryptKey)

  switch (location) {
    case 0:
      hasCookie(encryptKey) && deleteCookie(encryptKey)
      setCookie(encryptKey, encryptValue) 
      break;
    case 1:
      checkIsDataPresent && localStorage.removeItem(encryptKey)
      localStorage.setItem(encryptKey, encryptValue)
      break;
    case 2:
      checkIsDataPresent && localStorage.removeItem(encryptKey)
      localStorage.setItem(encryptKey, encryptValue)
      hasCookie(encryptKey) && deleteCookie(encryptKey)
      setCookie(encryptKey, encryptValue) 
      break;
  
    default:
      break;
  }
}

const getData = (key, location, ctx) => {
  let siteData;
  switch (location) {
    case 0:
      siteData = getCookie(crypt(process.env.NEXT_PUBLIC_ENC_KEY, key), ctx)
      break;
    case 1:
      siteData = localStorage.getItem(crypt(process.env.NEXT_PUBLIC_ENC_KEY, key))
      break;
  
    default:
      break;
  }

  if (siteData) return JSON.parse(decrypt(process.env.NEXT_PUBLIC_ENC_KEY, siteData))
}

export { setData, getData }