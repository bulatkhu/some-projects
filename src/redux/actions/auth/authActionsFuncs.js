import * as actions from './authActions'
import {deleteUsersData} from '../user/userActionsFuncs'


export function checkIsAuth(payload) {
  return {
    type: actions.IS_AUTHENTICATED,
    payload
  }
}

export function logoutAction() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  deleteUsersData()

  return {
    type: actions.LOGOUT,
    payload: false
  }
}
