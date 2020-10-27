import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom';
import './ModalSignIn.scss'
import axios from 'axios'
import {connect} from 'react-redux'
import {hideModalLogin, showModalLogin, showModalPass} from '../../../redux/actions/menu/menuActionsFuncs'
import {checkIsAuth} from '../../../redux/actions/auth/authActionsFuncs'
import {setUsersData} from '../../../redux/actions/user/userActionsFuncs'
import CircleForModals from '../CircleForModals/CircleForModals'
import {Form, Field} from 'react-final-form'
// import {validateEmail} from '../../../../scripts/validations/validators'


const ModalSignIn = props => {
  const refToPassInput = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState({error: null, isError: false})
  const history = useHistory()


  useEffect(() => {
    if (showPassword) {
      refToPassInput.current.setAttribute('type', 'text')
    } else {
      refToPassInput.current.setAttribute('type', 'password')
    }
  }, [showPassword])


  const onFormSubmit = values => {
    const {username, password} = values

    if (username.trim() && password.trim()) {

      try {
        axios
          .post('https://api.ustaz.xyz/api/v1/user/login', { username, password })
          .then(res => {

            if (res.data.error) {
              return setShowError({
                error: res.data.error,
                isError: true
              })
            }

            const {user} = res.data.data

            if (+res.data.status === 1) {

              props.setUserData(user)
              localStorage.setItem('token', user.token)
              setShowError({
                error: null,
                isError: false
              })
              props.onHideLoginModal()
              props.isAuth(true)
              history.push('/student')
            } else {
              setShowError({
                error: res,
                isError: true
              })
            }
          })
          .catch(err => {

            if (err.response) {
              setShowError({
                error: err.response.data.error,
                isError: true
              })
            }
          })
      } catch (e) {
        console.log(e)
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

        <h3 className="modalSignIn__title">Кіру</h3>
        <p className="modalSignIn__text">
          <span className="modalSignIn__red">Қош келдіңіз! </span>
          Кіру үшін мәліметтерді енгізіңіз.
        </p>

        {
          showError.isError
            ? <p className="modalSignIn__text">
              <span className="modalSignIn__red">{showError.error}</span>
            </p>
            : null
        }

        <Form onSubmit={onFormSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="modalSignIn__form SignInform">

              <label htmlFor="phoneSignIn" className="SignInform__label SignInform__label__phone">phone</label>

              <Field
                name="username"
                required
                defaultValue="name-full"
                // validate={validateEmail}
              >
                {({input}) => <input
                  className="SignInform__phone SignInform__input"
                  id="phoneSignIn"
                  type="text" placeholder="+7(7__)-___-__-__"
                  {...input}
                />}
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
                  defaultValue="password"
                >
                  {({input}) => (
                    <input
                      ref={refToPassInput} id="passSignIn"
                      className="SignInform__password SignInform__input"
                      type="password" placeholder="Құпиясөз"
                      {...input}
                    />
                  )}
                </Field>
              </label>
              {/*<input id="passSignIn" className="SignInform__password SignInform__input" name="password" type="text" placeholder="Құпиясөз"/>*/}

              <div className="SignInform__questions questionsSignIn">

                <div className="questionsSignIn__remember">
                  <input className="remember" id="SignInformRemember" type="checkbox"/>
                  <label htmlFor="SignInformRemember">Есте сақтау</label>
                </div>

                <a href="/resetPassword" onClick={resetPassHandler} className="questionsSignIn__reset">Құпиясөзді ұмыттыңыз ба?</a>

              </div>

              <button type="submit" className="SignInform__button">Кіру</button>

            </form>
          )}
        </Form>


      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    ...state.menu
  }
}


const matchDispatchToProps = dispatch => {
  return {
    onHideLoginModal: () => dispatch(hideModalLogin()),
    isAuth: boolean => dispatch(checkIsAuth(!!boolean)),
    setUserData: user => dispatch(setUsersData(user)),
    onShowLogin: () => dispatch(showModalLogin()),
    onShowPassModal: () => dispatch(showModalPass())
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(ModalSignIn)