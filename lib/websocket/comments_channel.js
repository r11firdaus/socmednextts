import cableApp from "./cable"
import { getData } from '../dataStore'

const email = getData('email', 0);
const CommentsChannel = cableApp.subscriptions.create(
  {
      channel: 'CommentsChannel',
      email,
  },
  {
    connected() {
      console.log('Comments channel connected\nUser id:', email)
    },
    received(data) {
      console.log('NEW NOTIFICATION: ', data)
      const section = document.getElementById(`sectionPost-${data.comment.post_id}`)
      const htmlStr = `
                        <div class="card border-secondary bg-dark" key=${data.comment.id}>
                          <div class="card-body">
                            <strong>${data.comment.email}</strong>
                            <p>${data.comment.content}</p>
                          </div>
                        </div>
                      `
      section.insertAdjacentHTML('beforeend', htmlStr);
    },
  }
)

export default CommentsChannel