import React, {useEffect, useState} from 'react'
import './ModalPass.scoped.scss'
import LittleBtn from '../LittleBtn/LittleBtn'
import ModalInfo from './ModelInfo'
import {validatePassword, validatePhone} from '../../../scripts/validations/validators'
import {hideModalPass} from '../../../redux/actions/menu/menuActionsFuncs'
import InputMask from 'react-input-mask'
import {Field, Form} from 'react-final-form'
import {connect} from 'react-redux'


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
  const [stepsCount, setStepsCount] = useState(0)
  const [formData, setFormData] = useState({ password: null, phone: null, code: null })


  useEffect(() => {

    console.log(formData)

  }, [formData])


  const onResetPassSubmit = values => {
    setStepsCount(1)
    setFormData(prev => ({ ...prev, phone: values.phone }))
    // console.log(values)
  }


  const onSendCodeSubmit = values => {
    setStepsCount(2)
    setFormData(prev => ({ ...prev, code: values.code }))
    // console.log(values)
  }


  const onChangePassSubmit = values => {
    setFormData(prev => ({  ...prev, password: values.password }))
    // console.log(values)
  }

  return (
    <div
      className={overlayClass}
      onClick={event => event.target.classList.contains('modalActive') && hidePassModal()}
    >

      <div className="modalPass">

        {
          stepsCount === 0 && <Form
            onSubmit={onResetPassSubmit}
            render={({handleSubmit}) => (
              <form
                className="modalPass__part"
                onSubmit={handleSubmit}
              >
                <h1 className="modalPass__title">Құпиясөзді қалпына келтіру</h1>

                <Field
                  required
                  name="phone"
                  validate={validatePhone}
                  parse={value => value.replace(/\(|\)|\s|-/g, '')}
                >
                  {({input, meta}) => {
                    const inputClass = ['regForm__input', 'margin__button2',
                      meta.error && meta.touched && 'regFormInput__error'].join(' ')

                    return (
                      <label className="modalPass__label" htmlFor="phone">
                        <InputMask
                          required
                          type="text"
                          className={inputClass}
                          mask="+7 (999) - 999 - 99 - 99"
                          placeholder="+7 (___) - ___ - __ - __"
                          {...input}
                        />
                        {meta.error && meta.touched && <span style={{display: 'block', margin: '-10px 0 0 0'}} className="error">Invalid phone number</span>}
                      </label>
                    )
                  }}
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
        }

        {
          stepsCount === 1 && <Form
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
                      maxLength="6"
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
        }

        { stepsCount === 2 && <Form
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
        }


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