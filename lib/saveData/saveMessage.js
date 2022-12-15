import { setData, getData } from "../dataStore"

/* Status message
0 = failed
1 = sent
2 = recived
3 = read
*/

const saveMessage = async (id, data) => {
  let messages = await getData('messages', 1) || {}
  if (messages.data) {
    let findMessage = messages.data.find(e => e[id])
    findMessage ? findMessage[id].unshift(data) : messages['data'].push({ [id]: [data] })
    const indexMessage = messages.data.findIndex((e) => Object.keys(e)[0] == id)

    // move object to top/first
    messages.data.splice(0, 0, messages.data.splice(indexMessage, 1)[0]);
    setData('messages', messages, 1)
  } else setData('messages', { data: [{ [id]: [data] }] }, 1)
  return true
}
export default saveMessage