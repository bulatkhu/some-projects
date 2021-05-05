import React, {useState} from 'react'
import InputMask from 'react-input-mask'
import {Field, Form} from 'react-final-form'
import {connect} from 'react-redux'
import LittleBtn from '../LittleBtn/LittleBtn'
import ModalInfo from './ModelInfo'
import PassDescription from '../components/passDescription/passDescription'
import {alphaNumeric, validatePhone} from '../../../scripts/validations/validators'
import {hideModalPass, showModalLogin} from '../../../redux/actions/menu/menuActionsFuncs'
import {ApiCheckKeyForPassword, ApiResetPassword, keyGenerate} from '../../../request/apiRequests'
import './ModalPass.scoped.scss'
import {Translate} from "react-translated";


const switchEye = event => {
  if (event.currentTarget.classList.contains('show')) {
    event.currentTarget.classList.remove('show')
    event.currentTarget.previousSibling.setAttribute('type', 'password')
  } else {
    event.currentTarget.classList.add('show')
    event.currentTarget.previousSibling.setAttribute('type', 'text')
  }
}


const ModalPass = ({show, hidePassModal, showLoginModal}) => {
  const overlayClass = ['modalPass__overlay', 'modal__overlay', show ? 'modalActive' : null].join(' ')
  const [isInfoShown, setIsInfoShown] = useState(false)
  const [stepsCount, setStepsCount] = useState(0)
  const [infoFromServer, setInfoFromServer] = useState(null)
  const [formData, setFormData] = useState({password: null, phone: null, code: null})

  const onResetPassSubmit = async values => {
    const phone = values.phone.replace('+', '')
    setFormData(prev => ({...prev, phone: phone}))
    setStepsCount(1)
    keyGenerate(phone)
      .then(res => {
        setInfoFromServer(res.message || res.data )
        setStepsCount(1)
      })
      .catch(e => {
        setInfoFromServer(e.message)
      })
  }


  const onSendCodeSubmit = values => {
    setFormData(prev => ({...prev, code: values.code}))
    ApiCheckKeyForPassword({ phone: formData.phone, code: values.code })
      .then(res => {
        if (res.data.success === 1) {
          setInfoFromServer(res.data.msg)
          setStepsCount(2)
        } else {
          setInfoFromServer(res.data.msg)
        }
      })
      .catch(err => {
        setInfoFromServer(err.message)
      })
  }


  const onChangePassSubmit = values => {
    setFormData(prev => ({...prev, password: values.password}))
    ApiResetPassword({ phone: formData.phone, password: values.password })
      .then(res => {
        if (res.data.success === 1) {
          setInfoFromServer(res.data.msg)
          setTimeout(() => {
            hidePassModal()
          },2000)
          showLoginModal()
        } else {
          setInfoFromServer(res.data.msg)
        }
      })
      .catch(err => {
        setInfoFromServer(err.message)
      })
  }
  console.log(infoFromServer,'sdsdsdsdsd')
  return (
    <div
      className={overlayClass}
      onClick={event => event.target.classList.contains('modalActive') && hidePassModal()}
    >

      <div className="modalPass">

        <p className="error__middle">{infoFromServer && <Translate text={infoFromServer}/>}</p>

        {
          stepsCount === 0 && <Form
            onSubmit={onResetPassSubmit}
            render={({handleSubmit}) => (
              <form
                className="modalPass__part"
                onSubmit={handleSubmit}
              >
                <h1 className="modalPass__title"><Translate text='Құпиясөзді қалпына келтіру'/></h1>
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
                        {meta.error && meta.touched && <span style={{display: 'block', margin: '-10px 0 0 0'}}
                                                             className="error"><Translate text='Invalid phone number'/></span>}
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
                >
                  <Translate text="Send"/></LittleBtn>
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
                  <Translate text='Қоңырау шалған нөмірдің соңғы 6 санын пароль ретінде енгізіңіз.' />
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
                ><Translate text='Растау'/></LittleBtn>
              </form>
            )}
          />
        }

        {stepsCount === 2 && <Form
          onSubmit={onChangePassSubmit}
          validate={values => {
            const errors = {}
            if (values.re_password !== values.password) {
              errors.re_password = <Translate text='Passwords are not equal'/>
            }
            const hasNumber = /\d/
            const oneUpperCapital = /(?=.*[A-Z])/
            errors.password = {}
            if (values.re_password !== values.password) {
              errors.re_password = <Translate text='Passwords are not equal'/>
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
          render={({handleSubmit}) => (
            <form
              className="modalPass__part"
              onSubmit={handleSubmit}
            >
              <Field name="password">
                {({input, meta}) => {
                  const inputClass = ['regForm__input', 'modalPass__input', 'margin0',
                    meta.error && meta.touched && 'regFormInput__error'].join(' ')
                  const errors = meta.error && Object.keys(JSON.parse(meta.error)).length
                    ? JSON.parse(meta.error)
                    : {}

                  return (
                    <label className="regForm__label modalPass__label passDescription__label" htmlFor="password">
                      <span className="hidden"><Translate text="Құпиясөз"/></span>
                      <span className="modalPass__inputWrapper">
                          <input
                            required
                            className={inputClass}
                            placeholder={<Translate text="Жаңа құпиясөз енгіз"/>}
                            type="password"
                            {...input}
                          />
                          <span className="modalPass__eye" onClick={switchEye}>
                            <span/>
                          </span>
                        </span>
                      {
                        (meta.active) ?
                          <div className="passDescription__wrapper ">
                            <PassDescription
                              length={errors.length}
                              alphabet={errors.alphabet}
                              digital={errors.digital}
                              upperCapital={errors.upperCapital}
                            />
                          </div> : null
                      }
                      {meta.error && meta.touched &&
                      <span className="error modalPass__error">
                          <Translate text='Invalid password'/>
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
                      <span className="hidden"><Translate text="Құпиясөз"/></span>
                      <span className="modalPass__inputWrapper">
                          <input
                            required
                            className={inputClass}
                            placeholder={<Translate text="Құпиясөзді қайта енгіз"/>}
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
              ><Translate text='Растау'/></LittleBtn>
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
    hidePassModal: () => dispatch(hideModalPass()),
    showLoginModal: () => dispatch(showModalLogin())
  }
}


export default connect(null, mapDispatchToProps)(ModalPass)