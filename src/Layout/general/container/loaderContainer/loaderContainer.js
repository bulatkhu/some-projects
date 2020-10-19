import React from 'react'
import './loaderContainer.scoped.scss'


const LoaderContainer = ({children}) => {

  return (
    <div className="_container">

      <div className="loaderWrap">

        {children}

      </div>

    </div>
  )

}

export default LoaderContainer