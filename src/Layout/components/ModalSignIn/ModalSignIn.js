import React from 'react'
import './ModalSignIn.scss'


const ModalSignIn = ({show, clickHandler}) => {

  const cls = ['modalSignIn__overlay']

  if (show) {
    cls.push('modalActive')
  }

  const showPasswordHandler = event => {
    if (event.target.classList.contains('SignInform__label__eye')) {


      if (event.currentTarget.querySelector('input').getAttribute('type') === 'password') {

        event.currentTarget.querySelector('input').setAttribute('type', 'text')
        event.target.classList.add('active')

      } else {

        event.currentTarget.querySelector('input').setAttribute('type', 'password')
        event.target.classList.remove('active')

      }
    }

  }

  return (
    <div onClick={clickHandler} className={cls.join(' ')}>
      <div className="modalSignIn">
        <h3 className="modalSignIn__title">Кіру</h3>
        <p className="modalSignIn__text">
          <span className="modalSignIn__red">Қош келдіңіз! </span>
          Кіру үшін мәліметтерді енгізіңіз.
        </p>

        <form className="modalSignIn__form SignInform">

          <label htmlFor="phoneSignIn" className="SignInform__label SignInform__label__phone">phone</label>
          <input required className="SignInform__phone SignInform__input" id="phoneSignIn" name="phone" type="text"
                 placeholder="+7(7__)-___-__-__"/>

          <label onClick={showPasswordHandler} htmlFor="passSignIn"
                 className="SignInform__label SignInform__label__password">
            <span className="SignInform__label__eye">
              <span>Password</span>
            </span>
            <input required id="passSignIn" className="SignInform__password SignInform__input" name="password" type="password"
                   placeholder="Құпиясөз"/>
          </label>
          {/*<input id="passSignIn" className="SignInform__password SignInform__input" name="password" type="text" placeholder="Құпиясөз"/>*/}

          <div className="SignInform__questions questionsSignIn">

            <div className="questionsSignIn__remember">
              <input className="remember" id="SignInformRemember" type="checkbox"/>
              <label htmlFor="SignInformRemember">Есте сақтау</label>
            </div>

            <a href="/resetPassword" className="questionsSignIn__reset">Құпиясөзді ұмыттыңыз ба?</a>

          </div>

          <button className="SignInform__button">Кіру</button>

        </form>

      </div>
    </div>
  )
}

export default ModalSignIn