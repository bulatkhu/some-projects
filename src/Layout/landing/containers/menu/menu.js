import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './menu.scss'
import logo from '../../../../images/landing/header/logo.svg'
import ModalSignIn from '../../../landing/components/ModalSignIn/ModalSignIn'
import ModalRegister from '../../../landing/components/ModalRegister/ModalRegister'
import {connect} from 'react-redux'
import {showModalLogin, showModalReg} from '../../../../redux/actions/menuActionsFuncs'
import profilePhoto from '../../../../images/login/navbar/profilePhoto.jpg'

const Menu = props => {
  const {links, menu} = props
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const scrollBodyHandler = {
    body: document.querySelector('body'),
    lock() {
      this.body.classList.add('scroll-locked')
    },
    unLock() {
      this.body.classList.remove('scroll-locked')
    },
    switch() {
      this.body.classList.contains('scroll-locked')
        ? this.body.classList.remove('scroll-locked')
        : this.body.classList.add('scroll-locked')
    }
  }

  useEffect(() => {
    if (menu.showRegisterModal || menu.showLoginModal || showMobileMenu) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }
  }, [menu.showLoginModal, menu.showRegisterModal, scrollBodyHandler, showMobileMenu])


  const toggleMenuHandler = () => setShowMobileMenu(prev => !prev)

  // const signInModalHandler = () => setShowSignIn(prev => !prev)
  const signInModalHandler = () => props.onShowLogin()

  const registerModalHandler = () => props.onShowRegister()


  const menuClasses = ['menu__nav']

  if (showMobileMenu) {
    menuClasses.push('active')
  }

  return (
    <div className="menu__wrapper">
      <header className="menu">
        <div className="_container">
          <div className="menu__container">
            <Link to="/" className="menu__logo">
              <img src={logo} alt="Logo"/>
            </Link>
            <div className={menuClasses.join(' ')}>
              <div
                onClick={toggleMenuHandler}
                className="menu__icon icon-menu">
                <span/>
                <span/>
                <span/>
              </div>
              <nav className="menu__body">
                <ul className="menu__list list">
                  {links.map((link, index) => (
                    <li
                      className="list__link"
                      key={index + link}
                    >
                      <Link
                        onClick={showMobileMenu ? toggleMenuHandler : null}
                        to={link.to}
                      >{link.name}</Link>
                    </li>)
                  )}
                </ul>
              </nav>
            </div>
            <div className="menu__login login">
              <select className="login__column login__lang">
                <option value="kz">KZ</option>
                <option value="ru">RU</option>
              </select>
              {
                props.isAuth

                  ? <>
                      <Link to="/student" className="login__avatar">
                        <img src={profilePhoto} alt="Avatar"/>
                      </Link>
                    </>

                  : <>
                      <button onClick={signInModalHandler} className="login__column login__card login__card__icon">Кіру</button>
                      <button onClick={registerModalHandler} className="login__column login__button">Тіркелу</button>
                    </>
              }
            </div>
          </div>
        </div>
      </header>

      <ModalSignIn/>

      <ModalRegister/>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    menu: state.menu,
    isAuth: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onShowLogin: () => dispatch(showModalLogin()),
    onShowRegister: () => dispatch(showModalReg())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)