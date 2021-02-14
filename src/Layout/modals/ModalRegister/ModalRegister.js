import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Field, Form} from 'react-final-form'
import InputMask from 'react-input-mask'
import {Translate, Translator} from 'react-translated'
import {hideModalReg, showModalLogin} from '../../../redux/actions/menu/menuActionsFuncs'
import CircleForModals from '../CircleForModals/CircleForModals'
import {validateEmail, validatePhone, alphaNumeric} from '../../../scripts/validations/validators'
import PhoneConfirmation from '../PhoneConfirmation/PhoneConfirmation'
import {keyGenerate, register} from '../../../request/apiRequests'
import PassDescription from '../components/passDescription/passDescription'
import './ModalRegister.scss'

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


const ModalRegister = props => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [phoneData, setPhoneData] = useState(null)
  const [phoneConf, setPhoneConf] = useState({boolean: true, phone: 9999})
  const overlayClass = ['modalReg__overlay', props.show ? 'modalActive' : null].join(' ')

  const overlayClickHandler = event => {
    if (
      event.target.classList.contains('modalActive') ||
      event.target.classList.contains('modalReg__wrapper') ||
      event.target.classList.contains('phoneConfirm')
    ) {
      props.hideRegModal()
    }
  }


  const onRegisterSubmit = async formValues => {
    const values = {...formValues}
    values.phone = formValues.phone.substring(1)

    try {
      const response = await register(values)


      console.log(response)


      if (+response.data.status === 1) {
        console.log(response.data)
        setError(null)
        setSuccess(response.data.data.description)

        setTimeout(() => {
          setPhoneConf(() => (
            {boolean: true, phone: values.phone}
          ))
        }, 3000)

        const data = await keyGenerate(values.phone)

        console.log('data from modalReg:', data)

        setPhoneData(data)
      } else {
        console.log(response.data.error)
        setError(response.data.error)
      }
    } catch (e) {
      console.log('Error: ', JSON.stringify(e))
      setError(e.message)
    }


  }


  return (
    <div
      className={overlayClass}
      onClick={overlayClickHandler}
    >

      <div className="modalReg__wrapper">
        {
          phoneConf.boolean && phoneConf.phone && phoneData
            ? <PhoneConfirmation
              setPhoneConf={setPhoneConf}
              data={phoneData}
              phone={phoneConf.phone}
            />
            : <div className="modalReg">

              <CircleForModals title="Кіру"/>

              <h3 className="modalReg__title"><Translate text="Тіркелу"/></h3>
              <p className="modalReg__text">
                <Translate text="Қош келдіңіз! Тіркелу үшін мәліметтерді енгізіңіз."/>
              </p>

              {
                error
                  ? <p className="error">{error}</p>
                  : success
                  ? <p className="success">{success}</p>
                  : null
              }


              <Form
                onSubmit={onRegisterSubmit}
                validate={values => {
                  const hasNumber = /\d/
                  const oneUpperCapital = /(?=.*[A-Z])/
                  const errors = {}

                  errors.password = {}
                  if (values.re_password !== values.password) {
                    errors.re_password = 'Passwords are not equal'
                  }

                  if (!values.password) {
                    values.password = ''
                  }

                  if (!alphaNumeric(values.password)) {
                    errors.password.alphabet = true
                  }
                  if (values.password.toString().trim().length < 8) {
                    errors.password.length = true
                  }
                  if (!hasNumber.test(values.password)) {
                    errors.password.digital = true
                  }
                  if (!oneUpperCapital.test(values.password)) {
                    errors.password.upperCapital = true
                  }

                  if (!Object.keys(errors.password).length) {
                    delete errors.password
                  } else {
                    errors.password = JSON.stringify(errors.password)
                  }

                  return errors
                }}
                render={({handleSubmit}) => {
                  return (
                    <form
                      onSubmit={handleSubmit}
                      className="modalReg__form regForm">

                      <div className="regForm__wrapper">


                        <Field
                          required
                          name="name"
                          // defaultValue="Bulat Khudainazarov"
                        >
                          {({input}) => (
                            <div className="regForm__labelWrap">
                              <label className="regForm__label" htmlFor="name">
                                <span className="hidden">Атыңыз</span>
                                <Translator>
                                  {({translate}) => (
                                    <input
                                      className="regForm__input"
                                      {...input}
                                      type="text"
                                      placeholder={translate({text: 'Атыңыз'})}
                                    />
                                  )}
                                </Translator>
                              </label>
                            </div>
                          )}
                        </Field>

                        <Field
                          required
                          name="username"
                          // defaultValue="bulat4321"
                        >
                          {({input}) => (
                            <div className="regForm__labelWrap">
                              <label className="regForm__label" htmlFor="login">
                                <span className="hidden">Тегіңіз</span>
                                <Translator>
                                  {({translate}) => (
                                    <input
                                      className="regForm__input"
                                      {...input}
                                      type="text"
                                      placeholder={translate({text: 'Тегіңіз'})}
                                    />
                                  )}
                                </Translator>
                              </label>
                            </div>
                          )}
                        </Field>

                      </div>

                      <div className="regForm__wrapper">

                        <Field
                          name="email"
                          required
                          // defaultValue="hudainazarov.b@yandex.ru"
                          validate={validateEmail}
                        >
                          {({input, meta}) => (
                            <div className="regForm__labelWrap">
                              <label className="regForm__label" htmlFor="email">
                                <span className="hidden">E-mail</span>
                                <input
                                  className={
                                    ['regForm__input',
                                      meta.error && meta.touched
                                        ? 'regFormInput__error'
                                        : null]
                                      .join(' ')
                                  }
                                  type="text"
                                  placeholder="E-mail"
                                  {...input}
                                />
                                {meta.error && meta.touched ?
                                  <span className="regForm__error error">Invalid email</span> : null}
                              </label>
                            </div>
                          )}
                        </Field>

                        <Field
                          name="phone"
                          label="phone"
                          parse={value => value.replace(/\(|\)|\s|-/g, '')}
                          validate={validatePhone}
                          // defaultValue="+79093457088"
                          required
                        >
                          {({input, meta}) => (
                            <div className="regForm__labelWrap">
                              <label className="regForm__label" htmlFor="phone">
                                <span className="hidden">Phone</span>
                                <InputMask
                                  mask="+7 (999) - 999 - 99 - 99"
                                  className={['regForm__input',
                                    meta.error && meta.touched ? 'regFormInput__error' : null
                                  ].join(' ')}
                                  placeholder="+7 (___) - ___ - __ - __"
                                  {...input}
                                />
                                {meta.error && meta.touched ?
                                  <span className="regForm__error error">Invalid phone number</span> : null}
                              </label>
                            </div>
                          )}
                        </Field>

                      </div>

                      <div onClick={eyeHandler} className="regForm__wrapper">

                        <div className="regForm__labelWrap">
                          <div className="regForm__passEye">
                            <Field
                              name="password"
                              // validate={validatePassword}
                              // defaultValue="12345Bulat"
                            >
                              {(props) => {
                                const {input, meta} = props
                                const errors = meta.error && Object.keys(JSON.parse(meta.error)).length
                                  ? JSON.parse(meta.error)
                                  : {}

                                return (
                                  <Translator>
                                    {({translate}) => (
                                      <label className="regForm__label margin0 passDescription__label" htmlFor="password">
                                        <span className="hidden">Құпиясөз</span>
                                        <input className={['regForm__input margin0',
                                          meta.error && meta.touched ? 'regFormInput__error' : null
                                        ].join(' ')} {...input} type="password"
                                               placeholder={translate({text: 'Құпиясөз'})}/>

                                        {
                                          (meta.active)
                                            ?
                                            <div className="passDescription__wrapper ">
                                              <PassDescription
                                                length={errors.length}
                                                alphabet={errors.alphabet}
                                                digital={errors.digital}
                                                upperCapital={errors.upperCapital}
                                              />
                                            </div>
                                            : null
                                        }
                                        {/*{meta.error && meta.touched &&*/}
                                        {/*<span className="regForm__error error">Invalid password</span>}*/}
                                      </label>
                                    )}
                                  </Translator>
                                )
                              }}
                            </Field>
                          </div>
                        </div>
                        <div className="regForm__labelWrap">
                          <div className="regForm__passEye">
                            <Field
                              name="re_password"
                              // defaultValue="12345Bulat"
                            >
                              {({input, meta}) => (
                                <label className="regForm__label margin0" htmlFor="rePassword">
                                  <span className="hidden">Құпиясөз</span>
                                  <Translator>
                                    {({translate}) => (
                                      <input
                                        className={['regForm__input',
                                          meta.error && meta.touched ? 'regFormInput__error' : null].join(' ')}
                                        {...input}
                                        type="password"
                                        placeholder={translate({text: 'Құпиясөз'})}
                                      />
                                    )}
                                  </Translator>
                                  {meta.error && meta.touched &&
                                  <span className="regForm__error error">{meta.error}</span>}
                                </label>
                              )}
                            </Field>
                          </div>
                        </div>

                      </div>

                      <div className="regForm__checkbox regCheckbox">

                        <Field name="privacy" type="checkbox">
                          {({input}) => (
                            <>
                              <input checked required {...input} className="regCheckbox__input"/>

                              <label htmlFor="regPrivacy" className="regCheckbox__text">
                                <a
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  href="https://drive.google.com/file/d/1RTS2vsEtb2YmF4H_bgKoKhjhtykoqnaW/view"
                                >
                                  <Translate text="Пайдаланушы келісімінің шарттарын қабылдаймын."/>
                                </a>
                              </label>
                            </>
                          )}
                        </Field>

                      </div>

                      <div className="regForm__promo regPromo">

                        <div className="regPromo__wrapper regPromo__wrapper__ofDescr">

                          <Field name="promoCode">
                            {({input}) => (
                              <label className="regPromo__label" htmlFor="promoCode">
                                <span className="label__hidden">Promo code</span>

                                <Translator>
                                  {({translate}) => (
                                    <input
                                      {...input}
                                      className="regPromo__input regForm__input"
                                      type="text"
                                      placeholder={translate({text: 'Досыңнан алған промокод'})}
                                    />
                                  )}
                                </Translator>

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
                        <p>
                          <Translate text="Промокодты біздің порталға тіркелген"/>
                        </p>
                    </span>
                  </span>

                </span>
                </span>


                              </label>
                            )}
                          </Field>

                        </div>

                        <div className="regPromo__wrapper">

                          <Field name="promoAction" type="checkbox">
                            {({input}) => (
                              <label className="regPromo__labelCheckbox" htmlFor="promoAction">
                                <input {...input} className="regPromo__checkbox" type="checkbox"/>
                                <span><Translate text="Промокод жоқ"/></span>
                              </label>
                            )}
                          </Field>

                        </div>

                      </div>


                      <button type="submit" className="regForm__button"><Translate text="Тіркелу"/></button>


                    </form>
                  )
                }}
              />

            </div>
        }</div>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideRegModal: () => dispatch(hideModalReg()),
    onShowLoginModal: () => dispatch(showModalLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister)
