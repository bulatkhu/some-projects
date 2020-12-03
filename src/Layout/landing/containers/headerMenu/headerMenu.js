import React from 'react'
import './headerMenu.scoped.scss'
import { Transition } from 'react-transition-group'

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1, },
  entered:  { opacity: 1, },
  exiting:  { opacity: 0.5, },
  exited:  { opacity: 0, height: 0, visibility: 'none'},
}

// ['headerMenu', isHide ? 'hide' : null].join(' ')

const HeaderMenu = ({isHide}) => {

  return (
    <Transition in={!isHide} timeout={duration}>
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

                    <button className="headerMenu-btns__signIn">Кіру</button>
                    <button className="headerMenu-btns__login">Тіркелу</button>

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

export default HeaderMenu
