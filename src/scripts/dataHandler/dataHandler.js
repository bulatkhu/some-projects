import {isEmpty} from "../isEmpty/isEmpty";

export function getFromUserMeta(user, option) {
  const candidate = user.usermetas.find(item => item.option === option)
  if (!isEmpty(candidate)) {
    return candidate.value
  } else {
    return null
  }
}

export function isArraysEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
