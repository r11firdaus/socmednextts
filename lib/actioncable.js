import ActionCable from "actioncable"
import { getData } from './dataStore'

const websocket = () => {
  const user_id = getData('user_id');
  const CableApp = ActionCable.createConsumer('ws://localhost:4000/cable')
  CableApp.subscriptions.create(
    {
        channel: 'ChatsChannel',
        user_id,
    },
    {
      connected() {
        console.log('Notification channel connected\nUser id:', user_id)
      },
      received(data) {
        console.log('NEW NOTIFICATION: ', data)
      },
    }
  )
}

export default websocket