import React from 'react'

const FeatureBox = ({title, text}) => {

  return (
    <div className="features__column featBody">
      <div className="featBody__top">
        <h2 className="featBody__title">
          {title}
        </h2>
        <div className="featBody__line80"/>
        <div className="featBody__line70"/>
      </div>
      {
        text
          ? <div className="featBody__bottom">
              <p className="featBody__text">{text}</p>
            </div>
          : <div className="featBody__line60"/>
      }
    </div>
  )
}

export default FeatureBox