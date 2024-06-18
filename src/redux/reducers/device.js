import { GET_DEVICE } from '../actions'

const initialState = {
  content: [],
}

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEVICE:
      return {
        ...state,
        content: action.payload,
      }
    default:
      return state
  }
}
export default deviceReducer
