import React from 'react'
import './ModalRegister.scss'

const ModalRegister = ({show, clickHandler}) => {

  const cls = ['modalReg__overlay']

  if (show) {
    cls.push('modalActive')
  }

  const eyeHandler = event => {
    event.stopPropagation()

    if (event.target.classList.contains('regForm__passEye')) {

      if (event.target.classList.contains('active')) {
        event.target.classList.remove('active')
        event.target.querySelector('input')
          .setAttribute('type', 'password')
      } else {
        event.target.classList.add('active')
        event.target.querySelector('input')
          .setAttribute('type', 'text')
      }
    }

  }

  return (
    <div className={cls.join(' ')} onClick={clickHandler}>

      <div className="modalReg">
        <h3 className="modalReg__title">Тіркелу</h3>
        <p className="modalReg__text"><span className="modalReg__text__red">Қош келдіңіз!</span> Тіркелу үшін
          мәліметтерді енгізіңіз.</p>

        <form className="modalReg__form regForm" action="/registration">

          <div className="regForm__wrapper">

            <label className="regForm__label" htmlFor="name">
              <span>Атыңыз</span>
              <input required className="regForm__input" id="name" name="name" type="text" placeholder="Атыңыз"/>
            </label>

            <label className="regForm__label" htmlFor="login">
              <span>Тегіңіз</span>
              <input required className="regForm__input" id="login" type="text" placeholder="Тегіңіз"/>
            </label>

          </div>

          <div className="regForm__wrapper">

            <label className="regForm__label" htmlFor="regEmail">
              <span>E-mail</span>
              <input required className="regForm__input" id="regEmail" name="regEmail" type="text"
                     placeholder="E-mail"/>
            </label>

            <label className="regForm__label" htmlFor="regPhone">
              <span>Phone</span>
              <input required className="regForm__input" id="regPhone" name="regPhone" type="text"
                     placeholder="+7(7__)-___-__-__"/>
            </label>

          </div>

          <div onClick={eyeHandler} className="regForm__wrapper">

            <div className="regForm__passEye">
              <label className="regForm__label margin0" htmlFor="regPassword">
                <span>Құпиясөз</span>
                <input className="regForm__input" id="regPassword" name="regPassword" type="password"
                       placeholder="Құпиясөз"/>
              </label>
            </div>

            <div className="regForm__passEye">
              <label className="regForm__label margin0" htmlFor="regPassword2">
                <span>Құпиясөз</span>
                <input className="regForm__input" id="regPassword2" name="regPassword2" type="password"
                       placeholder="Құпиясөз"/>
              </label>
            </div>

          </div>

          <div className="regForm__checkbox regCheckbox">
            <input required id="regPrivacy" name="regPrivacy" type="checkbox" className="regCheckbox__input"/>

            <label htmlFor="regPrivacy" className="regCheckbox__text">
              Пайдаланушы келісімінің <a href="/" className="regCheckbox__red">шарттарын</a> қабылдаймын.
            </label>
          </div>

          <div className="regForm__promo regPromo">

            <div className="regPromo__wrapper regPromo__wrapper__ofDescr">

              <label className="regPromo__label" htmlFor="promoCode">
                <span className="label__hidden">Promo code</span>
                <input name="regPromo" className="regPromo__input regForm__input" type="text" id="regPromo"
                       placeholder="Досыңнан алған промокод"/>

                <span>
                  <span className="regPromo__info ">

                  <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.43864 2.21777C1.94284 2.20419 2.34056 1.78446 2.32699 1.28027C2.31341 0.776074 1.89368 0.37835 1.38948 0.391924C0.885292 0.405499 0.487567 0.825233 0.501142 1.32943C0.514717 1.83362 0.934451 2.23134 1.43864 2.21777Z"
                      fill="#FF5773"/>
                  </svg>

                  <svg width="3" height="6" viewBox="0 0 3 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.31431 0.188076L0.230767 0.506372L0.165248 0.855298L0.578103 0.920009C0.848222 0.976687 0.903777 1.07203 0.852552 1.34109L0.264057 4.52525C0.108998 5.3489 0.392335 5.72681 1.03412 5.70953C1.53166 5.69613 2.10335 5.45052 2.35685 5.12759L2.42696 4.74565C2.2487 4.91124 1.98385 4.98233 1.80675 4.98709C1.55569 4.99385 1.45966 4.82012 1.51612 4.50798L2.31431 0.188076Z"
                      fill="#FF5773"/>
                  </svg>

                  <span className="regPromo__block">
                    <span className="myTriangle"/>

                    <span className="regPromo__description">
                        <p>Промокодты біздің порталға тіркелген кез келген досың
                        нан алуға болады. Болма ған жағдайда, “Промокод жоқ” деп белгіле.</p>
                        <span className="regPromo__description__red">
                          Өз промокодыңды доста
                        рыңмен бөлісіп, бағалы сыйлықтар ұтып ал.
                        </span>
                    </span>
                  </span>

                </span>
                </span>


              </label>

            </div>

            <div className="regPromo__wrapper">

              <label className="regPromo__labelCheckbox" htmlFor="promoAction">
                <input name="promoAction" className="regPromo__checkbox" type="checkbox" id="promoAction"/>
                <span>Промокод жоқ</span>
              </label>

            </div>

          </div>


          <button type="submit" className="regForm__button">Тіркелу</button>


        </form>

      </div>

      <div className="phoneConfirm__confirm">
        <input className="phoneConfirm__input" placeholder="СМС код"/>
        <p className="phoneConfirm__timer">
          <span className="phoneConfirm__timer__min">01</span>
          <span>:</span>
          <span className="phoneConfirm__timer__sec">37</span>
        </p>

        <button className="phoneConfirm__button">Растау</button>
      </div>

      <div className="phoneConfirm__success">
        <p>Тіркелу сәтті
          аяқталды</p>
      </div>

    </div>
  )
}

export default ModalRegister