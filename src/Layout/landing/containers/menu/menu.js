import React, {useEffect, useRef, useState} from 'react'
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
import {Translate as ReactTranslate} from 'react-translated'
import './menu.scoped.scss'


const MenuLink = ({action, to, name, showMobileMenu}) => (
  <a
    onClick={showMobileMenu ? action : null}
    href={to}
  >{name}</a>
)


const Menu = props => {
  const refToSelectorMenu = useRef(null)
  const {menu} = props
  const [showMobileMenu, setShowMobileMenu] = useState(false)


  const menuLinks = [
    {name: <ReactTranslate text="Басты бет"/>, to: '/#'},
    {name: <ReactTranslate text="Неліктен EduCon"/>, to: '/#features'},
    {name: <ReactTranslate text="Курстарымыз"/>, to: '/#courses'},
    {name: <ReactTranslate text="Үзінділер"/>, to: '/#playlist'},
    {name: <ReactTranslate text="Оқу ақысы"/>, to: '/#prices'},
    {
      name: <ReactTranslate text="Басқалары"/>,
      links: [
        {name: <ReactTranslate text="EduCoin"/>, to: '/#eduCoin'},
        {name: <ReactTranslate text="EduCoin рейтинг"/>, to: '/#rating'},
        {name: <ReactTranslate text="Серіктестеріміз"/>, to: '/#progress'},
      ],
      select: true
    }
  ]

  useEffect(() => {
    if (menu.showRegisterModal || menu.showLoginModal ||
      menu.showPassModal) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }
  }, [menu])


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
              <div className="arrow__wrapper">
                <div onClick={toggleMenuHandler}
                     className="own__arrow menu__arrow arrow"/>
              </div>
              <nav className="menu__body">
                <ul className="menu__list list">
                  {menuLinks.map((link, index) => {

                    const element = !link.select
                      ? <MenuLink
                        action={toggleMenuHandler}
                        showMobileMenu={showMobileMenu}
                        name={link.name}
                        to={link.to}
                      />
                      : <div
                        onMouseEnter={() => refToSelectorMenu.current.classList.toggle('active')}
                        onMouseLeave={() => refToSelectorMenu.current.classList.toggle('active')}
                        ref={refToSelectorMenu}
                        className="menuList"
                      >
                        <Link
                          to="/"
                          className="menuList__btn"
                          onClick={event => event.preventDefault()}
                        >{link.name}
                          <span className="own__arrow menuList__arrowDown"/>
                        </Link>
                        <ul className="menuList__list">
                          {
                            link.links.map((item, index) => (
                              <li key={index} className="menuList__item">
                                <MenuLink
                                  action={toggleMenuHandler}
                                  showMobileMenu={showMobileMenu}
                                  name={item.name}
                                  to={item.to}
                                  key={index}
                                />
                              </li>
                            ))
                          }
                        </ul>
                      </div>

                    return (
                      <li className="list__link" key={index}>
                        {element}
                      </li>
                    )
                  })}
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
    user: state.user.user ? state.user.user : null,
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
