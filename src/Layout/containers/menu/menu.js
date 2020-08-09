import React from 'react'
import './menu.scss'
import logo from '../../../images/header/logo.svg'
import avatar from '../../../images/header/avatar-icon.svg'

const Menu = ({links, isSignIn}) => {

  const toggleMenuHandler = event => {
    const body = document.querySelector('body')

    if (event.currentTarget.classList.contains('_active')) {
      body.classList.remove('scroll-locked')
      event.currentTarget.classList.remove('_active')
      event.currentTarget.nextElementSibling.classList.remove('_active')
    } else {
      body.classList.add('scroll-locked')
      event.currentTarget.classList.add('_active')
      event.currentTarget.nextElementSibling.classList.add('_active')
    }
  }

  return (
    <header className="menu">
      <div className="_container">
        <div className="menu__container">
          <a href="/" className="menu__logo">
            <img src={logo} alt="Logo"/>
          </a>
          <div className="menu__nav">
            <div
              onClick={toggleMenuHandler}
              className="menu__icon icon-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className="menu__body">
              <ul className="menu__list list">
                {links.map((link, index) => (
                  <li
                    className="list__link"
                    key={index + link}
                  >
                    <a href={link.to}>{link.name}</a>
                  </li>)
                )}
              </ul>
            </nav>
          </div>
          <div className="menu__login login">
            {
              isSignIn

                ? <>
                    <a href="/" className="login__avatar">
                      <img src={avatar} alt="Avatar"/>
                    </a>
                  </>

                : <>
                    <a href="/" className="login__card login__card__icon">Кіру</a>
                    <button className="login__button">Тіркелу</button>
                  </>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Menu