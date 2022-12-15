const Alert = (props) => {
  const { status, statusText, type } = props.data
    return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <strong>{status}</strong> {statusText}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert