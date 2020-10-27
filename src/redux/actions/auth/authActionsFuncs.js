import * as actions from './authActions'


export function checkIsAuth(payload) {
  return {
    type: actions.IS_AUTHENTICATED,
    payload
  }
}

export function logoutAction() {
  localStorage.removeItem('token')

  return {
    type: actions.LOGOUT,
    payload: false
  }
}