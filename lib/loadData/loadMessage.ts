import { getAPI } from "../callAPI"
import { setData } from "../dataStore"

/* Status message
0 = failed
1 = sent
2 = recived
3 = read
*/

const loadMessage = async (id: number): Promise<boolean> => {
  console.log('get messages from API')
  const messages = await getAPI({path: `messages?user_id=${id}`})
  if (messages.data) {
    console.log(messages)
    setData('messages', messages, 1)
    return true
  } else return false
}

export default loadMessage