import { useEffect, useState, memo } from 'react'
import { getData } from '../../lib/dataStore'
import dynamic from 'next/dynamic'
import saveMessage from '../../lib/saveData/saveMessage'
import { getAPI, postAPI, putAPI } from '../../lib/callAPI'
import { useMessageStore, useNavStore, useUserStore } from "../../lib/zustand/store"
import appendMessage from '../../components/message/appendMessage'
import updateMessages from '../../lib/updateData/updateMessages'

const Bubble = dynamic(() => import('../../components/message/bubble'), {ssr: false})
const MsgNav = dynamic(() => import('../../components/navbar/msgNav'), {ssr: false})

export const getServerSideProps = async (ctx) => {
  const { query } = ctx
  const unique_id = query.unique_id
  const user_id = getData('user_id', 0, ctx)
  const token = getData('token', 0, ctx)

  const pisahIdUser = unique_id.split('+')
  let chkId = []
  pisahIdUser.map(id => user_id == parseInt(id) && chkId.push(id))
  const opponentId = pisahIdUser.filter(e => e != user_id)[0]
  if (chkId.length < 1 || !token) ctx.res.writeHead(302, {location: '/'}).end()

  return {
    props: { unique_id, user_id, token, opponentId }
  }
}

const chatDetail = (props) => {
  const [messages, setmessages] = useState([])
  const [unique_id, setunique_id] = useState(props.unique_id)
  const [opponent, setopponent] = useState('')
  const disableBottomNav = useNavStore((state) => state.ShowBottomFalse)
  const disableTopNav = useNavStore((state) => state.ShowTopFalse)
  const enableBottomNav = useNavStore((state) => state.ShowBottomTrue)
  const enableTopNav = useNavStore((state) => state.ShowTopTrue)
  const changeUnreadMessages = useMessageStore(state => state.setUnreadMessages)

  useEffect(() => { 
    disableBottomNav()
    disableTopNav()

    fetchData().then(async (msg) => {
      if (opponent == '' && msg.length > 0) setopponent(msg[0].opponent)
      else if (opponent == '' && msg.length == 0) {
        const getOppnent = await getAPI({ path: `users/${props.opponentId}` })
        getOppnent.data && setopponent(getOppnent.data.email)
      }

      setmessages(msg)
      if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) window.scrollTo(0, document.body.scrollHeight);
    })

    useMessageStore.subscribe(async state => {
      state.data,
      readMessage
      setTimeout(() => {
        appendMessage(state.data, props.user_id)
      }, 500);
    })
    useUserStore.subscribe(state => state.isOnline && fetchData())
    
    return () => {
      useMessageStore.destroy()
      enableBottomNav()
      enableTopNav()
    }
  }, [])
  
  const sendHandler = async (e) => {
    e.preventDefault()
    const postText = document.getElementById('msg-input')
    
    if (postText.value.trim() !== '') {
      let receiver_id = unique_id.split('+').filter(e => e != props.user_id)[0]
      const body = {
        content: postText.value,
        user_id: props.user_id,
        unique_id,
        receiver_id
      }
      const save = await postAPI({path: 'messages', body})
      if (save.data) {
        appendMessage(save.data, props.user_id)
        await saveMessage(unique_id, save.data)
        postText.value = ''
        if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }

  const fetchData = async () => {
    console.warn('load messages')
    const data = await getData('messages', 1)?.data
    let msg = []

    data?.map(async e => {
      if (e[unique_id]) msg = processMsg(e[unique_id].reverse())
      else {
        const splitUniqueId = unique_id.split('+')
        const reverseUniqueId = `${splitUniqueId[1]}+${splitUniqueId[0]}`
        if (e[reverseUniqueId]) {
          setunique_id(reverseUniqueId)
          msg = processMsg(e[reverseUniqueId].reverse())
        }
      }
    })
    return msg
  }

  const processMsg = (msg) => {
    let newMsg = msg
    let unreadMsg = false
    let unreadMessages = 0
    for (let i = 0; i < newMsg.length; i++) {
      if (newMsg[i].status != 3 && newMsg[i].receiver_id == props.user_id) {
        if (!unreadMsg) unreadMsg = true
        newMsg[i].status = 3
        unreadMessages++
      }
    }
    unreadMsg && readMessage(unreadMessages);

    return newMsg
  }

  const readMessage = async (count) => {
    const body = {
      receiver_id: props.user_id,
    }

    const res = await putAPI({ path: `messages/${unique_id}`, body })

    if (res.data) {
      updateMessages({ id: unique_id, receiver_id: props.user_id })
      const unreadMessages = useMessageStore.getState().unreadMessages
      changeUnreadMessages(unreadMessages - count)
    } else console.log(res.message)
  }

  return (
    <>
      <MsgNav opponent={opponent} />
      <Bubble messages={messages} unique_id={unique_id} user_id={props.user_id} token={props.token} />

      <form id="formMessage" className="col-lg-offset-3" onSubmit={e => sendHandler(e)}>
        <input id="msg-input" autoComplete="off" />
        <button>Send</button>
      </form>
    </>
  )
}

export default memo(chatDetail)