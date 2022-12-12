import { getData } from "./dataStore"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// params must be an object

export const getAPI = async (params) => {
  const token = await getData('token', 0)
  const res = await fetch(`${API_URL}/${params.path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  })

  if (res.status == 200) return await res.json()
  else return {status: res.status, message: res.statusText}
}

export const postAPI = async (params) => {
  const token = await getData('token', 0)
  const res = await fetch(`${API_URL}/${params.path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(params.body)
  })

  if (res.status == 200) return await res.json()
  else return {status: res.status, message: res.statusText}
}