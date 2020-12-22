export const setLocalLanguage = lang => localStorage.setItem('language', lang)
export const getLocalLanguage = () => {
  const lang = localStorage.getItem('language')

  if (!lang) {
    setLocalLanguage('kz')
    return getLocalLanguage()
  }
  return lang
}
