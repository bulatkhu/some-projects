import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form'
import Select from 'react-select'
import { connect } from 'react-redux'
import ReactCrop from 'react-image-crop'
import { setUsersData } from '../../../../redux/actions/user/userActionsFuncs'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import { scrollBodyHandler } from '../../../../scripts/scrollController/scrollController'
import { apiEditProfile } from '../../../../request/apiRequests'
import { getFromUserMeta } from '../../../../scripts/dataHandler/dataHandler'
import Loader from '../../../general/component/loader/loader'
import './editProfile.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { Translate } from "react-translated";
import { data } from '../../../../data'

const initialCrop = {
  unit: '%',
  width: 30,
  aspect: 10 / 10,
}

const options = [
  { label: 2021, value: 2021 },
  { label: 2020, value: 2020 },
  { label: 2019, value: 2019 },
  { label: 2018, value: 2018 },
  { label: 2017, value: 2017 }
]

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

const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  // const base64Image = canvas.toDataURL('image/jpeg');
  // console.log('base64', base64Image)
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      resolve(blob);
    }, 'image/jpeg');
  });
}


function formatFormValues(fromFormValues) {
  const values = fromFormValues
  const formValues = new FormData()
  const keys = Object.keys(values)
  keys
    .filter(item => item)
    .forEach(item => {
      console.log(item)
      if (typeof values[item] === 'object' && values[item]) {

        if ((item === 'avatar' || item === 'profile_image') && values[item].length) {
          console.log(item, values[item])

          formValues.append(item, values[item][0], values[item][0].name)
        } else {
          formValues.append(item, values[item].value)
        }
      } else {
        formValues.append(item, values[item])
      }
    })


  return formValues
}


