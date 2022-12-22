import cableApp from "./cable"
import { getData } from '../dataStore'

export let commentApp;

const CommentsChannel = (post_id) => {
  const email = getData('email', 0);
  commentApp = cableApp.subscriptions.create(
    {
        channel: 'CommentsChannel',
        email,
        post_id
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
      disconnected() {
        console.log('disconnected from comments')
      }
    }
  )
}

export default CommentsChannel