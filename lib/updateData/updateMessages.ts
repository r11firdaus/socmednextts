import { getData, setData } from "../dataStore"

type updateMsg = {
  id: string,
  receiver_id?: number|string,
  user_id?: number|string
}

const updateMessages = async (props: updateMsg): Promise<boolean> => {
  let messages = await getData('messages', 1)
  if (messages.data) {
    let findMessage = messages.data.find((e: any) => e[props.id])

    // update status to 3 (readed)
    findMessage[props.id].map((e: any) => {
      if (e.receiver_id == props.receiver_id || e.user_id == props.user_id) e.status = 3
    })

    const indexMessage = messages.data.findIndex((e: any) => Object.keys(e)[0] == props.id)
    messages.data[indexMessage] = findMessage


    setData('messages', messages, 1)
    return true
  } else return false
}

export default updateMessages