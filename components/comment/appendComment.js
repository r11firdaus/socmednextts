const appendComment = (comment) => {
  const section = document.getElementById(`sectionComment-${comment.post_id}`)
  const htmlStr = `
                    <div class="card border-secondary bg-dark" key=${comment.id}>
                      <div class="card-body">
                        <strong>${comment.email}</strong>
                        <p>${comment.content}</p>
                      </div>
                    </div>
                  `
  section.insertAdjacentHTML('beforeend', htmlStr);
}

export default appendComment

// NEXT CACHE/LOCAL STORAGE POST DATA