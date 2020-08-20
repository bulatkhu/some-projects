import React from 'react'
import './socialLinks.scss'
import whatsappIcon from '../../../images/socialLinks/whatsapp.svg'
import instagramIcon from '../../../images/socialLinks/instagram.svg'
import telegramIcon from '../../../images/socialLinks/telegram.svg'
import tIcon from '../../../images/socialLinks/t.svg'
import arrowUpIcon from '../../../images/socialLinks/arrowUp.svg'

const SocialLinks = () => {

  return (
    <section className="socialLinks">
      <div className="socialLinks__container _container">
        <div className="socialLinks__boxLinks boxLinks">
          <a href="/" className="boxLinks__item item__t">
            <span className="item__wrapper">
              <img src={tIcon} alt="social"/>
            </span>
          </a>
          <a href="/" className="boxLinks__item item__whatsapp">
            <span className="item__wrapper">
              <img src={whatsappIcon} alt="social"/>
            </span>
          </a>
          <a href="/" className="boxLinks__item item__telegram">
            <span className="item__wrapper">
              <img src={telegramIcon} alt="social"/>
            </span>
          </a>
          <a href="/" className="boxLinks__item item__instagram">
            <span className="item__wrapper">
              <img src={instagramIcon} alt="social"/>
            </span>
          </a>
          <a href="/" className="boxLinks__item item__arrowUp">
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