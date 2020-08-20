import React from 'react'
import studentIcon from '../../../images/educoin/student.svg'
import arcIcon from '../../../images/educoin/eduCoin.svg'
import giftIcon from '../../../images/educoin/gift.svg'
import './educoin.scss'

const EduCoin = () => {

  return (
    <section className="educoin">

      <div className="educoin__container _container">

        <h2 className="educoin__title">EduCoin</h2>

        <p className="educoin__subTitle">Ынталандыру арқылы білім беру жүйесі</p>

        <div className="educoin__content">

          <div className="educoin__column eduComp">
            <div className="eduComp__box styleBlue">

              <div className="eduComp__arc">
                <div className="eduComp__wrapper">
                  <div className="eduComp__img">
                    <img src={studentIcon} alt="student"/>
                  </div>
                </div>
              </div>

              <div className="eduComp__text coins1">

                <div className="coins1__description">
                  <div className="coins1__title">Білім ал</div>
                  <div className="coins1__text">
                    Порталға тіркеліп, білім ал. Алған әсеріңмен бөліс. Нәтижелеріңді жаңарт. Жетістікке жет.
                  </div>
                </div>

                <div className="coins1__number">
                  1
                </div>

                <div className="coins1__circle"/>
              </div>
            </div>
          </div>

          <div className="educoin__column eduComp">
            <div className="eduComp__box styleRed">

              <div className="eduComp__arc">
                <div className="eduComp__wrapper">
                  <div className="eduComp__img">
                    <img src={arcIcon} alt="student"/>
                  </div>
                </div>
              </div>
              <div className="eduComp__text coins1">

                <div className="coins1__description">
                  <div className="coins1__title">EduCoin жина</div>
                  <div className="coins1__text">
                    Порталда алған әрбір сәтің үшін біліммен қоса ұпай жина.
                  </div>
                </div>

                <div className="coins1__number">
                  2
                </div>
                <div className="coins1__circle"/>

              </div>
            </div>
          </div>

          <div className="educoin__column eduComp">
            <div className="eduComp__box styleYellow">
              <div className="eduComp__arc">
                <div className="eduComp__wrapper">
                  <div className="eduComp__img">
                    <img src={giftIcon} alt="student"/>
                  </div>
                </div>
              </div>

              <div className="eduComp__text coins1">

                <div className="coins1__description">
                  <div className="coins1__title">Бағалы сыйлық ұтып ал</div>
                  <div className="coins1__text">
                    Оқудың ақысын EduCoin-мен төле және сол EduCoin арқылы бағалы сыйлықтар ұтып ал.
                  </div>
                </div>

                <div className="coins1__number">
                  3
                </div>
                <div className="coins1__circle"/>


              </div>
            </div>
          </div>


        </div>

        <button className="educoin__button">Толығырақ</button>

      </div>

    </section>
  )
}

export default EduCoin