import * as actions from '../actions/auth/authActions'

const initialAuthState = {
  isAuthenticated: false
}

export default function AuthReducer(state = initialAuthState, action) {

  switch (action.type) {
    case actions.IS_AUTHENTICATED:
      return {
        ...state, isAuthenticated: action.payload
      }
    case actions.LOGOUT:
      return {
        ...state, isAuthenticated: action.payload
      }
    default:
      return state
  }

}