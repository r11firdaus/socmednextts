import ActionCable from "actioncable"
import { getData } from '../dataStore'
import { crypt } from "../encriptor"
import saveMessage from "../saveData/saveMessage";

const ChatsChannel = (dispatch, isOnline) => {
  const user_id = getData('user_id', 0);
  
  const CableApp = ActionCable.createConsumer(process.env.NEXT_PUBLIC_WS_URL)
  CableApp.subscriptions.create(
    {
        channel: 'ChatsChannel',
        user_id,
    },
    {
      connected() {
        if (!isOnline) {
          localStorage.removeItem(crypt(process.env.NEXT_PUBLIC_ENC_KEY, 'messages'))
          dispatch({ type: 'IS_ONLINE', payload: true })
        }

      },
      async received(data) {
        dispatch({ type: 'NEW_MESSAGE', payload: data.data })
        await saveMessage(data.data.unique_id, data.data)
      },
      disconnected() {
        console.log('Chats disconnected\nUser id:', user_id)
        dispatch({ type: 'IS_ONLINE', payload: false })
      },
    }
  )
}

export default ChatsChannel