import * as actions from '../actions/user/userActions'

const initialUserState = {
  user: null
}

export default function UserReducer(state = initialUserState, action) {

  switch (action.type) {
    case actions.SET_USERS_DATA:
      return {
        ...state, user: action.user
      }
    case actions.DELETE_USERS_DATA:
      return {
        ...state, user: action.user
      }
    default:
      return state
  }

}