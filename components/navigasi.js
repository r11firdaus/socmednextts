import ActionCable from "actioncable"
import { memo, useEffect } from "react"

const Navigasi = () => {
  useEffect(() => {
    console.log('nav mounted')
    const CableApp = ActionCable.createConsumer('ws://localhost:4000/cable')
    CableApp.subscriptions.create(
      {
          channel: 'ChatsChannel',
          user_id: 1,
      },
      {
        connected() {
          console.log('Notification channel connected\nUser id:', 'test id')
        },
        received(data) {
          console.log('NEW NOTIFICATION: ', data)
        },
      }
    )
    return () => {
    }
  }, [])
  
  return (
    <div>Navigasi</div>
  )
}

export default memo(Navigasi)