import * as actions from './userActions'


export function setUsersData(user) {
  return {
    type: actions.SET_USERS_DATA,
    user
  }
}

export function deleteUsersData() {
  return {
    type: actions.SET_USERS_DATA,
    user: null
  }
}