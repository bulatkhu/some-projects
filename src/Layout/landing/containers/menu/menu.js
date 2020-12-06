import React, {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import logo from '../../../../images/landing/header/logo.svg'
import ModalSignIn from '../../../modals/ModalSignIn/ModalSignIn'
import ModalRegister from '../../../modals/ModalRegister/ModalRegister'
import {showModalLogin, showModalReg} from '../../../../redux/actions/menu/menuActionsFuncs'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import ModalPass from '../../../modals/ModalPass/ModalPass'
import {setUsersData} from '../../../../redux/actions/user/userActionsFuncs'
import './menu.scss'


const Menu = props => {
  const {links, menu} = props
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (menu.showRegisterModal || menu.showLoginModal ||
      menu.showPassModal || showMobileMenu) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }
  }, [menu, showMobileMenu])


  const toggleMenuHandler = () => setShowMobileMenu(prev => !prev)


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
                className="menu__icon icon-menu"
              >
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
          </div>
        </div>
      </header>

      {
        !props.isAuth && !props.isSignIn
          ?
          <>
            <ModalPortal><ModalSignIn show={menu.showLoginModal}/></ModalPortal>
            <ModalPortal><ModalRegister show={menu.showRegisterModal}/></ModalPortal>
            <ModalPortal><ModalPass show={menu.showPassModal}/></ModalPortal>
          </>
          : null
      }
    </div>
  )
}


const mapStateToProps = state => {
  return {
    menu: state.menu,
    isAuth: state.auth.isAuthenticated,
    user: state.user.user ? state.user.user : null
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onShowLogin: () => dispatch(showModalLogin()),
    onShowRegister: () => dispatch(showModalReg()),
    setUserData: () => dispatch(setUsersData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))
