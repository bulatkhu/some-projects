import * as actions from './userActions'
import {getUserData} from '../../../request/apiUser'
import {getFromUserMeta} from '../../../scripts/dataHandler/dataHandler'
import {logoutAction} from '../auth/authActionsFuncs'
import {SITE_BASE_URL} from '../../../app.config'


export function setUsersData() {
  return async dispatch => {
    const user = await getUserData()
    if (user.error) {
      logoutAction()

      return dispatch({
        type: actions.SET_USERS_DATA,
        user: null
      })
    }

    const avatar = getFromUserMeta(user.data,'avatar') || getFromUserMeta(user.data,'profile_image')
    user.data.localAvatar = avatar.toString().includes('http') || avatar.toString().includes('https')
      ? avatar
      : `${SITE_BASE_URL}/${avatar}`
    dispatch({
      type: actions.SET_USERS_DATA,
      user: user.data
    })
  }
}

export function deleteUsersData() {
  return {
    type: actions.DELETE_USERS_DATA,
    user: null
  }
}
