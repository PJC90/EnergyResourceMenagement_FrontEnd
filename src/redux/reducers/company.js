import { GET_COMPANY, RESET_COMPANY } from '../actions'

const initialState = {
  content: null,
}

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY:
      return {
        ...state,
        content: action.payload,
      }
    case RESET_COMPANY:
      return initialState

    default:
      return state
  }
}

export default companyReducer
