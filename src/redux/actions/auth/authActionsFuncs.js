import * as actions from './authActions'
import {deleteUsersData} from '../user/userActionsFuncs'
import {getToken} from '../../../request/apiRequests'


export function checkIsAuth() {

  return {
    type: actions.IS_AUTHENTICATED,
    payload: !!getToken()
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
