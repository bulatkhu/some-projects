import React from 'react'
import './LittleBtn.scss'
// import '../ModalPass/ModalPass.scoped.scss'

const LittleBtn = ({children = 'none', color, className, fontSize, bigFontSize}) => {
  const btnClass = ['button', color, className || null, bigFontSize && 'bigFontSize'].join(' ')



  return (
    <button
      className={btnClass}
      style={{fontSize}}
    >{children}</button>
  )

}

export default LittleBtn