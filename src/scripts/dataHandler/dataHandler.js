import {isEmpty} from "../isEmpty/isEmpty";

export function getFromUserMeta(user, option) {
  const candidate = user.usermetas.find(item => item.option === option)
  if (!isEmpty(candidate)) {
    return candidate.value
  } else {
    return null
  }
}
