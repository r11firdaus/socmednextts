import { putAPI } from "../callAPI"
import { useMessageStore } from "../zustand/store"
import updateMessages from "./updateMessages"

const readMessage = async (user_id: number, unique_id: string, count?: number) => {
  const body = {
    receiver_id: user_id,
  }

  const res = await putAPI({ path: `messages/${unique_id}`, body })

  if (res.data) {
    updateMessages({ unique_id: unique_id, receiver_id: user_id })
    const unreadMessages = useMessageStore.getState().unreadMessages
    const changeUnreadMessages = useMessageStore.getState().setUnreadMessages
    changeUnreadMessages(unreadMessages - (count ? count : 1))
  } else console.log(res.message)
}

export default readMessage