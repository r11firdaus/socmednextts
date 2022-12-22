import ActionCable from "actioncable"
const cableApp = ActionCable.createConsumer(process.env.NEXT_PUBLIC_WS_URL)

export default cableApp