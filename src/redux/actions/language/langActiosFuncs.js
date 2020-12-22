import * as actions from './langActions'


export function setKZLanguage() {
  return {
    type: actions.SET_KZ_LANGUAGE,
    payload: 'kz'
  }
}

export function setRuLanguage() {
  return {
    type: actions.SET_RU_LANGUAGE,
    payload: 'ru'
  }
}
