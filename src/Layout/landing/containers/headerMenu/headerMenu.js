import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { Transition } from 'react-transition-group'
import { Translate as ReactTranslate } from 'react-translated'
import {Link} from 'react-router-dom'
import {showModalLogin, showModalReg} from '../../../../redux/actions/menu/menuActionsFuncs'
import {setUsersData} from '../../../../redux/actions/user/userActionsFuncs'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import {setKZLanguage, setRuLanguage} from '../../../../redux/actions/language/langActiosFuncs'
import './headerMenu.scoped.scss'

const duration = 600;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  overflow: 'hidden',
  maxHeight: '0'
}

const transitionStyles = {
  entering: { maxHeight: '200px' },
  entered:  { maxHeight: '200px' },
  exiting:  { maxHeight: '0' },
  exited:  { maxHeight: '0' },
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

const HeaderMenu = ({isHide, onShowLogin, onShowRegister, setUserData, menu, isAuth, user, lang, setKZLang, setRULang}) => {

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
                  <a className="headerMenu__icon phone" href="tel:77073446060">+77073446060</a>
                  <a className="headerMenu__icon whatsapp" rel="noopener noreferrer" target="_blank" href="https://wa.me/77072300555">+77072300555</a>
                </div>
                <div className="headerMenu__column">

                  <div className="headerMenu__buttons">

                    <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/educon.online/" className="headerMenu__smallLink instagram">instagram</a>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UC8Jq8-PFt-LbnURzOdEUC8Q/videos" className="headerMenu__smallLink youtube">youtube</a>
                    <a rel="noopener noreferrer" target="_blank" href="https://web.facebook.com/educon.platform.7?_rdc=1&_rdr" className="headerMenu__smallLink facebook">facebook</a>

                  </div>


                  <div className="headerMenu__buttons headerMenu-btns headerMenu-btns__lang ">

                    <button
                      onClick={() => setKZLang()}
                      className={`headerMenu__btn kz ${lang === 'kz' ? 'active' : ''}`}
                    >kz</button>
                    <button
                      onClick={() => setRULang()}
                      className={`headerMenu__btn rus ${lang === 'ru' ? 'active' : ''}`}
                    >rus</button>

                  </div>

                  <div className="headerMenu__buttons headerMenu-btns headerMenu-btns__interface">



                    {isAuth && user
                      ? <Link className="headerMenu-login" to={user.type ? '/login/' + user.type : '/login/student'}>
                          <div className="headerMenu-login__img">
                            {
                              user && user.localAvatar
                                ? <img src={user.localAvatar} alt="Avatar"/>
                                : <NoPhoto style={{...noPhotoStyles, fontSize: '8px'}}/>
                            }
                          </div>
                        </Link>
                      : <>
                          <button onClick={() => onShowLogin()} className="headerMenu-btns__signIn">
                            <ReactTranslate text='Кіру'/>
                          </button>
                          <button onClick={() => onShowRegister()} className="headerMenu-btns__login">
                            <ReactTranslate text='Тіркелу'/>
                          </button>
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
    user: state.user.user ? state.user.user : null,
    lang: state.lang.value
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onShowLogin: () => dispatch(showModalLogin()),
    onShowRegister: () => dispatch(showModalReg()),
    setUserData: () => dispatch(setUsersData()),
    setKZLang: () => dispatch(setKZLanguage()),
    setRULang: () => dispatch(setRuLanguage())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
