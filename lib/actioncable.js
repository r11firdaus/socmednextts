import ActionCable from "actioncable"

const websocket = () => {
  const CableApp = ActionCable.createConsumer('ws://localhost:4000/cable')
  CableApp.subscriptions.create(
    {
        channel: 'ChatsChannel',
        user_id: 1,
    },
    {
      connected() {
        const user_id = localStorage.getItem('user_id');
        console.log('Notification channel connected\nUser id:', user_id)
      },
      received(data) {
        console.log('NEW NOTIFICATION: ', data)
      },
    }
  )
}

export default websocket