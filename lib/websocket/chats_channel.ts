import { getData } from '../dataStore'
import loadMessage from "../loadData/loadMessage";
import saveMessage from "../saveData/saveMessage";
import updateMessages from '../updateData/updateMessages';
import { useMessageStore, useUserStore } from "../zustand/store";
import cableApp from "./cable"

const user_id = getData('user_id', 0);
const email = getData('email', 0);
const token = getData('token', 0);

const checkData = token && email && user_id

export let ChatsChannel: ActionCable.Channel

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
        if (window.location.pathname == `/chats/${newData.unique_id}`) {
          newData.status = 3
          if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) window.scrollTo(0, document.body.scrollHeight);
        }
        
        if (data.type == 'update') {
          updateMessages({unique_id: data.data.unique_id, user_id})
          
          const elMsg = document.getElementById(`message_${data.data.unique_id}`) as HTMLElement
          if (elMsg) {
            const elArr = Array.from(elMsg.getElementsByTagName('span'))
            elArr.map(e => e.setAttribute('class', 'text-primary'))
          }
        } else {
          if (email == newData.opponent) newData.opponent = data.sender
          await saveMessage(data.data.unique_id, newData)
          const unreadMessages = useMessageStore.getState().unreadMessages
          useMessageStore.setState({ data: newData, unreadMessages: unreadMessages+1 })
        }
      },
      disconnected() {
        console.log('Chats disconnected\nUser id:', user_id)
        useUserStore.setState({ isOnline: false })
      },
    }
  )
  
}