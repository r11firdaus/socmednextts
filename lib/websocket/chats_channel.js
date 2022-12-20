import { getData } from '../dataStore'
import loadMessage from "../loadData/loadMessage";
import saveMessage from "../saveData/saveMessage";
import { useMessageStore, useUserStore } from "../zustand/store";
import cableApp from "./cable"

let ChatsChannel = null
const user_id = getData('user_id', 0);
const email = getData('email', 0);
const token = getData('token', 0);

const checkData = token && email && user_id ? true : false

if (checkData) {
  ChatsChannel = cableApp.subscriptions.create(
    {
      channel: 'ChatsChannel',
      user_id,
    },
    {
      async connected() {
        console.log('chats connected')
        await loadMessage(user_id)
        useUserStore.setState({ isOnline: true })
      },
      async received(data) {
        let newData = data.data
        if (email == newData.opponent) newData.opponent = data.sender
        await saveMessage(data.data.unique_id, newData)
        useMessageStore.setState({ data: newData })
      },
      disconnected() {
        console.log('Chats disconnected\nUser id:', user_id)
        useMessageStore.setState({ isOnline: false })
      },
    }
  )
}

export default ChatsChannel