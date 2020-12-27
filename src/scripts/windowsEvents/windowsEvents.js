const callbacksArray = []

export function onScrollWindows(callback) {
  callback()
  callbacksArray.push(callback)
  window.onscroll = () => callbacksArray.forEach(callback => callback())

}

export function deleteCallbackOnUnMounting(callback) {
  const indexOfFuncToDelete = callbacksArray.findIndex(func => func.toString() === callback.toString())

  if (indexOfFuncToDelete || indexOfFuncToDelete === 0) {
    callbacksArray.splice(indexOfFuncToDelete, 1)
  }
}
