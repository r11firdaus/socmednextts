const appendMessage = (msg, user_id) => {
  const msgUL = document.getElementById(`message_${msg.unique_id}`);
      if (msgUL) {
        let element = ''
        if (msg.user_id == user_id) {
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

export default appendMessage