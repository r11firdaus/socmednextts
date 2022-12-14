import { useEffect, useState, memo } from 'react'
import { getData } from '../../lib/dataStore'
import dynamic from 'next/dynamic'
import saveMessage from '../../lib/saveData/saveMessage'
import { postAPI } from '../../lib/callAPI'
import { useMessageStore, useUserStore } from "../../lib/zustand/store"

const Bubble = dynamic(() => import('../../components/message/bubble'), {ssr: false})

export const getServerSideProps = async (ctx) => {
  const { query } = ctx
  const unique_id = query.unique_id
  const user_id = getData('user_id', 0, ctx)
  const token = getData('token', 0, ctx)

  const pisahIdUser = unique_id.split('+')
  let chkId = []
  pisahIdUser.map(id => user_id == parseInt(id) && chkId.push(id))
  if (chkId.length < 1 && !token) ctx.res.writeHead(302, {location: '/chats'}).end()

  return {
    props: { unique_id, user_id, token }
  }
}

const chatDetail = (props) => {
  const [messages, setmessages] = useState([])
  const [unique_id, setunique_id] = useState(props.unique_id)

  useEffect(() => { 
    fetchData()
    useMessageStore.subscribe(state => appendMessage(state.data))
    useUserStore.subscribe(state => state.isOnline && fetchData())
    return () => useMessageStore.destroy()
  }, [])
  
  const sendHandler = async (e) => {
    e.preventDefault()
    let receiver_id = unique_id.split('+').filter(e => e != props.user_id)[0]
    const postText = document.getElementById('msg-input')

    if (postText.value.trim() !== '') {
      const body = {
        content: postText.value,
        user_id: props.user_id,
        unique_id,
        receiver_id
      }
      const save = await postAPI({path: 'messages', body})
      if (save.data) {
        appendMessage(save.data)
        await saveMessage(unique_id, save.data)
        postText.value = ''
      }
    }
  }

  const fetchData = async () => {
    console.warn('load messages')
    const data = await getData('messages', 1)?.data
    if (data[unique_id]) setmessages(data[unique_id].reverse())
    else {
      const splitUniqueId = unique_id.split('+')
      const reverseUniqueId = `${splitUniqueId[1]}+${splitUniqueId[0]}`
      if (data[reverseUniqueId]) {
        setmessages(data[reverseUniqueId].reverse())
        setunique_id(reverseUniqueId)
      }
    }
  }

  const appendMessage = (msg) => {
    const msgUL = document.getElementById(`message_${msg.unique_id}`);
        if (msgUL) {
          let element = ''
          if (msg.user_id == props.user_id) {
            element = `<div class="col-12" style="padding: 0" key=${msg.id}>
                        <div class="row d-flex flex-row-reverse">
                          <li class="col-auto card my-baloon">${msg.content}</li>
                        </div>
                      </div>`
          } else {
            element = `<div class="col-12" style="padding: 0" key=${msg.id}>
                        <div class="row d-flex">
                          <li class="col-auto card opponent-baloon">${msg.content}</li>
                        </div>
                      </div>`
          }

          msgUL.insertAdjacentHTML('beforeend', element)
        }
  }

  return (
    <>
      <Bubble messages={messages} unique_id={unique_id} user_id={props.user_id} token={props.token} />

      <form id="form" className="col-lg-offset-3" onSubmit={e => sendHandler(e)}>
        <input id="msg-input" autoComplete="off" />
        <button>Send</button>
      </form>
      <style jsx>
        {`
        #form { padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
        #msg-input { outline: none; border: 1px solid #4b3832; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
        #form > button { background: #333; border: none; padding: 0 1rem; border-radius: 3px; outline: none; color: #fff; }
      `}
      </style>
    </>
  )
}

export default memo(chatDetail)