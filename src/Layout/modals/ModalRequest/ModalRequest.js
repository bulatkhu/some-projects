import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import Select from 'react-select';
import { Transition } from 'react-transition-group'
import InputMask from 'react-input-mask'
import { GOOGLE_SHEETS_CONFIG } from '../../../app.config'
import { validatePhone } from '../../../scripts/validations/validators'
import Loader from '../../general/component/loader/loader'
import './ModalRequest.scoped.scss'
import { Translate, Translator } from "react-translated";
import { data } from '../../../data'


// const spreadSheetId = '1AJmb7nn0w_9KPRi-kfb_kNUSD0etq_V7zKOqQBo3ghQ'
// const sheetId = 0


const selectorStyles = {
  control: prev => ({
    ...prev,
    border: 0,
    background: 'none',
    boxShadow: 'none'
  }),
  placeholder: prev => ({
    ...prev,
    color: '#B9B9B9'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
}


const duration = 300

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 1,
  position: 'relative',
  marginTop: '-2000%'
}

const transitionStyles = {
  entering: { opacity: 1, marginTop: '-90%' },
  entered: { opacity: 1, marginTop: '3%' },
  exiting: { opacity: 0, marginTop: '-70%' },
  exited: { opacity: 0, marginTop: '-100%' },
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
      ...(await sheet.addRow({ id: 'none', ...row }))
    }
  } catch (e) {
    console.error('Error: ', e);
    return {
      error: true,
      ...e
    }
  }
}


