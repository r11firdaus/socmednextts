import ActionCable from "actioncable"
import { getData } from '../dataStore'

const ChatsChannel = () => {
  const user_id = getData('user_id');
  const CableApp = ActionCable.createConsumer(process.env.NEXT_PUBLIC_WS_URL)
  CableApp.subscriptions.create(
    {
        channel: 'ChatsChannel',
        user_id,
    },
    {
      connected() {
        console.log('Chats channel connected\nUser id:', user_id)
      },
      received(data) {
        console.log('NEW msg: ', data)
        const msgUL = document.getElementById(`message_${data.unique_id}`);
        if (msgUL) {
          let element = ''
          if (data.user_id == user_id) {
            element = `<div class="col-12" style="padding: 0" key=${data.id}>
                        <div class="row d-flex flex-row-reverse">
                          <li class="col-auto card my-baloon">${data.content}</li>
                        </div>
                      </div>`
          } else {
            element = `<div class="col-12" style="padding: 0" key=${data.id}>
                        <div class="row d-flex">
                          <li class="col-auto card opponent-baloon">${data.content}</li>
                        </div>
                      </div>`
          }
          
          msgUL.insertAdjacentHTML('beforeend', element)
        }
      },
      disconnected() {
        console.log('Chats disconnected\nUser id:', user_id)
      },
    }
  )
}

export default ChatsChannel