import { GET_ALERT_READINGS, GET_DEVICE, GET_DEVICE_DETAIL } from '../actions'

const initialState = {
  content: [],
  deviceById: null,
  alertReadings: [],
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
    case GET_ALERT_READINGS:
      return {
        ...state,
        alertReadings: action.payload,
      }
    default:
      return state
  }
}
export default deviceReducer