const ModalRequest = ({ isShow, setShow }) => {
  const [onRequest, setOnRequest] = useState(false)
  const [info, setInfo] = useState(null)


  const [cityRu, setCityRu] = useState([]);
  const [cityKz, setCityKz] = useState([]);
  const [regionRu, setRegionRu] = useState([]);
  const [regionKz, setRegionKz] = useState([]);
  const [schoolRu, setSchoolRu] = useState([]);
  const [schoolKz, setSchoolKz] = useState([]);

  const [myCityRu, setMyCityRu] = useState([]);
  const [myCityKz, setMyCityKz] = useState([]);
  const [myRegionRu, setMyRegionRu] = useState([]);
  const [myRegionKz, setMyRegionKz] = useState([]);
  const [mySchoolRu, setMySchoolRu] = useState([]);
  const [mySchoolKz, setMySchoolKz] = useState([]);

  const [values, setValues] = useState({
    cityRu: { label: undefined },
    cityKz: { label: undefined },
    regionRu: { label: undefined },
    regionKz: { label: undefined },
    schoolRu: { label: undefined },
    schoolKz: { label: undefined }
  })

  const lang = useSelector(state => state.lang.value)
  console.log(lang)

  useEffect(() => {
    let copyCityRu = [];
    let copyCityKz = [];
    let copyRegionRu = [];
    let copyRegionKz = [];
    let copySchoolRu = [];
    let copySchoolKz = [];
    for (let item of data) {
      if (copyCityRu.indexOf(item[5]) === -1) copyCityRu.push(item[5]);
      if (copyCityKz.indexOf(item[4]) === -1) copyCityKz.push(item[4]);
      if (copyRegionRu.indexOf(item[3]) === -1) copyRegionRu.push(item[3]);
      if (copyRegionKz.indexOf(item[2]) === -1) copyRegionKz.push(item[2]);
      copySchoolRu.push(item[1]);
      copySchoolKz.push(item[0]);
    }
    //console.log(copyCityRu,copyCityKz,copyRegionRu,copyRegionKz,copySchoolRu,copySchoolKz)
    setCityRu(copyCityRu);
    setCityKz(copyCityKz);
    setRegionRu(copyRegionRu);
    setRegionKz(copyRegionKz);
    setSchoolRu(copySchoolRu);
    setSchoolKz(copySchoolKz);
  }, [])


  const cityHandler = e => {
    if (e.value === undefined) {
      setValues({
        ...values,
        cityRu: { label: null },
        regionRu: { label: null },
        schoolRu: { label: null },
        cityKz: { label: null },
        regionKz: { label: null },
        schoolKz: { label: null }
      })
      setMyCityRu([]);
      setMyCityKz([]);
      setMyRegionRu([]);
      setMyRegionKz([]);
      setMySchoolRu([]);
      setMySchoolKz([]);
      return;
    }
    console.log(e.value)
    let copyRegionRu = [];
    let copyRegionKz = [];
    let nameRu;
    let nameKz;
    for (let it of data) {
      if (it[5] === e.value || it[4] === e.value) {
        console.log('+')
        nameRu = it[5];
        nameKz = it[4];
        if (copyRegionRu.indexOf(it[3]) === -1) copyRegionRu.push(it[3])
        if (copyRegionKz.indexOf(it[2]) === -1) copyRegionKz.push(it[2])
      }
    }
    let regionRuCopy = values.regionRu.label ? values.regionRu : { label: null };
    let regionKzCopy = values.regionKz.label ? values.regionKz : { label: null };
    let schoolRuCopy = values.schoolRu.label ? values.schoolRu : { label: null };
    let schoolKzCopy = values.schoolKz.label ? values.schoolKz : { label: null };
    setValues({
      ...values,
      cityRu: { label: nameRu },
      cityKz: { label: nameKz },
      regionRu: regionRuCopy,
      schoolRu: schoolRuCopy,
      regionKz: regionKzCopy,
      schoolKz: schoolKzCopy,
    })
    setMyRegionRu(copyRegionRu);
    setMyRegionKz(copyRegionKz);


    if (!values.regionRu.label) {
      let copySchoolRu = [];
      let copySchoolKz = [];
      for (let it of data) {
        if ((it[5] || it[4]) === e.value) {
          console.log('+')
          copySchoolRu.push(it[1])
          copySchoolKz.push(it[0])
        }
      }
      setMySchoolRu(copySchoolRu);
      setMySchoolKz(copySchoolKz);
    }
  }

  const regionHandler = e => {
    if (e.value === undefined) {
      setValues({
        ...values,
        cityRu: { label: null },
        regionRu: { label: null },
        schoolRu: { label: null },
        cityKz: { label: null },
        regionKz: { label: null },
        schoolKz: { label: null }
      })
      setMyCityRu([]);
      setMyCityKz([]);
      setMyRegionRu([]);
      setMyRegionKz([]);
      setMySchoolRu([]);
      setMySchoolKz([]);
      return;
    }
    let copyCityRu = [];
    let copyCityKz = [];
    let copySchoolRu = [];
    let copySchoolKz = [];
    let nameRu;
    let nameKz;
    for (let it of data) {
      if (it[3] === e.value || it[2] === e.value) {
        console.log('+')
        nameRu = it[3];
        nameKz = it[2];
        if (copyCityRu.indexOf(it[5]) === -1) copyCityRu.push(it[5])
        if (copyCityKz.indexOf(it[4]) === -1) copyCityKz.push(it[4])
        copySchoolRu.push(it[1])
        copySchoolKz.push(it[0])
      }
    }
    let cityRuCopy = values.cityRu.label ? values.cityRu : { label: null };
    let cityKzCopy = values.cityKz.label ? values.cityKz : { label: null };
    let schoolRuCopy = values.schoolRu.label ? values.schoolRu : { label: null };
    let schoolKzCopy = values.schoolKz.label ? values.schoolKz : { label: null };
    setValues({
      ...values,
      regionRu: { label: nameRu },
      regionKz: { label: nameKz },
      cityRu: cityRuCopy,
      schoolRu: schoolRuCopy,
      cityKz: cityKzCopy,
      schoolKz: schoolKzCopy,
    })
    setMyCityRu(copyCityRu);
    setMyCityKz(copyCityKz);
    setMySchoolRu(copySchoolRu);
    setMySchoolKz(copySchoolKz);
  }

  const schoolHandler = e => {
    if (e.value === undefined) {
      setValues({
        ...values,
        cityRu: { label: null },
        regionRu: { label: null },
        schoolRu: { label: null },
        cityKz: { label: null },
        regionKz: { label: null },
        schoolKz: { label: null }
      })
      setMyCityRu([]);
      setMyCityKz([]);
      setMyRegionRu([]);
      setMyRegionKz([]);
      setMySchoolRu([]);
      setMySchoolKz([]);
      return;
    }
    let copyCityRu = [];
    let copyCityKz = [];
    let copyRegionRu = [];
    let copyRegionKz = [];
    let nameRu;
    let nameKz;
    let nameCityRu;
    let nameCityKz;
    let nameRegRu;
    let nameRegKz;
    for (let it of data) {
      if (it[1] === e.value || it[0] === e.value) {
        console.log('+')
        nameCityRu = it[5];
        nameCityKz = it[4];
        nameRegRu = it[3];
        nameRegKz = it[2];
        nameRu = it[1];
        nameKz = it[0];
        if (copyCityRu.indexOf(it[5]) === -1) copyCityRu.push(it[5])
        if (copyCityKz.indexOf(it[4]) === -1) copyCityKz.push(it[4])
        if (copyRegionRu.indexOf(it[3]) === -1) copyRegionRu.push(it[3])
        if (copyRegionKz.indexOf(it[2]) === -1) copyRegionKz.push(it[2])
      }
    }
    setValues({
      ...values,
      cityRu: { label: nameCityRu },
      regionRu: { label: nameRegRu },
      schoolRu: { label: nameRu },
      cityKz: { label: nameCityKz },
      regionKz: { label: nameRegKz },
      schoolKz: { label: nameKz }
    })
    setMyCityRu(copyCityRu);
    setMyCityKz(copyCityKz);
    setMyRegionRu(copyRegionRu);
    setMyRegionKz(copyRegionKz);
  }


  const onSubmit = formData => {
    let values2 = formData;
    if (values.cityRu.label) {
      values2 = {
        ...values2,
        city: `${lang === 'ru' ? values.cityRu.label : values.cityKz.label}`,
      }
    }
    if (values.regionRu.label) {
      values2 = {
        ...values2,
        region: `${lang === 'ru' ? values.regionRu.label : values.regionKz.label}`,
      }
    }
    if (values.schoolRu.label) {
      values2 = {
        ...values2,
        school: `${lang === 'ru' ? values.schoolRu.label : values.schoolKz.label}`,
      }
    }
    console.log(values2)
    setOnRequest(true)

    appendSpreadsheet(values2)
      .then(res => {
        setOnRequest(false)

        if (!res.error) {

          setInfo('Request has been successfully sent')

        } else {

          setInfo(`Error: ${res.message}`)

        }

      })

  }

  useEffect(() => {
    console.log(values)
  }, [values])


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
                ? <Loader container />
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
                      render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="modRequest__inputs inputs">

                          <div className="inputs__labels">
                            <label htmlFor="dfs" className="inputs__label">
                              <Translator>
                                {({ translate }) => (
                                  <Field
                                    className="inputs__input inputs__name btn__noFocus"
                                    placeholder={translate({ text: 'Full name' })}
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
                                {({ input, meta }) => (
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
                                      ? <span className="inputs__boxError error"><Translate text='Invalid phone number' /></span>
                                      : null}
                                  </>
                                )}
                              </Field>
                            </label>
                            <label htmlFor="dfs" className="inputs__label">
                              <Field
                                name="city"
                                placeholder={lang === 'ru' ? "Город" : "Облыс/қала"}
                                className="editProfileForm__input editProfileForm__selector"
                                styles={selectorStyles}

                                component={({ input, ...rest }) => (
                                  <Select
                                    {...input}
                                    {...rest}
                                    value={lang === 'ru' ? (values.cityRu.label ? values.cityRu : undefined) : lang === 'kz' ? (values.cityKz.label ? values.cityKz : undefined) : undefined}
                                    onChange={cityHandler}
                                    options={
                                      lang === 'ru'
                                        ?
                                        myCityRu.length > 0 ?
                                          [
                                            { label: 'Все', value: undefined },
                                            ...myCityRu.map(city => ({ label: city, value: city }))
                                          ]
                                          :
                                          [
                                            { label: 'Все', value: undefined },
                                            ...cityRu.map(city => ({ label: city, value: city }))
                                          ]
                                        :
                                        myCityKz.length > 0 ?
                                          [
                                            { label: 'Все', value: undefined },
                                            ...myCityKz.map(city => ({ label: city, value: city }))
                                          ]
                                          :
                                          [
                                            { label: 'Все', value: undefined },
                                            ...cityKz.map(city => ({ label: city, value: city }))
                                          ]
                                    }
                                  />
                                )}
                              />
                            </label>
                            <label htmlFor="dfs" className="inputs__label">
                              <Field
                                name="region"
                                placeholder={lang === "ru" ? "Район" : "Қала/Аудан"}
                                className="editProfileForm__input editProfileForm__selector"
                                styles={selectorStyles}
                                component={({ input, ...rest }) => (
                                  <Select
                                    {...input}
                                    {...rest}
                                    // value={options.find(option => option.value === +getFromUserMeta(user, 'city'))}
                                    value={lang === 'ru' ? (values.regionRu.label ? values.regionRu : undefined) : lang === 'kz' ? (values.regionKz.label ? values.regionKz : undefined) : undefined}
                                    onChange={regionHandler}
                                    options={
                                      lang === 'ru'
                                        ?
                                        myRegionRu.length > 0
                                          ?
                                          [
                                            { label: 'Все', value: undefined },
                                            ...myRegionRu.map(reg => ({ label: reg, value: reg }))
                                          ]
                                          :
                                          [
                                            { label: 'Все', value: undefined },
                                            ...regionRu.map(reg => ({ label: reg, value: reg }))
                                          ]
                                        :
                                        myRegionKz.length > 0
                                          ?
                                          [
                                            { label: 'Все', value: undefined },
                                            ...myRegionKz.map(reg => ({ label: reg, value: reg }))
                                          ]
                                          :
                                          [
                                            { label: 'Все', value: undefined },
                                            ...regionKz.map(reg => ({ label: reg, value: reg }))
                                          ]
                                    }
                                  />
                                )}
                              />
                            </label>
                            <label htmlFor="dfs" className="inputs__label">
                              <Field
                                name="school"
                                placeholder={lang === 'ru' ? "Школа" : "Мектеп"}
                                className="editProfileForm__input editProfileForm__selector"
                                styles={selectorStyles}
                                component={({ input, ...rest }) => (
                                  <Select
                                    {...input}
                                    {...rest}
                                    // value={options.find(option => option.value === +getFromUserMeta(user, 'subject'))}
                                    value={lang === 'ru' ? (values.schoolRu.label ? values.schoolRu : undefined) : lang === 'kz' ? (values.schoolKz.label ? values.schoolKz : undefined) : undefined}
                                    onChange={schoolHandler}
                                    options={
                                      lang === 'ru' ?
                                        mySchoolRu.length > 0
                                          ?
                                          [
                                            { label: 'Все', value: undefined },
                                            ...mySchoolRu.map(sc => ({ label: sc, value: sc }))
                                          ]
                                          :
                                          [
                                            { label: 'Все', value: undefined },
                                            ...schoolRu.map(sc => ({ label: sc, value: sc }))
                                          ]
                                        :
                                        mySchoolKz.length > 0
                                          ?
                                          [
                                            { label: 'Все', value: undefined },
                                            ...mySchoolKz.map(sc => ({ label: sc, value: sc }))
                                          ]
                                          :
                                          [
                                            { label: 'Все', value: undefined },
                                            ...schoolKz.map(sc => ({ label: sc, value: sc }))
                                          ]
                                    }
                                  />
                                )}
                              />
                            </label>
                          </div>


                          <button type="submit" className="inputs__btn btn__shadowFromNull"><Translate text="Жіберу" /></button>

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
