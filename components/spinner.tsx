const Spinner = (props: { types: string }) => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{'height': '90%'}}>
      <div className={`lds-${props.types}`}><div></div><div></div></div>
    </div>
  )
}

export default Spinner