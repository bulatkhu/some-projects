import React from 'react'
import logoEducon from '../../../../images/landing/header/logo.svg'
import './footer.scss'


const Footer = () => {

  return (

    <footer className="footer">
      <div className="footer__container _container">
        <div className="footer__content">
          <div className="footer__column columnFoot">
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
                <li className="columnFoot__link"><a href="/">Мәліметтер</a></li>
                <li className="columnFoot__link"><a href="/">Серіктестер</a></li>
                <li className="columnFoot__link"><a href="/">Пікірлер</a></li>
                <li className="columnFoot__link"><a href="/">Блог</a></li>
                <li className="columnFoot__link"><a href="/">Жаңалықтар</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">

            <div className="columnFoot__content">
              <h5 className="columnFoot__title">Анықтама</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/">FAQs</a></li>
                <li className="columnFoot__link"><a href="/">Көмек үшін</a></li>
                <li className="columnFoot__link"><a href="/">Құжаттар</a></li>
                <li className="columnFoot__link"><a href="/">Жұмыс барысы</a></li>
                <li className="columnFoot__link"><a href="/">Құқықтар</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__column columnFoot">
            <div className="columnFoot__content">
              <h5 className="columnFoot__title">Сілтемелер</h5>
              <ul className="columnFoot__list">
                <li className="columnFoot__link"><a href="/">Негізгі бет</a></li>
                <li className="columnFoot__link"><a href="/">Біз туралы</a></li>
                <li className="columnFoot__link"><a href="/">Курстар</a></li>
                <li className="columnFoot__link"><a href="/">Жеңілдіктер</a></li>
                <li className="columnFoot__link"><a href="/">Байланыс</a></li>
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