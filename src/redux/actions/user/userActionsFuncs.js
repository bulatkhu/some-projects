import * as actions from './userActions'
import {getUserData} from '../../../request/apiUser'
import {getFromUserMeta} from '../../../scripts/dataHandler/dataHandler'


export function setUsersData() {
  return async dispatch => {
    const user = await getUserData()
    if (user.error) {
      return dispatch({
        type: actions.SET_USERS_DATA,
        user: null
      })
    }


    user.data.localAvatar = (
      getFromUserMeta(user.data,'avatar') ||
      getFromUserMeta(user.data,'profile_image')
    )
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
