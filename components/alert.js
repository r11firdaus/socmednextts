const Alert = (props) => {
  return (
    <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
      <strong>Horray!</strong> You successfully add new post.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert