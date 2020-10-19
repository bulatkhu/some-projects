import * as actions from '../actions/menuActions'


const initialMenuState = {
  showRegisterModal: false,
  showLoginModal: false,
  isLoggedMenu: false,
}

export default function MenuReducer(state = initialMenuState, action) {
  switch (action.type) {
    case actions.SHOW_LOGIN_MODAL:
      return { ...state, showLoginModal: action.payload }
    case actions.SHOW_REGISTER_MODAL:
      return { ...state, showRegisterModal: action.payload }
    case actions.HIDE_LOGIN_MODAL:
      return { ...state, showLoginModal: action.payload }
    case actions.HIDE_REGISTER_MODAL:
      return { ...state, showRegisterModal: action.payload }
    case actions.LOGGED_MENU:
      return { ...state, isLoggedMenu: action.payload }
    case actions.UN_LOGGED_MENU:
      return { ...state, isLoggedMenu: action.payload }
    default:
      return state
  }
}