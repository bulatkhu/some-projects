import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {Form, Field} from 'react-final-form'
import InputMask from 'react-input-mask'
import {Translate, Translator} from 'react-translated'
import {checkIsAuth} from '../../../redux/actions/auth/authActionsFuncs'
import {setUsersData} from '../../../redux/actions/user/userActionsFuncs'
import {validatePassword, validatePhone} from '../../../scripts/validations/validators'
import CircleForModals from '../CircleForModals/CircleForModals'
import {login} from '../../../request/apiRequests'
import {hideModalLogin, showModalLogin, showModalPass} from '../../../redux/actions/menu/menuActionsFuncs'
import './ModalSignIn.scss'


const ModalSignIn = props => {
  const history = useHistory()
  const refToPassInput = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState({error: null, isError: false})

  const lang = useSelector(state => state.lang.value)

  useEffect(() => {
    if (showPassword) {
      refToPassInput.current.setAttribute('type', 'text')
    } else {
      refToPassInput.current.setAttribute('type', 'password')
    }
  }, [showPassword])



  const onFormSubmit = async values => {
    let {phone, password} = values
    values.phone = phone.replace('+', '')

    if (phone.trim() && password.trim()) {

      const response = await login(values)
      if (response.error) return setShowError({ error: response.data.error, isError: true })

      if (+response.data.status === 1) {
        const {user} = response.data.data
        console.log(response.data)

        setShowError({
          error: null,
          isError: false
        })

        localStorage.setItem('token', user.token)
        props.setUserData()
        props.onHideLoginModal()
        props.isAuth(true)
        if (user.type) {
          history.push(`/login/${user.type}`)
        }
      } else {
        setShowError({
          error: response.data.error,
          isError: true
        })
      }

    }
  }

  const onOverlayClick = event => {
    if (event.target.classList.contains('modalActive')) {
      props.onHideLoginModal()
    }
  }

  const resetPassHandler = event => {
    event.preventDefault()
    props.onHideLoginModal()
    props.onShowPassModal()
  }


  return (
    <div onClick={onOverlayClick}
      className={['modalSignIn__overlay', props.show ? 'modalActive' : null].join(' ')}
    >
      <div className="modalSignIn">
        <CircleForModals title="Тіркелу"/>

        <h3 className="modalSignIn__title">
          <Translate text="Кіру"/>
        </h3>
        <p className="modalSignIn__text">
          <span className="modalSignIn__red">
            <Translate text="Қош келдіңіз! Кіру"/>
          </span>
        </p>

        {
          showError.isError
            ? <p className="modalSignIn__text">
              <Translator>
                          {({translate}) => (
              <span className="modalSignIn__red">{translate({ text:showError.error })}</span>
                          )}
                          </Translator>
            </p>
            : null
        }

        <Form onSubmit={onFormSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="modalSignIn__form SignInform">

              <label htmlFor="phoneSignIn" className="SignInform__label SignInform__label__phone">phone</label>

              <Field
                name="phone"
                required
                parse={value => value.replace(/\(|\)|\s|-/g, '')}
                validate={validatePhone}
                // defaultValue="+77712197400"
              >
                {({input, meta}) => {
                  // const onError =

                  return <>
                    <InputMask
                      mask="+7 (999) - 999 - 99 - 99"
                      placeholder="+7 (___) - ___ - __ - __"
                      className={['SignInform__phone', 'SignInform__input', meta.error && meta.touched && 'regFormInput__error'].join(' ')}
                      id="phoneSignIn" type="text"
                      {...input}
                    />
                    {meta.error && meta.touched &&
                    <span className="error" style={{display: 'block', margin: '-10px 0 10px 0'}}>{lang === 'ru' ? 'Неверный номер телефона' : 
                    'дұрыс емес телефон нөмірі'}</span>}

                  </>
                }}
              </Field>

              <label
                htmlFor="passSignIn"
                className="SignInform__label"
              >
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className={['SignInform__label__eye', showPassword ? 'active' : null].join(' ')}
                >
                  <span>Password</span>
                </span>
                <Field
                  name="password"
                  required
                  validate={validatePassword}
                  // defaultValue="12345Bulat"
                >
                  {({input, meta}) => (
                    <>
                      {
                        <Translator>
                          {({translate}) => (
                            <input
                              ref={refToPassInput} id="passSignIn"
                              className={['SignInform__password', 'SignInform__input',
                                meta.error && meta.touched ? 'regFormInput__error' : null
                              ].join(' ')} {...input}
                              placeholder={translate({ text: "Құпиясөз" })}
                              type="password"
                              {...input}
                            />
                          )}
                        </Translator>
                      }
                      {meta.error && meta.touched &&
                      <span className="regForm__error error">{lang === 'ru' ? 'Неверный пароль' : 'қате құпия сөз'}</span>}
                    </>
                  )}
                </Field>
              </label>

              <div className="SignInform__questions questionsSignIn">

                <div className="questionsSignIn__remember">
                  <input className="remember" id="SignInformRemember" type="checkbox"/>
                  <label htmlFor="SignInformRemember"><Translate text="Есте сақтау"/></label>
                </div>

                <a href="/resetPassword" onClick={resetPassHandler} className="questionsSignIn__reset">
                  <Translate text="Құпиясөзді ұмыт"/>
                </a>

              </div>

              <button type="submit" className="SignInform__button"><Translate text="Кіру"/></button>

            </form>
          )}
        </Form>


      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    ...state.menu,
    user: state.user,
    isAuth: state.auth
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onHideLoginModal: () => dispatch(hideModalLogin()),
    isAuth: boolean => dispatch(checkIsAuth(!!boolean)),
    setUserData: () => dispatch(setUsersData()),
    onShowLogin: () => dispatch(showModalLogin()),
    onShowPassModal: () => dispatch(showModalPass())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalSignIn)
