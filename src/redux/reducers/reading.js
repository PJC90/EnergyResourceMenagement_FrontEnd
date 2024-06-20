import { GET_CONSUMPTION_THRESHOLD } from '../actions'

const initialState = {
  content: null,
}

const readingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSUMPTION_THRESHOLD:
      return {
        ...state,
        content: action.payload,
      }
    default:
      return state
  }
}
export default readingReducer
