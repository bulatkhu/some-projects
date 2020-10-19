import React from 'react'
import './loader.scss'
import LoaderContainer from '../../container/loaderContainer/loaderContainer'


const Loader = ({container = true}) => {

  const loader = <div className="mainLoader"><div/><div/><div/></div>


  return (
    container
      ? <LoaderContainer>
        {loader}
      </LoaderContainer>
      : <>{loader}</>
  )

}

export default Loader