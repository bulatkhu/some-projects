import React from 'react'
import {NavLink} from 'react-router-dom'
import './login.scss'
import avatar from '../../images/login/navbar/profilePhoto.jpg'
import eduCoin from '../../images/landing/educoin/eduCoin.svg'
import {
  CalendarIcon,
  ChatIcon, EditIcon,
  EduCoinIcon,
  InfoIcon,
  PaymentIcon, PromoIcon,
  TestIcon
} from '../../images/general/menuIcons/infoIcon'


const Login = ({children, links, type}) => {

  const {base} = links
  console.log(base)

  const toggleNavBar = event => {

    if (event.target.classList.contains('btnBurger__menu') || event.target.classList.contains('btnBurger__span')) {
      event.currentTarget.classList.contains('active')
        ? event.currentTarget.classList.remove('active')
        :event.currentTarget.classList.add('active')
    }
  }

  return (
    <section className="loginNav">

      <div onClick={toggleNavBar} className="loginNav__navBar active">
        <div className="loginNav__column loginNav__btnBurger btnBurger">
          <div className="btnBurger__menu">
            <span className="btnBurger__span"/><span className="btnBurger__span"/><span className="btnBurger__span"/>
          </div>
        </div>

        <div className="loginNav__column loginNav__profile loginProf">
          <div className="loginProf__img loginProf__column">
            <img src={avatar} alt="avatar"/>
          </div>

          <div className="loginProf__description loginProf__column">
            <div className="loginProf__name">Student Name</div>
            <div className="loginProf__coins">
              <div className="loginProf__educoin">
                <img src={eduCoin} alt="eduCoin"/>
              </div>
              <span>999999</span>
            </div>
          </div>
        </div>

        <ul className="loginNav__column loginNav__list">
          <li className="loginNav__item">
            <NavLink exact className="loginNav__link" to={base}>
              <div className="loginNav__linkIcon">
                <InfoIcon/>
              </div>
              <span>Курстарым</span></NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link" to={base + "/tests"}>
              <div className="loginNav__linkIcon">
                <TestIcon/>
              </div>
              <span>Тестерім</span>
            </NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link loginNav__linkChat" to={base + "/chat"}>
              <div className="loginNav__linkWrapper">
                <div className="loginNav__linkIcon">
                  <ChatIcon/>
                </div>

                <span>Чат</span>
              </div>

              <div className="loginNav__linkMessages">
                <span>1</span>
              </div>
            </NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link" to={base + "/calendar"}>
              <div className="loginNav__linkIcon">
                <CalendarIcon/>
              </div>
              <span>Жоспарларым</span>
            </NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link" to={base + "/payment"}>
              <div className="loginNav__linkIcon">
                <PaymentIcon/>
              </div>
              <span>Төлемдер</span>
            </NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link" to={base + "/eduCoin"}>
              <div className="loginNav__linkIcon">
                <EduCoinIcon/>
              </div>
              <span>EduCoin</span>
            </NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link" to={base + "/promo"}>
              <div className="loginNav__linkIcon">
                <PromoIcon/>
              </div>
              <span>Promo Code</span>
            </NavLink>
          </li>
          <li className="loginNav__item">
            <NavLink className="loginNav__link" to={base + "/edit"}>
              <div className="loginNav__linkIcon">
                <EditIcon/>
              </div>
              <span>Edit Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="loginNav__body">
        <div className="loginNav__container _container">
          <div className="loginNav__thinkLine"/>
          {children}
        </div>
      </div>


    </section>
  )
}

export default Login