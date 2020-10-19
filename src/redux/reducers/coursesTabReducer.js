import * as actions from '../actions/coursesTabActions'


const initialMenuState = {
  activeTab: null
}

export default function MenuReducer(state = initialMenuState, action) {
  switch (action.type) {
    case actions.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload }
    default:
      return state
  }
}