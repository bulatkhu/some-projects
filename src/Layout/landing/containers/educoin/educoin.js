import React from 'react'
import studentIcon from '../../../../images/landing/educoin/student.svg'
import arcIcon from '../../../../images/landing/educoin/eduCoin.svg'
import giftIcon from '../../../../images/landing/educoin/gift.svg'
import './educoin.scss'
import {Link} from 'react-router-dom'
import {Translate} from "react-translated";

const EduCoin = () => {

  return (
    <section id="eduCoin" className="educoin" >

      <div className="educoin__container _container">

        <h2 className="educoin__title">EduCoin</h2>

        <p className="educoin__subTitle"> {<Translate text="Ынталандыру ар"/>}</p>

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
                  <div className="coins1__title">{<Translate text="Білім ал"/>}</div>
                  <div className="coins1__text">
                    {<Translate text="Порталға тіркеліп"/>}
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
                  <div className="coins1__title"><Translate text="Білім ал"/><Translate text="EduCoin жина"/></div>
                  <div className="coins1__text">
                    <Translate text="Порталда алған"/>
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
                  <div className="coins1__title"><Translate text="Бағалы сыйлық"/></div>
                  <div className="coins1__text">
                    <Translate text="Оқудың ақысын"/>
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

        <Link to="/educoin-page" className="educoin__button btn__shadowFromNull"><Translate text="Толығырақ"/></Link>


      </div>

    </section>
  )
}

export default EduCoin
