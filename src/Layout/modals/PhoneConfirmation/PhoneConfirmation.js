import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Field, Form} from 'react-final-form'
import {connect} from 'react-redux'
import Countdown from 'react-countdown'
import Loader from '../../general/component/loader/loader'
import {checkKey, keyGenerate} from '../../../request/apiRequests'
import {hideModalReg, showModalLogin} from '../../../redux/actions/menu/menuActionsFuncs'
import { Translate } from 'react-translated'






const PhoneConfirmation = ({phone, data, setPhoneConf, hideRegModal, onShowLoginModal}) => {
  const lang = useSelector(state => state.lang.value)
  const CallAgainBtn = () => {
    return <button type="submit" className="phoneConfirm__button">{lang === 'ru' ? 'Перезвонить мне снова' : 'Маған қайта қоңырау шалыңыз'}</button>
  }

  const renderer = props => {
    let {minutes, seconds, completed} = props
  
    if (completed) {
      return <CallAgainBtn/>
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
  
  const TimerComponent = React.memo(({complete}) => {
  
    return (
      <Countdown
        date={Date.now() + 60 * 1000 * 3}
        renderer={renderer}
        onComplete={complete}
      />
    )
  })
  
  
  const GenerateCallbackForm = ({genKeySubmit, phone, info, withClass = true}) => {
  
  
    return (
      <Form
        onSubmit={genKeySubmit}
        render={({handleSubmit}) => (
          <form
            className={[withClass ? 'phoneConfirm__confirm' : null].join(' ')}
            onSubmit={handleSubmit}
          >
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
            <CallAgainBtn/>
          </form>
        )}
      />
    )
  }
  

  
  const [info, setInfo] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [onError, setOnError] = useState(false)
  const [onSuccess, setOnSuccess] = useState(false)

  const onSubmit = async values => {
    setIsLoading(true)


    try {

      const response = await checkKey(values)

      console.log('response from phone confirm:', response)

      if (response.data) {
        setInfo(response)
        setIsLoading(false)

        if (response.data === 'Your account activated!') {
          setOnSuccess(true)

          setTimeout(() => {
            setPhoneConf({boolean: false, phone: null})
            hideRegModal()
            onShowLoginModal()
          }, 2000)
        }
      }

    } catch (e) {
      console.info('error', e.message)
      setOnError(e.message)
      setIsLoading(false)
    }

  }

  const genKeyOnSubmit = async value => {
    const data = await keyGenerate(value.phone)
    setInfo(data)
    setTimerExpired(false)
    setOnError(false)
  }

  const timerWasCompleted = () => setTimerExpired(true)




  if (onSuccess) {

    return (
      <div className="phoneConfirm">

        <div className="phoneConfirm__confirm">
          <p className="error">{info.data}</p>
        </div>

      </div>
    )
  }

  if (onError) {

    return (
      <div className="phoneConfirm">

        <div className="phoneConfirm__confirm">
          <p className="error">{<Translate text={onError}/>}</p>
          {
            info.data
              ? <p className="error">{info.data}</p>
              : null
          }
          <GenerateCallbackForm
            phone={phone}
            withClass={false}
            info={info}
            genKeySubmit={genKeyOnSubmit}
          />
        </div>

      </div>
    )
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
                      <p className="success">{<Translate text={info.data} />}</p>
                      <p className="phoneConfirm__description">
                        <Translate text='Қоңырау шалған нөмірдіңсоңғы 6 санын енгізіңіз.'/>
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

                        <TimerComponent
                          complete={timerWasCompleted}
                        />
                      </p>

                      <button className="phoneConfirm__button"><Translate text='Растау'/></button>
                    </>
                }
              </form>
            )}
          />
          : <GenerateCallbackForm
            phone={phone}
            info={<Translate text={info}/>}
            genKeySubmit={genKeyOnSubmit}
          />

      }

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
