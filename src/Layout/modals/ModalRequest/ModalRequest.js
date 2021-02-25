import React, {useState} from 'react'
import { Form, Field } from 'react-final-form'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import {Transition} from 'react-transition-group'
import InputMask from 'react-input-mask'
import {GOOGLE_SHEETS_CONFIG} from '../../../app.config'
import {validatePhone} from '../../../scripts/validations/validators'
import Loader from '../../general/component/loader/loader'
import './ModalRequest.scoped.scss'
import {Translate, Translator} from "react-translated";


// const spreadSheetId = '1AJmb7nn0w_9KPRi-kfb_kNUSD0etq_V7zKOqQBo3ghQ'
// const sheetId = 0

const duration = 300

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 1,
  position: 'relative',
  marginTop: '-2000%'
}

const transitionStyles = {
  entering: {opacity: 1, marginTop: '-90%'},
  entered: {opacity: 1, marginTop: '3%'},
  exiting: {opacity: 0, marginTop: '-70%'},
  exited: {opacity: 0, marginTop: '-100%'},
}

const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_CONFIG.spreadSheetId)

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SHEETS_CONFIG.client_email,
      private_key: GOOGLE_SHEETS_CONFIG.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[GOOGLE_SHEETS_CONFIG.sheetId];
    return {
      error: false,
      ...(await sheet.addRow({id: 'none', ...row}))
    }
  } catch (e) {
    console.error('Error: ', e);
    return {
      error: true,
      ...e
    }
  }
}


const ModalRequest = ({isShow, setShow}) => {
  const [onRequest, setOnRequest] = useState(false)
  const [info, setInfo] = useState(null)

  const onSubmit = formData => {
    const values = formData
    setOnRequest(true)

    appendSpreadsheet(values)
      .then(res => {
        setOnRequest(false)

        if (!res.error) {

          setInfo('Request has been successfully sent')

        } else {

          setInfo(`Error: ${res.message}`)

        }

      })

  }


  return (
    <div onClick={event => event.target === event.currentTarget ? setShow(prev => !prev) : null} className={['modRequest__overlay', isShow ? 'active' : null].join(' ')}>
      <Transition in={isShow} timeout={duration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }} className="modRequest">
            {
              onRequest
                ? <Loader container/>
                : info
                  ? <div className="modRequest__info">
                      <button onClick={() => setShow(prev => !prev)} className="modRequest__close btn__noFocus">&times;</button>
                      <p className="success">{info}</p>
                    </div>
                  : <div className="modRequest__wrapper">
                      <button onClick={() => setShow(prev => !prev)} className="modRequest__close btn__noFocus">&times;</button>

                      <h2 className="modRequest__title">Өтінім қалдырыңыз.</h2>
                      <h3 className="modRequest__subtitle">Біз жақын арада Сізге хабарласамыз.</h3>

                      <Form
                        onSubmit={onSubmit}
                        render={({handleSubmit}) => (
                          <form onSubmit={handleSubmit} className="modRequest__inputs inputs">

                            <div className="inputs__labels">
                              <label htmlFor="dfs" className="inputs__label">
                                <Translator>
                                  {({translate}) => (
                                    <Field
                                      className="inputs__input inputs__name btn__noFocus"
                                      placeholder={translate({text: 'Full name'})}
                                      required
                                      component="input"
                                      type="text"
                                      name="name"
                                    />
                                  )}
                                </Translator>
                              </label>
                              <label htmlFor="dfs" className="inputs__label">
                                <Field
                                  className="inputs__input inputs__phone btn__noFocus"
                                  placeholder="+7(7__)-___-__-__"
                                  required
                                  component="input"
                                  parse={value => value.replace(/\(|\)|\s|-/g, '')}
                                  validate={validatePhone}
                                  type="text"
                                  name="number"
                                >
                                  {({input, meta}) => (
                                    <>
                                      <InputMask
                                        mask="+7 (999) - 999 - 99 - 99"
                                        className={['inputs__input inputs__name btn__noFocus',
                                          meta.error && meta.touched ? 'inputs__error' : null
                                        ].join(' ')}
                                        placeholder="+7 (___) - ___ - __ - __"
                                        {...input}
                                      />
                                      {meta.error && meta.touched
                                        ? <span className="inputs__boxError error"><Translate text='Invalid phone number'/></span>
                                        : null}
                                    </>
                                  )}
                                </Field>
                              </label>
                              <label htmlFor="dfs" className="inputs__label">
                                <Translator>
                                  {({translate}) => (
                                    <Field
                                      className="inputs__input inputs__name btn__noFocus"
                                      placeholder={translate({text: 'Region/city'})}
                                      required
                                      component="input"
                                      type="text"
                                      name="city"
                                    />
                                  )}
                                </Translator>
                              </label>
                              <label htmlFor="dfs" className="inputs__label">
                                <Translator>
                                  {({translate}) => (
                                    <Field
                                      className="inputs__input inputs__name btn__noFocus"
                                      placeholder={translate({text: 'Region/district'})}
                                      required
                                      component="input"
                                      type="text"
                                      name="raion"
                                    />
                                  )}
                                </Translator>
                              </label>
                              <label htmlFor="dfs" className="inputs__label">
                                <Translator>
                                  {({translate}) => (
                                    <Field
                                      className="inputs__input inputs__name btn__noFocus"
                                      placeholder={translate({text: 'Profile subject'})}
                                      required
                                      component="input"
                                      type="text"
                                      name="predmet"
                                    />
                                  )}
                                </Translator>
                              </label>
                            </div>


                            <button type="submit" className="inputs__btn btn__shadowFromNull"><Translate text="Жіберу"/></button>

                          </form>
                        )}
                      />
                    </div>
            }

          </div>
        )}
      </Transition>
    </div>
  )
}

export default ModalRequest
