import React from 'react'
import { createPortal } from 'react-dom'


const ModalPortal = ({children}) => {

  return createPortal(
    <>{children}</>,
    document.getElementById('modal__root')
  )

}

export default ModalPortal