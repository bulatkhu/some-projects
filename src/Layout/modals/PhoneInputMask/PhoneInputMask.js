import React from 'react'
import InputMask from 'react-input-mask'


const PhoneInputMask = props => {

  return (
    <label className="regForm__label" htmlFor="phone">
      <span className="hidden">Phone</span>
      <InputMask
        // mask={mask}
        className="regForm__input"
        required
        placeholder="+7 (___) - ___ - __ - __"
        {...props}
      />
    </label>
  )
}

export default PhoneInputMask
