import cableApp from "./cable"
import { getData } from '../dataStore'
import appendComment from "../../components/comment/appendComment"

export let commentApp: ActionCable.Channel;

const CommentsChannel = (post_id: number) => {
  const email: string = getData('email', 0);
  const user_id: string = getData('user_id', 0);
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
        user_id != data.data.user_id && appendComment(data.data)
      },
      disconnected() {
        console.log('disconnected from comments')
      }
    }
  )
}

export default CommentsChannel