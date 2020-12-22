import * as actions from '../actions/language/langActions'
import {getLocalLanguage} from '../../hooks/useLanguages'

const initialLanguage = {
  value: getLocalLanguage()
}

export default function LangReducer (state = initialLanguage, action) {

  switch (action.type) {
    case actions.SET_KZ_LANGUAGE:
      return {
        ...state, value: action.payload
      }
    case actions.SET_RU_LANGUAGE:
      return {
        ...state, value: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
