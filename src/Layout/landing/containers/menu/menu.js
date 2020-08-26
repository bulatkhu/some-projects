import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './menu.scss'
import logo from '../../../../images/landing/header/logo.svg'
import avatar from '../../../../images/landing/header/avatar-icon.svg'
import ModalSignIn from '../../../landing/components/ModalSignIn/ModalSignIn'
import ModalRegister from '../../../landing/components/ModalRegister/ModalRegister'

const Menu = ({links, isSignIn}) => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const scrollBodyHandler = {
    body: document.querySelector('body'),
    lock() { this.body.classList.add('scroll-locked') },
    unLock() { this.body.classList.remove('scroll-locked') },
    switch() {
      this.body.classList.contains('scroll-locked')
        ? this.body.classList.remove('scroll-locked')
        : this.body.classList.add('scroll-locked')
    }
  }

  useEffect(() => {
    if (showSignIn || showRegister || showMobileMenu) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }
  }, [showSignIn, showRegister, scrollBodyHandler, showMobileMenu])


  const toggleMenuHandler = event => {
    if (event.currentTarget.classList.contains('_active')) {
      setShowMobileMenu(prev => !prev)
      event.currentTarget.classList.remove('_active')
      event.currentTarget.nextElementSibling.classList.remove('_active')
    } else {
      setShowMobileMenu(prev => !prev)
      event.currentTarget.classList.add('_active')
      event.currentTarget.nextElementSibling.classList.add('_active')
    }
  }

  const signInModalHandler = () => {
    setShowSignIn(prev => !prev)
  }

  const registerModalHandler = () => {
    setShowRegister(prev => !prev)
  }

  const signInClickHandler = event => {
    event.target.classList.contains('modalActive') && setShowSignIn(prev => !prev)
  }

  const registerClickHandler = event => {
    event.target.classList.contains('modalActive') && setShowRegister(prev => !prev)
  }

  return (
    <div className="menu__wrapper">
      <header className="menu">
        <div className="_container">
          <div className="menu__container">
            <Link to="/" className="menu__logo">
              <img src={logo} alt="Logo"/>
            </Link>
            <div className="menu__nav">
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
                      <Link to={link.to}>{link.name}</Link>
                    </li>)
                  )}
                </ul>
              </nav>
            </div>
            <div className="menu__login login">
              <select className="login__lang">
                <option value="kz">KZ</option>
                <option value="ru">RU</option>
              </select>
              {
                isSignIn

                  ? <>
                      <a href="/" className="login__avatar">
                        <img src={avatar} alt="Avatar"/>
                      </a>
                    </>

                  : <>
                      <button onClick={signInModalHandler} className="login__card login__card__icon">Кіру</button>
                      <button onClick={registerModalHandler} className="login__button">Тіркелу</button>
                    </>
              }
            </div>
          </div>
        </div>
      </header>

      <ModalSignIn
        show={showSignIn}
        clickHandler={signInClickHandler}
      />

      <ModalRegister
        show={showRegister}
        clickHandler={registerClickHandler}
      />
    </div>
  )
}

export default Menu