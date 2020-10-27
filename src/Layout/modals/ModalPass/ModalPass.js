import React, {useEffect, useState} from 'react'
import './ModalPass.scoped.scss'
import {Field, Form} from 'react-final-form'
import LittleBtn from '../LittleBtn/LittleBtn'
import {scrollBodyHandler} from '../../../scripts/scrollController/scrollController'
import ModalInfo from './ModelInfo'
import {validatePassword} from '../../../scripts/validations/validators'
import {connect} from 'react-redux'
import {hideModalPass} from '../../../redux/actions/menu/menuActionsFuncs'


const switchEye = event => {
  if (event.currentTarget.classList.contains('show')) {
    event.currentTarget.classList.remove('show')
    event.currentTarget.previousSibling.setAttribute('type', 'password')
  } else {
    event.currentTarget.classList.add('show')
    event.currentTarget.previousSibling.setAttribute('type', 'text')
  }
}


const ModalPass = ({show, hidePassModal}) => {
  const overlayClass = ['modalPass__overlay', 'modal__overlay', show ? 'modalActive' : null].join(' ')
  const [isInfoShown, setIsInfoShown] = useState(false)




  useEffect(() => {
    show && scrollBodyHandler.lock()

  }, [show])


  const onResetPassSubmit = values => {

    console.log(values)

  }


  const onSendCodeSubmit = values => {
    console.log(values)
  }


  const onChangePassSubmit = values => {
    console.log(values)
  }

  return (
    <div
      className={overlayClass}
      onClick={event => event.target.classList.contains('modalActive') && hidePassModal()}
    >

      <div className="modalPass">

        <Form
          onSubmit={onResetPassSubmit}
          render={({handleSubmit}) => (
            <form
              className="modalPass__part"
              onSubmit={handleSubmit}
            >
              <h1 className="modalPass__title">Құпиясөзді қалпына келтіру</h1>

              <Field
                name="phone"
              >
                {({input}) => (
                  <input
                    required
                    className="regForm__input margin__button2"
                    placeholder="+7(7__)-___-__-__"
                    type="text"
                    {...input}
                  />
                )}
              </Field>

              <LittleBtn
                className="modalPass__btn centered"
                color="red"
                bigFontSize
                submit
                fontSize="16"
              >Жіберу</LittleBtn>
            </form>
          )}
        />

        <Form
          onSubmit={onSendCodeSubmit}
          render={({handleSubmit}) => (
            <form
              className="modalPass__part"
              onSubmit={handleSubmit}
            >
              <p className="modalPass__subTitle">
                Қоңырау шалған нөмірдің соңғы
                6 санын пароль ретінде енгізіңіз.
                <span
                  className="modalPass__infoMark"
                  onMouseEnter={() => setIsInfoShown(true)}
                  onMouseLeave={() => setIsInfoShown(false)}
                />

                {
                  isInfoShown
                  &&
                  <ModalInfo showInfo={setIsInfoShown}/>
                }

              </p>

              <Field name="code">
                {({input}) => (
                  <input
                    required className="phoneConfirm__input margin__button2"
                    type="text" placeholder="код" {...input}
                  />
                )}
              </Field>

              <LittleBtn
                className="modalPass__btn centered"
                color="blue"
                submit
              >Растау</LittleBtn>
            </form>
          )}
        />


        <Form
          onSubmit={onChangePassSubmit}
          validate={values => {
            const errors = {}
            if (values.re_password !== values.password) {
              errors.re_password = 'Passwords are not equal'
            }
            return errors
          }}
          render={({handleSubmit}) => (
            <form
              className="modalPass__part"
              onSubmit={handleSubmit}
            >
              <Field name="password" validate={validatePassword}>
                {({input, meta}) => {
                  const inputClass = ['regForm__input', 'modalPass__input', 'margin0',
                    meta.error && meta.touched && 'regFormInput__error'].join(' ')

                  return (
                    <label className="regForm__label modalPass__label" htmlFor="password">
                      <span className="hidden">Құпиясөз</span>
                      <span className="modalPass__inputWrapper">
                        <input
                          required
                          className={inputClass}
                          placeholder="Жаңа құпиясөз енгіз"
                          type="password"
                          {...input}
                        />
                        <span className="modalPass__eye" onClick={switchEye}>
                          <span/>
                        </span>
                      </span>
                      {meta.error && meta.touched &&
                      <span className="error modalPass__error">
                        Invalid password
                      </span>}
                    </label>
                  )
                }}
              </Field>


              <Field name="re_password">
                {({input, meta}) => {
                  const inputClass = ['regForm__input', 'modalPass__input', 'margin0',
                    meta.error && meta.touched && 'regFormInput__error'].join(' ')

                  return (
                    <label className="regForm__label modalPass__label" htmlFor="password">
                      <span className="hidden">Құпиясөз</span>
                      <span className="modalPass__inputWrapper">
                        <input
                          required
                          className={inputClass}
                          placeholder="Құпиясөзді қайта енгіз"
                          type="password"
                          {...input}
                        />
                        <span className="modalPass__eye" onClick={switchEye}><span/></span>
                      </span>
                      {meta.error && meta.touched &&
                      <span className="error modalPass__error">{meta.error}</span>}

                    </label>
                  )
                }}
              </Field>

              <LittleBtn
                className="modalPass__btn centered"
                bigFontSize
                color="red"
                submit
              >Растау</LittleBtn>
            </form>
          )}
        />


      </div>

    </div>
  )
}


function mapDispatchToProps(dispatch) {
  return {
    hidePassModal: () => dispatch(hideModalPass())
  }
}


export default connect(null, mapDispatchToProps)(ModalPass)