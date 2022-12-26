import { getData, setData } from "../dataStore"

const updateMessages = async (id: string, receiver_id: number|string): Promise<boolean> => {
  let messages = await getData('messages', 1)
  if (messages.data) {
    let findMessage = messages.data.find((e: any) => e[id])

    // update status to 3 (readed)
    findMessage[id].map((e: any) => {
      if (e.receiver_id == receiver_id) e.status = 3
    })

    const indexMessage = messages.data.findIndex((e: any) => Object.keys(e)[0] == id)
    messages.data[indexMessage] = findMessage


    setData('messages', messages, 1)
    return true
  } else return false
}

export default updateMessages