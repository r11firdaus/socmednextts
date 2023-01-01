import setDateTime from '../../lib/setDateTime'

const Bubble = (props) => { 
	return (<>
    <ul className="row" id={`message_${props.unique_id}`} style={{ margin: '5rem 2rem 3rem 0', listStyle: 'none' }}>
      {props.messages.length > 0 &&
        props.messages.map((per) => (
          <div className="col-12" style={{ padding: '0' }} key={per.id}>
            {per.user_id == props.user_id ?
              <div className="row d-flex flex-row-reverse">
                <li className="col-auto card my-baloon">
                  {per.content}
                  <div className="d-flex flex-row-reverse">
                    <span className={`text-${per.status == 3 ? 'primary' : 'light'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-all ms-auto" viewBox="0 0 16 16">
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
                      </svg>
                    </span>
                    <small className="text-light mr-1">{setDateTime(per.created_at)}</small>
                  </div>
                </li>
              </div> :
              <div className="row">
                <li className="col-auto card opponent-baloon">
                  {per.content}
                  <small className="text-secondary mr-1">{setDateTime(per.created_at)}</small>
                </li>
              </div>
            }
          </div>
        ))
      }	
    </ul>
	</>)
}

export default Bubble