import React, {useEffect} from 'react'
import './headerMenu.scoped.scss'
import { Transition } from 'react-transition-group'
import {showModalLogin, showModalReg} from '../../../../redux/actions/menu/menuActionsFuncs'
import {setUsersData} from '../../../../redux/actions/user/userActionsFuncs'
import {connect} from 'react-redux'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import {Link} from 'react-router-dom'
import {SITE_BASE_URL} from "../../../../app.config";
import NoPhoto from "../../../../images/general/noPhoto/noPhoto";

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  display: 'none'
}

const transitionStyles = {
  entering: { display: 'block' },
  entered:  { display: 'block' },
  exiting:  { display: 'none' },
  exited:  { display: 'none' },
}

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

const HeaderMenu = ({isHide, onShowLogin, onShowRegister, setUserData, menu, isAuth, user}) => {


  useEffect(() => {
    if (!user && isAuth) {
      setUserData()
    }

    // eslint-disable-next-line
  }, [user, isAuth])
  useEffect(() => {
    if (menu.showRegisterModal || menu.showLoginModal || menu.showPassModal) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }
  }, [menu])


  return (
    <Transition in={isHide} timeout={duration}>
      {state => (
        <section style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}  className="headerMenu">
          <div className="headerMenu__wrapper">
            <div className="headerMenu__container _container">
              <div className="headerMenu__content">

                <div className="headerMenu__column">
                  <a className="headerMenu__icon phone" href="tel:77072300555">+77073446060</a>
                  <a className="headerMenu__icon whatsapp" rel="noopener noreferrer" target="_blank" href="https://wa.me/77072300555">+77072300555</a>
                  <a className="headerMenu__icon email" href="mailto:online.educon@gmail.com">online.educon@gmail.com</a>
                </div>
                <div className="headerMenu__column">

                  <div className="headerMenu__buttons">

                    <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/educon.online/" className="headerMenu__smallLink instagram">instagram</a>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UC8Jq8-PFt-LbnURzOdEUC8Q/videos" className="headerMenu__smallLink youtube">youtube</a>
                    <a rel="noopener noreferrer" target="_blank" href="https://web.facebook.com/educon.platform.7?_rdc=1&_rdr" className="headerMenu__smallLink facebook">facebook</a>

                  </div>


                  <div className="headerMenu__buttons headerMenu-btns headerMenu-btns__lang ">

                    <button className="headerMenu__btn kz">kz</button>
                    <button className="headerMenu__btn rus">rus</button>

                  </div>

                  <div className="headerMenu__buttons headerMenu-btns headerMenu-btns__interface">



                    {isAuth && user
                      ? <Link className="headerMenu-login" to={user.type ? '/' + user.type : '/student'}>
                          <div className="headerMenu-login__img">
                            {
                              user && user.localAvatar
                                ? <img src={SITE_BASE_URL + user.localAvatar} alt="Avatar"/>
                                : <NoPhoto style={{...noPhotoStyles, fontSize: '8px'}}/>
                            }
                          </div>
                        </Link>
                      : <>
                          <button onClick={() => onShowLogin()} className="headerMenu-btns__signIn">Кіру</button>
                          <button onClick={() => onShowRegister()} className="headerMenu-btns__login">Тіркелу</button>
                        </>
                    }

                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>
      )}
    </Transition>
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


export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
