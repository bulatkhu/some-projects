import React from 'react'

const FeatureBox = ({icon, title, text}) => {

  return (
    <div className="features__column featBody">
      <div className="featBody__icon">
        <img src={icon} alt="feature-icon"/>
      </div>
      <h2 className="featBody__title">
        {title}
      </h2>
      <p className="featBody__text">{text}</p>
    </div>
  )
}

export default FeatureBox