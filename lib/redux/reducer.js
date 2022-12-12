const initialState = {
  isOnline: false,
  newWSMessage: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_ONLINE':
      return {
        ...state,
        isOnline: action.payload
      }
      case 'NEW_MESSAGE':
      return {
        ...state,
        newWSMessage: action.payload
      }
      default:
      return state
  }
}

export default reducer