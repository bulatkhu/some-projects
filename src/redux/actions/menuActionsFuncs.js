import * as actions from './menuActions'


export function showModalLogin() {
  return {
    type: actions.SHOW_LOGIN_MODAL,
    payload: true
  }
}

export function hideModalLogin() {
  return {
    type: actions.HIDE_LOGIN_MODAL,
    payload: false
  }
}

export function showModalReg() {
  return {
    type: actions.SHOW_REGISTER_MODAL,
    payload: true
  }
}

export function hideModalReg() {
  return {
    type: actions.HIDE_REGISTER_MODAL,
    payload: false
  }
}