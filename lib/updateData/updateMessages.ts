import MessagesTypes, { MessagesData } from "../../types/messages"
import { getData, setData } from "../dataStore"

type updateMsg = {
  unique_id: string,
  receiver_id?: number|string,
  user_id?: number|string
}

const updateMessages = async (props: updateMsg): Promise<boolean> => {
  const { unique_id, receiver_id, user_id } = props

  let messages = await getData('messages', 1)
  if (messages.data) {
    let findMessage = messages.data.find((e: MessagesData) => e[unique_id])

    // update status to 3 (readed)
    findMessage[unique_id].map((e: MessagesTypes) => {
      if (e.receiver_id == receiver_id || e.user_id == user_id) e.status = 3
    })

    const indexMessage = messages.data.findIndex((e: MessagesTypes) => Object.keys(e)[0] == unique_id)
    messages.data[indexMessage] = findMessage


    setData('messages', messages, 1)
    return true
  } else return false
}

export default updateMessages