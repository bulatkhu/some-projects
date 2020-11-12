import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import './login.scss'
import eduCoin from '../../images/landing/educoin/eduCoin.svg'
import {
  CalendarIcon, ChatIcon, EditIcon,
  EduCoinIcon, HatIcon, InfoIcon, ListIcon,
  PaymentIcon, PromoIcon, TestIcon
} from '../../images/general/menuIcons/infoIcon'
import LogoutButton from '../auth/LogoutButton/LogoutButton'
import {connect} from 'react-redux'
import {setUsersData} from '../../redux/actions/user/userActionsFuncs'
import {SITE_BASE_URL} from "../../app.config";
import NoPhoto from "../../images/general/noPhoto/noPhoto";


const Login = ({children, links, type, photo, coins, user, setUserData, isAuth}) => {
  const [showMenu, setShowMenu] = useState(true)
  const [username, setUsername] = useState('Student name')
  const {base} = links


  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUsername(JSON.parse(localStorage.getItem('user')).user.name)
    }
  }, [username])

  useEffect(() => {
    if (!user && isAuth) {
      setUserData()
    }
  }, [user, isAuth, setUserData])


  const toggleNavBar = event => {

    if (event.target.classList.contains('btnBurger__menu') || event.target.classList.contains('btnBurger__span')) {
      setShowMenu(prev => !prev)
    }
  }


  let linkList


  if (type === 'student') {
    linkList = (
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
        <li className="loginNav__item">
          <LogoutButton>
            Шығу
          </LogoutButton>
        </li>
      </ul>
    )
  } else if (type === 'teacher') {
    linkList = (
      <ul className="loginNav__column loginNav__list">
        <li className="loginNav__item">
          <NavLink exact className="loginNav__link" to={base}>
            <div className="loginNav__linkIcon">
              <InfoIcon/>
            </div>
            <span>Курстарым</span></NavLink>
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
          <NavLink className="loginNav__link" to={base + "/list"}>
            <div className="loginNav__linkIcon">
              <HatIcon/>
            </div>
            <span>Төлемдер</span>
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
          <NavLink className="loginNav__link" to={base + "/edit"}>
            <div className="loginNav__linkIcon">
              <EditIcon/>
            </div>
            <span>Edit Profile</span>
          </NavLink>
        </li>
        <li className="loginNav__item">
          <LogoutButton>
            Шығу
          </LogoutButton>
        </li>
      </ul>
    )
  } else if (type === 'tutor') {
    linkList = (
      <ul className="loginNav__column loginNav__list">
        <li className="loginNav__item">
          <NavLink exact className="loginNav__link" to={base}>
            <div className="loginNav__linkIcon">
              <InfoIcon/>
            </div>
            <span>Курстарым</span></NavLink>
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
          <NavLink className="loginNav__link" to={base + "/list"}>
            <div className="loginNav__linkIcon">
              <ListIcon/>
            </div>
            <span>Жалпы тізім</span>
          </NavLink>
        </li>
        <li className="loginNav__item">
          <NavLink className="loginNav__link loginNav__linkChat" to={base + "/educoin"}>
            <div className="loginNav__linkWrapper">
              <div className="loginNav__linkIcon">
                <EduCoinIcon/>
              </div>
              <span>EduCoin</span>
            </div>
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
          <NavLink className="loginNav__link" to={base + "/edit"}>
            <div className="loginNav__linkIcon">
              <EditIcon/>
            </div>
            <span>Edit Profile</span>
          </NavLink>
        </li>
        <li className="loginNav__item">
          <LogoutButton>
            Шығу
          </LogoutButton>
        </li>
      </ul>
    )
  }


  return (
    <section className="loginNav">

      <div onClick={toggleNavBar} className={['loginNav__navBar', !showMenu ? null : 'active'].join(' ')}>
        <div className="loginNav__column loginNav__btnBurger btnBurger">
          <div className="btnBurger__menu">
            <span className="btnBurger__span"/><span className="btnBurger__span"/><span className="btnBurger__span"/>
          </div>
        </div>

        <div className="loginNav__column loginNav__profile loginProf">
          <div className="loginProf__img loginProf__column">
            {user && user.localAvatar
              ? <img src={SITE_BASE_URL + user.localAvatar} alt="avatar"/>
              : <NoPhoto/>
            }
          </div>

          {
            user && (
              <div className="loginProf__description loginProf__column">
                <div className="loginProf__name">{user.name}</div>

                {
                  coins && (
                    <div className="loginProf__coins">
                      <div className="loginProf__educoin">
                        <img src={eduCoin} alt="eduCoin"/>
                      </div>
                      <span>{user.credit}</span>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>

        {linkList}
      </div>

      <div className="loginNav__body">
        <div className="loginNav__container _container">
          <div className="loginNav__thinkLine"/>
          {children}
          <div className="loginNav__thinkLine"/>
        </div>
      </div>


    </section>
  )
}


function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.user.user ? state.user.user : null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserData: () => dispatch(setUsersData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
