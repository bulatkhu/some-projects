import * as actions from './coursesTabActions'


export function setActiveTab(tab) {
  return {
    type: actions.SET_ACTIVE_TAB,
    payload: tab
  }
}