import { memo } from 'react'

const Bubble = (props) => { 
	return (<>
    <ul className="row" id={`message_${props.unique_id}`} style={{ margin: '5rem 2rem 3rem 0', listStyle: 'none' }}>
      {props.messages.length > 0 &&
        props.messages.map((per) => (
          <div className="col-12" style={{ padding: '0' }} key={per.id}>
              {per.user_id == props.user_id ?
                <div className="row d-flex flex-row-reverse">
                  <li className="col-auto card my-baloon">{per.content}</li>
                </div> :
                <div className="row">
                  <li className="col-auto card opponent-baloon">{per.content}</li>
                </div>
              }
          </div>
        ))
      }	
    </ul>
	</>)
}

export default memo(Bubble)