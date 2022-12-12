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
    let findMessage = messages.data[id]
    if (findMessage) findMessage.unshift(data)
    else {
      messages['data'][id] = data
    }
    setData('messages', messages, 1)
  } else {
    setData('messages', {data: {[id]: data}}, 1)
  }
  return true
}

export default saveMessage