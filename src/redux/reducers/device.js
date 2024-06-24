import { GET_DEVICE, GET_DEVICE_DETAIL, RESET_DEVICE } from '../actions'

const initialState = {
  content: [],
  deviceById: null,
}

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEVICE:
      return {
        ...state,
        content: action.payload,
      }
    case GET_DEVICE_DETAIL:
      return {
        ...state,
        deviceById: action.payload,
      }
    case RESET_DEVICE:
      return {
        initialState,
      }
    default:
      return state
  }
}
export default deviceReducer
