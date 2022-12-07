import { useEffect, useState } from 'react'
import { getData } from '../../lib/dataStore'

export const getServerSideProps = async (ctx) => {
  const { query } = ctx
  const unique_id = query.unique_id

  return {props: {unique_id}}
}

const chatDetail = (props) => {
  const [messages, setmessages] = useState([])
  const [user_id, setuser_id] = useState(null)
  let unique_id = props.unique_id

  useEffect(() => {
    const getUserId = getData('user_id')
    if (getUserId) {
      setuser_id(getUserId)
      async function fetchData () {
        const res = await fetch(`http://localhost:4000/api/v1/chats/${unique_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.status == 200) {
          const resJson = await res.json()
          unique_id = resJson.unique_id
          resJson.data.length > 0 && setmessages(resJson.data)
          console.log(resJson)
        }
      }
      fetchData()
    } else {
      console.log('unauthorized')
    }
  }, [])
  
  const sendHandler = async (e) => {
    e.preventDefault()

    const postText = document.getElementById('msg-input')

    const res = await fetch(`http://localhost:4000/api/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': await getData('token')
      },
      body: JSON.stringify({
        content: postText.value,
        user_id: await getData('user_id'),
        unique_id
      })
    })

    if (res.status === 200) {
      let resJson = await res.json()
      postText.value = ''
      let cloneMessages = [...messages]
      cloneMessages.push(resJson.data)
      setmessages(cloneMessages)
    }
  }

  return (
  <>
      {messages.length > 0 &&
        <ul className="row" id={`message_${unique_id}`} style={{ margin: '5rem 2rem 3rem 0', listStyle: 'none' }}>
            {messages.map((per) => (
              <div className="col-12" style={{ padding: '0' }} key={per.id}>
                  {per.user_id == user_id ?
                    <div className="row d-flex flex-row-reverse">
                      <li className="col-auto card my-baloon">{per.content}</li>
                    </div> :
                    <div className="row">
                      <li className="col-auto card opponent-baloon">{per.content}</li>
                    </div>
                  }
              </div>
            ))}
        </ul>
      }

    <form id="form" className="col-lg-offset-3" onSubmit={e => sendHandler(e)}>
      <input id="msg-input" autoComplete="off" />
      <button>Send</button>
    </form>
    <style jsx>
      {`
      #form { background: white; padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #msg-input { border: 1px solid #4b3832; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #msg-input { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; border-radius: 3px; outline: none; color: #fff; }
    `}
    </style>
  </>
  )
}

const styles = {
  userMe: {
      maxWidth: '70%',
      backgroundColor: '#be9b7b',
      padding: '10px',
      margin: '10px',
      color: 'white'
  },
  otherUser: {
      maxWidth: '70%',
      padding: '10px',
      margin: '10px'
  }
}

export default chatDetail