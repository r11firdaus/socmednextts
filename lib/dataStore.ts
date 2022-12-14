import { crypt, decrypt } from './encriptor'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

/*
  location
    cookie = 0
    localStorage = 1
    all = 3
*/

const setData = (key: string, value: any, location: number) => {  
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

const getData = (key: string, location: number, ctx?: GetServerSidePropsContext) => {
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

const deleteData = (key: string, location: number, ctx?: GetServerSidePropsContext) => {
  const encryptKey = crypt(process.env.NEXT_PUBLIC_ENC_KEY, `${key}`)
  switch (location) {
    case 0:
      deleteCookie(encryptKey)
      break;
    case 1:
      localStorage.removeItem(encryptKey)
      break;
  
    default:
      break;
  }
}

export { setData, getData, deleteData }