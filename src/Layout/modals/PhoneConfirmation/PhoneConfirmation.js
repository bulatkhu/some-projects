import React, {useState} from 'react'
import {Field, Form} from 'react-final-form'
import {connect} from 'react-redux'
import Countdown from 'react-countdown'
import Loader from '../../general/component/loader/loader'
import {checkKey, keyGenerate} from '../../../request/apiRequests'
import {hideModalReg, showModalLogin} from '../../../redux/actions/menu/menuActionsFuncs'





const PhoneConfirmation = ({phone, data, setPhoneConf, hideRegModal, onShowLoginModal}) => {
  const [info, setInfo] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)


  const onSubmit = async values => {
    setIsLoading(true)
    const response = await checkKey(values)

    console.log('response from phone confirm:', response)

    if (response.data) {
      setInfo(response)
      setIsLoading(false)

      if (response.data === 'Your account activated!') {
        setTimeout(() => {
          setPhoneConf({boolean: false, phone: null})
          hideRegModal()
          onShowLoginModal()
        }, 3000)
      }
    }

  }

  const genKeyOnSubmit = async value => {
    const data = await keyGenerate(value.phone)
    setInfo(data)
    setTimerExpired(false)
  }

  const timerWasCompleted = () => setTimerExpired(true)


  const CallAgainBtn = () => {
    return <button type="submit" className="phoneConfirm__button">Call me back again</button>
  }


  const renderer = props => {
    let { minutes, seconds, completed } = props

    if (completed) {
      return <CallAgainBtn />
    } else {
      if (+minutes <= 9) {
        minutes = '0' + minutes
      }

      if (+seconds <= 9) {
        seconds = '0' + seconds
      }

      return (
        <span>
          {minutes}:{seconds}
        </span>
      )
    }
  }


  return (
    <div className="phoneConfirm">

      {
        !timerExpired
          ? <Form
              onSubmit={onSubmit}
              render={({handleSubmit}) => (
                <form
                  className="phoneConfirm__confirm"
                  onSubmit={handleSubmit}
                >
                  {
                    isLoading
                      ? <Loader/>
                      : <>
                        <p className="success">{info.data}</p>
                        <p className="phoneConfirm__description">
                          Қоңырау шалған нөмірдің
                          соңғы 6 санын енгізіңіз.
                        </p>
                        <Field
                          name="code"
                        >
                          {({input}) => (
                            <input
                              maxLength="6"
                              className="phoneConfirm__input"
                              {...input}
                            />
                          )}
                        </Field>
                        <Field
                          name="phone"
                          defaultValue={phone}
                        >
                          {({input}) => (
                            <input
                              type="text"
                              className="hidden"
                              {...input}
                            />
                          )}
                        </Field>
                        <p className="phoneConfirm__timer">

                          <Countdown
                            date={Date.now() + 3 * 1000 * 60}
                            renderer={renderer}
                            onComplete={timerWasCompleted}
                          />
                        </p>

                        <button className="phoneConfirm__button">Растау</button>
                      </>
                  }
                </form>
              )}
            />
          : <Form
              onSubmit={genKeyOnSubmit}
              render={({handleSubmit}) => (
                <form
                  className="phoneConfirm__confirm"
                  onSubmit={handleSubmit}
                >
                  <p className="success">{info.data}</p>
                  <Field
                    name="phone"
                    defaultValue={phone}
                  >
                    {({input}) => (
                      <input
                        type="text"
                        className="hidden"
                        {...input}
                      />
                    )}
                  </Field>
                  <button type="submit" className="phoneConfirm__button">Call me back again</button>
                </form>
              )}
            />
      }



      {/*<div className="phoneConfirm__success">*/}
      {/*  <p>Тіркелу сәтті*/}
      {/*    аяқталды</p>*/}
      {/*</div>*/}

    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    hideRegModal: () => dispatch(hideModalReg()),
    onShowLoginModal: () => dispatch(showModalLogin())
  }
}

export default connect(null, mapDispatchToProps)(PhoneConfirmation)