const EditProfile = ({ type, updateUserData, user }) => {
  const onClickAddAvatar = useRef(null)
  const [showMessage, setShowMessage] = useState(null)
  const [photoDescr, setPhotoDescr] = useState(null)
  const [showPhotoEditor, setShowPhotoEditor] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [crop, setCrop] = useState(initialCrop)
  const [refToImage, setRefToImage] = useState(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState(null)

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


  useEffect(() => {

    // if (user) {

    // const option = options.find(item => {
    //   return item.value === +getFromUserMeta(user, 'region')
    // })
    // console.log('option', option)

    // }

    if (showPhotoEditor) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }
    return () => scrollBodyHandler.unLock()
  }, [showPhotoEditor, user])


  const onAvatarInputChange = target => {
    setShowPhotoEditor(true)
    if (target.files && target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setAvatarUrl(reader.result)
      })
      reader.readAsDataURL(target.files[0])
    }
  }


  const makeClientCrop = async crop => {
    if (refToImage && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        refToImage,
        crop,
        'newFile.jpeg'
      )
      setCroppedImageUrl(croppedImageUrl)
    }
  }


  const onProfileEdited = defaultValues => {
    let values2 = defaultValues
    if (values2 && values2.avatar && values2.avatar.length && croppedImageUrl) {
      values2.avatar = { 0: croppedImageUrl, length: 1 }
    }
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
    console.log(values2, 'sssssssssssssssss')
    const formValues = formatFormValues(values2)
    console.log(formValues)
    apiEditProfile(formValues)
      .then(res => {
        console.log('success:', res.data.message)
        setShowMessage(res.data.message || 'Success')
        setTimeout(() => {
          updateUserData()
        }, 500)
      })
      .catch(err => {
        setShowMessage(err.response.data.message || 'Something went wrong')
      })

  }

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


  useEffect(() => {
    console.log(values)
  }, [values])


  const avatarField = <Field name="avatar">
    {({ input: { value, onChange, ...input } }) => {
      const handleChange = ({ target }) => {
        onAvatarInputChange(target)
        const description = target.files[0] ? target.files[0].name : 'no'
        setPhotoDescr(`Photo: ${description}`)
        onChange(target.files)
        setShowPhotoEditor(true)
      }
      return (
        <input
          accept="image/*"
          ref={onClickAddAvatar}
          onChange={handleChange}
          {...input}
          type="file"
          className="hidden"
        />
      )
    }}
  </Field>


  let form = <Loader container />

  if (user) {
    if (type === 'student') {
      form = <Form onSubmit={onProfileEdited} render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="editProfile__form editProfileForm">

          <div className="editProfileForm__content">

            <div className="editProfileForm__column">
              {avatarField}
              <Field name="name" defaultValue={user.name}>
                {({ input }) => <input {...input} type="text" placeholder="Аты" className="editProfileForm__input" />}
              </Field>
              <Field name="surname" defaultValue={getFromUserMeta(user, 'surname')}>
                {({ input }) => <input {...input} type="text" placeholder="Тегі" className="editProfileForm__input" />}
              </Field>
              <Field
                name="city"

                placeholder={lang === 'ru' ? "Город" : "Облыс/қала"}
                className="editProfileForm__input editProfileForm__selector"
                styles={selectorStyles}

                component={({ input, ...rest }) => (
                  <Select
                    {...input}
                    {...rest}
                    value={lang === 'ru' ? (values.cityRu.label ? values.cityRu : values.cityRu.label === null ? undefined : getFromUserMeta(user, 'city') ? { label: getFromUserMeta(user, 'city') } : undefined) : values.cityKz.label ? values.cityKz : values.cityKz.label === null ? undefined : getFromUserMeta(user, 'city') ? { label: getFromUserMeta(user, 'city') } : undefined}
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
                    value={lang === 'ru' ? (values.regionRu.label ? values.regionRu : values.regionRu.label === null ? undefined : getFromUserMeta(user, 'region') ? { label: getFromUserMeta(user, 'region') } : undefined) : values.regionKz.label ? values.regionKz : values.regionKz.label === null ? undefined : getFromUserMeta(user, 'region') ? { label: getFromUserMeta(user, 'region') } : undefined}
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
                    value={lang === 'ru' ? (values.schoolRu.label ? values.schoolRu : values.schoolRu.label === null ? undefined : getFromUserMeta(user, 'school') ? { label: getFromUserMeta(user, 'school') } : undefined) : values.schoolKz.label ? values.schoolKz : values.schoolKz.label === null ? undefined : getFromUserMeta(user, 'school') ? { label: getFromUserMeta(user, 'school') } : undefined}
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
              <Field
                name="profileSubject"
                placeholder="Бейіндік пән"
                className="editProfileForm__input editProfileForm__selector"
                styles={selectorStyles}
                component={({ input, ...rest }) => (
                  <Select
                    {...input}
                    {...rest}
                    // defaultValue={options[0]}
                    defaultValue={options.find(option => option.value === +getFromUserMeta(user, 'profileSubject'))}
                    options={options}
                  />
                )}
              />
            </div>
            <div className="editProfileForm__column">
              <Field name="email" defaultValue={user.email}>
                {({ input }) => <input {...input} name="email" type="text" placeholder="E-mail"
                  className="editProfileForm__input" />}
              </Field>
              <Field name="phone" defaultValue={user.phone}>
                {({ input }) => <input {...input} type="text" placeholder="Тел. нөмірі"
                  className="editProfileForm__input" />}
              </Field>
              <Field name="iin" defaultValue={getFromUserMeta(user, 'iin')}>
                {({ input }) => <input {...input} type="text" placeholder="ЖСН" className="editProfileForm__input" />}
              </Field>
              <Field name="user_name" defaultValue={getFromUserMeta(user, 'user_name')}>
                {({ input }) => <input {...input} type="text" placeholder="ТЖК" className="editProfileForm__input" />}
              </Field>
              <Field name="parentPhone" defaultValue={getFromUserMeta(user, 'parentPhone')}>
                {({ input }) => <input {...input} type="text" placeholder="Ата-ана тел. нөмірі"
                  className="editProfileForm__input" />}
              </Field>
            </div>

          </div>

          <Field
            name="text"
            placeholder="Өзім туралы ..."
            className="editProfileForm__textHolder"
            component="textarea"
            defaultValue={getFromUserMeta(user, 'text')}
          />

          <div className="editProfileForm__wrapper">
            <button type="submit" className="editProfileForm__button"><Translate text="Сақтау" /></button>
          </div>

        </form>
      )} />
    } else if (type === 'teacher' || type === 'mentor') {
      form = (
        <Form
          onSubmit={onProfileEdited}
          render={({ handleSubmit }) => (<form onSubmit={handleSubmit} className="editProfile__form editProfileForm">

            <div className="editProfileForm__content">

              <div className="editProfileForm__column">
                {avatarField}
                <Field name="name">
                  {({ input }) => (
                    <input {...input} type="text" placeholder="Аты" className="editProfileForm__input" />
                  )}
                </Field>
                <Field name="goo">
                  {({ input }) => (
                    <input {...input} type="text" placeholder="ЖОО" className="editProfileForm__input" />
                  )}
                </Field>
                <Field name="email">
                  {({ input }) => (
                    <input {...input} name="email" type="text" placeholder="E-mail" className="editProfileForm__input" />
                  )}
                </Field>
                <Field name="theme">
                  {({ input }) => (
                    <input {...input} type="text" placeholder="Пәні" className="editProfileForm__input" />
                  )}
                </Field>
              </div>
              <div className="editProfileForm__column">
                <Field name="lastname">
                  {({ input }) => (
                    <input {...input} type="text" placeholder="Тегі" className="editProfileForm__input" />
                  )}
                </Field>
                <Field name="specialty">
                  {({ input }) => (
                    <input {...input} type="text" placeholder="Мамандық" className="editProfileForm__input" />
                  )}
                </Field>
                <Field name="phone">
                  {({ input }) => (
                    <input {...input} name="email" type="text" placeholder="Тел. нөмірі"
                      className="editProfileForm__input" />
                  )}
                </Field>
              </div>

            </div>

            <textarea placeholder="Өзім туралы ..." className="editProfileForm__textHolder" />


            <div className="editProfileForm__wrapper">
              <button className="editProfileForm__button"><Translate text="Сақтау" /></button>
            </div>

          </form>)}
        />
      )
    }
  }

  return (
    <section className="editProfile">

      {
        showPhotoEditor && <ModalPortal>
          <div className="editProfileModal fixed">
            <div className="editProfileModal__body">

              <button
                onClick={() => {
                  setShowPhotoEditor(false)
                  onClickAddAvatar.current.value = null
                  setPhotoDescr('Photo: no')
                }}
                className="editProfileModal__close btn__noFocus"
              >&times;</button>
              {
                avatarUrl && (
                  <div className="editProfileModal__content">
                    <div className="editProfileModal__column">
                      <div className="editProfileModal__editorWrapper">
                        <ReactCrop
                          src={avatarUrl}
                          crop={crop}
                          ruleOfThirds
                          onImageLoaded={setRefToImage}
                          onComplete={makeClientCrop}
                          onChange={setCrop}
                        />
                      </div>
                    </div>
                    <div className="editProfileModal__column">
                      {
                        croppedImageUrl && (
                          <div className="editProfileModal__img">
                            <img src={window.URL.createObjectURL(croppedImageUrl)} alt="avatar" />
                          </div>
                        )
                      }
                    </div>
                  </div>
                )
              }
              <button
                className="editProfile__btn editProfile__addPhoto"
                style={{ margin: '20px auto', maxWidth: 200, display: 'block' }}
                onClick={() => {
                  setPhotoDescr('Your cropped has been saved')
                  setShowPhotoEditor(false)
                }}
              >Save photo
              </button>
            </div>
          </div>
        </ModalPortal>
      }
      <div className="editProfile__header">
        <div className="editProfile__buttons">
          <button onClick={() => {
            onClickAddAvatar.current.value = null
            setPhotoDescr('Photo: no')
          }} className="editProfile__btn editProfile__deletePhoto"><Translate text="Суретті өшіру" />
          </button>
          <button
            onClick={() => {
              onClickAddAvatar.current.click()
            }}
            className="editProfile__btn editProfile__addPhoto"><Translate text="Сурет жүктеу" />
          </button>
          <div className="success editProfileBtn__info">{photoDescr}</div>
        </div>

        {showMessage && (
          <div className="success editProfile__error">
            {showMessage}
          </div>
        )}
      </div>
      {form}
    </section>
  )
}


const mapStateToProps = state => {

  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {

  return {
    updateUserData: () => dispatch(setUsersData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
