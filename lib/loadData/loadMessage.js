import { getAPI } from "../callAPI"
import { setData, getData } from "../dataStore"

/* Status message
0 = failed
1 = sent
2 = recived
3 = read
*/

const loadMessage = async (id) => {
  let messages = await getData('messages', 1)
  if (!messages) {
    messages = await getAPI({path: `messages?user_id=${id}`})
    setData('messages', messages, 1)
  }

  return messages
}

export default loadMessage