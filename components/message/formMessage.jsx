import { getData } from '../../lib/dataStore'
import { memo } from 'react'

const FormMessage = (props) => {
	const sendHandler = async (e) => {
		const user_id = getData('user_id')
    e.preventDefault()
    let receiver_id = props.unique_id.split('+').filter(e => e != user_id)[0]
    const postText = document.getElementById('msg-input')

    const res = await fetch(`http://localhost:4000/api/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': await getData('token')
      },
      body: JSON.stringify({
        content: postText.value,
        user_id,
        unique_id: props.unique_id,
        receiver_id
      })
    })

    if (res.status === 200) {
      let resJson = await res.json()
      postText.value = ''
      let cloneMessages = [...props.messages]
      cloneMessages.push(resJson.data)
      // setmessages(cloneMessages)
    }
  }
	return (<>
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
	</>)
}

export default memo(FormMessage)