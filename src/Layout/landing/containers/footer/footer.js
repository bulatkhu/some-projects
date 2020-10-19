import React from 'react'
import logoEducon from '../../../../images/landing/footer/footer-logo.svg'
import './footer.scss'
import telegramIcon from '../../../../images/general/teacher/telegram-svg.svg'
import whatsappIcon from '../../../../images/general/teacher/whatsapp-svg.svg'
import instagramIcon from '../../../../images/general/teacher/instagram-svg.svg'


const Footer = () => {

  return (

    <footer className="footer">
      <div className="footer__container _container">
        <div className="footer__content">
          <div className="footer__column columnFoot columnFoot__top">
            <div className="columnFoot__logo"><img src={logoEducon} alt="logo educon"/></div>
            <p className="columnFoot__confidentiality">
              Бұл сайттың мазмұны мен оның қосымшалары және материалдары құпия болып табылады. Сайтта жарияланған барлық
              материалдар мен жазбалар EDUCON.ONLINE платформасына тиесілі.
            </p>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title">Біз Туралы</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/">Біз туралы</a></li>
                <li className="columnFoot__link"><a href="/">Нұсқаулық</a></li>
                <li className="columnFoot__link"><a href="/">&nbsp;</a></li>
                <li className="columnFoot__link columnFoot__socMedia">
                  <a href="/">
                    <img src={whatsappIcon} alt="link"/>
                  </a>
                  <a href="/">
                    <img src={telegramIcon} alt="link"/>
                  </a>
                  <a href="/">
                    <img src={instagramIcon} alt="link"/>
                  </a>
                </li>
                {/*<li className="columnFoot__link"><a href="/">Жаңалықтар</a></li>*/}
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">

            <div className="columnFoot__content">
              <h5 className="columnFoot__title">Анықтама</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/">Қолдану саясаты </a></li>
                <li className="columnFoot__link"><a href="/">Көмек үшін</a></li>
                <li className="columnFoot__link"><a href="/">Байланыс</a></li>
                <li className="columnFoot__link"><a href="/">Серіктестік</a></li>
                {/*<li className="columnFoot__link"><a href="/">Құқықтар</a></li>*/}
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title">Сілтемелер</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/">Негізгі бет</a></li>
                <li className="columnFoot__link"><a href="/">Ұстаздар</a></li>
                <li className="columnFoot__link"><a href="/">Курстар</a></li>
                <li className="columnFoot__link"><a href="/">Материалдар</a></li>
                <li className="columnFoot__link"><a href="/">Блог</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title columnFoot__title__none">&nbsp;</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/">EduCoin</a></li>
                <li className="columnFoot__link"><a href="/">Кіру</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__rights">
          <p>EDUCONLINE © 2020 Барлық құқықтар қорғалған</p>
        </div>
      </div>
    </footer>
  )
}


export default Footer