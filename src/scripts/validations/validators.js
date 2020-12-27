export const validatePhone = value => {
  if (!value) {
    return 'Required'
  } else if (
    !/^(\+7)?[\s-]?\(?[4789][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/i.test(
      value
    )
  ) {
    return 'Enter 10 digits';
  }
  return undefined;
};

export const validateEmail = email => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
}

export const validatePassword = password => {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  return !re.test(password)
}


export function alphaNumeric(value) {
  const letters = /^[0-9a-zA-Z]+$/
  if(value.match(letters)) {
    return true
  } else {
    return false
  }
}
