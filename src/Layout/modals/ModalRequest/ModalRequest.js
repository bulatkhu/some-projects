import React from 'react'
import {Transition} from 'react-transition-group'
import './ModalRequest.scoped.scss'

const duration = 300

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 1,
  position: 'relative',
  marginTop: '-2000%'
}

const transitionStyles = {
  entering: {opacity: 1, marginTop: '-90%'},
  entered: {opacity: 1, marginTop: '3%'},
  exiting: {opacity: 0, marginTop: '-70%'},
  exited: {opacity: 0, marginTop: '-100%'},
}


const ModalRequest = ({isShow, setShow}) => {

  return (
    <div onClick={event => event.target === event.currentTarget ? setShow(prev => !prev) : null} className={['modRequest__overlay', isShow ? 'active' : null].join(' ')}>
      <Transition in={isShow} timeout={duration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }} className="modRequest">
            <div className="modRequest__wrapper">
              <button onClick={() => setShow(prev => !prev)} className="modRequest__close btn__noFocus">&times;</button>

              <h2 className="modRequest__title">Өтінім қалдырыңыз.</h2>
              <h3 className="modRequest__subtitle">Біз жақын арада Сізге хабарласамыз.</h3>


              <form className="modRequest__inputs inputs">

                <div className="inputs__labels">
                  <label htmlFor="dfs" className="inputs__label">
                    <input className="inputs__input inputs__name btn__noFocus" placeholder="Аты-жөніңіз*" required
                           type="text" name="name"/>
                  </label>
                  <label htmlFor="dfs" className="inputs__label">
                    <input className="inputs__input inputs__phone btn__noFocus" placeholder="+7(7__)-___-__-__" required
                           type="text" name="phone"/>
                  </label>
                  <label htmlFor="dfs" className="inputs__label">
                    <input className="inputs__input inputs__region btn__noFocus" placeholder="Облыс/Қала" type="text"
                           name="region"/>
                  </label>
                  <label htmlFor="dfs" className="inputs__label">
                    <input className="inputs__input inputs__city btn__noFocus" placeholder="Қала/Аудан" type="text"
                           name="city"/>
                  </label>
                  <label htmlFor="dfs" className="inputs__label">
                    <input className="inputs__input inputs__subject btn__noFocus" placeholder="Бейіндік пән" type="text"
                           name="subject"/>
                  </label>
                </div>


                <button type="submit" className="inputs__btn btn__shadowFromNull">Жіберу</button>

              </form>
            </div>

          </div>
        )}
      </Transition>
    </div>
  )
}

export default ModalRequest
