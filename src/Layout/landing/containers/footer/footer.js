import React from 'react'
import logoEducon from '../../../../images/landing/footer/footer-logo.svg'
import facebookIcon from '../../../../images/landing/footer/facebook-icon.svg'
import youtubeIcon from '../../../../images/landing/footer/youtube-icon.svg'
import instagramIcon from '../../../../images/landing/footer/instagram-icon.svg'
import './footer.scoped.scss'
import {Translate} from "react-translated";


const Footer = () => {

  return (

    <footer className="footer">
      <div className="footer__container _container">
        <div className="footer__content">
          <div className="footer__column columnFoot columnFoot__top">
            <div className="columnFoot__logo"><img src={logoEducon} alt="logo educon"/></div>
            <ul className="columnFoot__firstColumn firstColumn">
              <li className="firstColumn__item">
                <span><Translate text="Алматы қаласы; 4"/></span>
              </li>
              <li className="firstColumn__item">
                <a
                  className="firstColumn__icon firstColumn__phone"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="tel:+77073446060">+77073446060</a>
              </li>
              <li className="firstColumn__item">
                <a
                  className="firstColumn__icon firstColumn__whatsapp"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://wa.me/+77072300555">+77072300555</a>
              </li>
              <li className="firstColumn__item">
                <a
                  className="firstColumn__icon firstColumn__email"
                  rel="noopener noreferrer"
                  href="mailto:online.educon@gmail.com">online.educon@gmail.com</a>
              </li>
            </ul>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title">
                <Translate text="Бізге жазылыңыз"/>
              </h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link columnFoot__socMedia">
                  <a href="/">
                    <img src={instagramIcon} alt="link"/>
                  </a>
                  <a href="/">
                    <img src={youtubeIcon} alt="link"/>
                  </a>
                  <a href="/">
                    <img src={facebookIcon} alt="link"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title">Сілтемелер</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/"><Translate text="Басты бет"/></a></li>
                <li className="columnFoot__link"><a href="/"><Translate text="Неліктен EduCon"/></a></li>
                <li className="columnFoot__link"><a href="/"><Translate text="Курстарымыз"/></a></li>
                <li className="columnFoot__link"><a href="/"><Translate text="Үзінділер"/></a></li>
                <li className="columnFoot__link"><a href="/"><Translate text="Оқу ақысы"/></a></li>
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title columnFoot__title__none">&nbsp;</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/"><Translate text="EduCoin"/></a></li>
                <li className="columnFoot__link"><a href="/"><Translate text="EduCoin рейтинг"/></a></li>
                <li className="columnFoot__link"><a href="/"><Translate text="Серіктестеріміз"/></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__rights">
        <p><Translate text="EduCon.online © 20"/></p>
      </div>
    </footer>
  )
}


export default Footer
