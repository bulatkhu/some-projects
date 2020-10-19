import React from 'react'
import './socialLinks.scss'
import arrowUpIcon   from '../../../../images/landing/socialLinks/arrowUp.svg'

const SocialLinks = () => {

  return (
    <section className="socialLinks">
      <div className="socialLinks__container _container">
        <div className="socialLinks__boxLinks boxLinks">

          <a href="#topContent" className="boxLinks__item item__arrowUp">
            <span className="item__wrapper">
              <img src={arrowUpIcon} alt="arrowUp"/>
            </span>
          </a>

        </div>
      </div>
    </section>
  )
}

export default SocialLinks