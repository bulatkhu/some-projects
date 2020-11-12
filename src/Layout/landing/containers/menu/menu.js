import React, {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './menu.scss'
import logo from '../../../../images/landing/header/logo.svg'
import ModalSignIn from '../../../modals/ModalSignIn/ModalSignIn'
import ModalRegister from '../../../modals/ModalRegister/ModalRegister'
import {connect} from 'react-redux'
import {showModalLogin, showModalReg} from '../../../../redux/actions/menu/menuActionsFuncs'
// import profilePhoto from '../../../../images/login/navbar/profilePhoto.jpg'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import ModalPass from '../../../modals/ModalPass/ModalPass'
import {setUsersData} from '../../../../redux/actions/user/userActionsFuncs'
import {SITE_BASE_URL} from '../../../../app.config'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'


const noPhotoStyles = {
  height: '100%',
  width: '100%',
  background: 'rgb(204, 204, 204)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '0px',
  left: '0px',
  color: 'rgb(98, 98, 103)',
}


const Menu = props => {
  const {links, menu, user, setUserData, isAuth} = props
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (!user && isAuth) {
      setUserData()
    }
  }, [user, isAuth, setUserData])
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
            <div className="menu__login login">
              <select className="login__column login__lang">
                <option value="kz">KZ</option>
                <option value="ru">RU</option>
              </select>
              {
                props.isAuth

                  ? <>
                    <Link to="/student" className="login__avatar">
                      {
                        user && user.localAvatar
                          ? <img src={SITE_BASE_URL + user.localAvatar} alt="Avatar"/>
                          : <NoPhoto style={{...noPhotoStyles, fontSize: '8px'}}/>
                      }
                    </Link>
                  </>

                  : <>
                    <button onClick={() => props.onShowLogin()}
                            className="login__column login__card login__card__icon">Кіру
                    </button>
                    <button onClick={() => props.onShowRegister()} className="login__column login__button">Тіркелу
                    </button>
                  </>
              }
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
