import React, {useEffect, useRef, useState} from 'react'
import {Field, Form} from 'react-final-form'
import Select from 'react-select'
import {connect} from 'react-redux'
import ReactCrop from 'react-image-crop'
import {setUsersData} from '../../../../redux/actions/user/userActionsFuncs'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import {apiEditProfile} from '../../../../request/apiRequests'
import {getFromUserMeta} from '../../../../scripts/dataHandler/dataHandler'
import Loader from '../../../general/component/loader/loader'
import './editProfile.scss'
import 'react-image-crop/dist/ReactCrop.css'
import {Translate} from "react-translated";

const initialCrop = {
  unit: '%',
  width: 30,
  aspect: 10 / 10,
}

const options = [
  {label: 2021, value: 2021},
  {label: 2020, value: 2020},
  {label: 2019, value: 2019},
  {label: 2018, value: 2018},
  {label: 2017, value: 2017}
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


const EditProfile = ({type, updateUserData, user}) => {
  const onClickAddAvatar = useRef(null)
  const [showMessage, setShowMessage] = useState(null)
  const [photoDescr, setPhotoDescr] = useState(null)
  const [showPhotoEditor, setShowPhotoEditor] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [crop, setCrop] = useState(initialCrop)
  const [refToImage, setRefToImage] = useState(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState(null)



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
    const values = defaultValues
    if (values && values.avatar && values.avatar.length && croppedImageUrl) {
      values.avatar = {0: croppedImageUrl, length: 1}
    }
    const formValues = formatFormValues(values)
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


  const avatarField = <Field name="avatar">
    {({input: {value, onChange, ...input}}) => {
      const handleChange = ({target}) => {
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


  let form = <Loader container/>

  if (user) {
    if (type === 'student') {
      form = <Form onSubmit={onProfileEdited} render={({handleSubmit}) => (
        <form
          onSubmit={handleSubmit}
          className="editProfile__form editProfileForm">

          <div className="editProfileForm__content">

            <div className="editProfileForm__column">
              {avatarField}
              <Field name="name" defaultValue={user.name}>
                {({input}) => <input {...input} type="text" placeholder="Аты" className="editProfileForm__input"/>}
              </Field>
              <Field name="surname" defaultValue={getFromUserMeta(user, 'surname')}>
                {({input}) => <input {...input} type="text" placeholder="Тегі" className="editProfileForm__input"/>}
              </Field>
              <Field
                name="region"
                placeholder="Облыс/қала"
                className="editProfileForm__input editProfileForm__selector"
                styles={selectorStyles}
                component={({input, ...rest}) => (
                  <Select
                    {...input}
                    {...rest}
                    options={options}
                  />
                )}
              />
              <Field
                name="city"
                placeholder="Қала/Аудан"
                className="editProfileForm__input editProfileForm__selector"
                styles={selectorStyles}
                component={({input, ...rest}) => (
                  <Select
                    {...input}
                    {...rest}
                    value={options.find(option => option.value === +getFromUserMeta(user, 'city'))}
                    options={options}
                  />
                )}
              />
              <Field
                name="subject"
                placeholder="Мектеп"
                className="editProfileForm__input editProfileForm__selector"
                styles={selectorStyles}
                component={({input, ...rest}) => (
                  <Select
                    {...input}
                    {...rest}
                    value={options.find(option => option.value === +getFromUserMeta(user, 'subject'))}
                    options={options}
                  />
                )}
              />
              <Field
                name="profileSubject"
                placeholder="Бейіндік пән"
                className="editProfileForm__input editProfileForm__selector"
                styles={selectorStyles}
                component={({input, ...rest}) => (
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
                {({input}) => <input {...input} name="email" type="text" placeholder="E-mail"
                                     className="editProfileForm__input"/>}
              </Field>
              <Field name="phone" defaultValue={user.phone}>
                {({input}) => <input {...input} type="text" placeholder="Тел. нөмірі"
                                     className="editProfileForm__input"/>}
              </Field>
              <Field name="iin" defaultValue={getFromUserMeta(user, 'iin')}>
                {({input}) => <input {...input} type="text" placeholder="ЖСН" className="editProfileForm__input"/>}
              </Field>
              <Field name="user_name" defaultValue={getFromUserMeta(user, 'user_name')}>
                {({input}) => <input {...input} type="text" placeholder="ТЖК" className="editProfileForm__input"/>}
              </Field>
              <Field name="parentPhone" defaultValue={getFromUserMeta(user, 'parentPhone')}>
                {({input}) => <input {...input} type="text" placeholder="Ата-ана тел. нөмірі"
                                     className="editProfileForm__input"/>}
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
            <button type="submit" className="editProfileForm__button"><Translate text="Сақтау"/></button>
          </div>

        </form>
      )}/>
    } else if (type === 'teacher' || type === 'mentor') {
      form = (
        <Form
          onSubmit={onProfileEdited}
          render={({handleSubmit}) => (<form onSubmit={handleSubmit} className="editProfile__form editProfileForm">

            <div className="editProfileForm__content">

              <div className="editProfileForm__column">
                {avatarField}
                <Field name="name">
                  {({input}) => (
                    <input {...input} type="text" placeholder="Аты" className="editProfileForm__input"/>
                  )}
                </Field>
                <Field name="goo">
                  {({input}) => (
                    <input {...input} type="text" placeholder="ЖОО" className="editProfileForm__input"/>
                  )}
                </Field>
                <Field name="email">
                  {({input}) => (
                    <input {...input} name="email" type="text" placeholder="E-mail" className="editProfileForm__input"/>
                  )}
                </Field>
                <Field name="theme">
                  {({input}) => (
                    <input {...input} type="text" placeholder="Пәні" className="editProfileForm__input"/>
                  )}
                </Field>
              </div>
              <div className="editProfileForm__column">
                <Field name="lastname">
                  {({input}) => (
                    <input {...input} type="text" placeholder="Тегі" className="editProfileForm__input"/>
                  )}
                </Field>
                <Field name="specialty">
                  {({input}) => (
                    <input {...input} type="text" placeholder="Мамандық" className="editProfileForm__input"/>
                  )}
                </Field>
                <Field name="phone">
                  {({input}) => (
                    <input {...input} name="email" type="text" placeholder="Тел. нөмірі"
                           className="editProfileForm__input"/>
                  )}
                </Field>
              </div>

            </div>

            <textarea placeholder="Өзім туралы ..." className="editProfileForm__textHolder"/>


            <div className="editProfileForm__wrapper">
              <button className="editProfileForm__button"><Translate text="Сақтау"/></button>
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
                            <img src={window.URL.createObjectURL(croppedImageUrl)} alt="avatar"/>
                          </div>
                        )
                      }
                    </div>
                  </div>
                )
              }
              <button
                className="editProfile__btn editProfile__addPhoto"
                style={{margin: '20px auto', maxWidth: 200, display: 'block'}}
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
          }} className="editProfile__btn editProfile__deletePhoto"><Translate text="Суретті өшіру"/>
          </button>
          <button
            onClick={() => {
              onClickAddAvatar.current.click()
            }}
            className="editProfile__btn editProfile__addPhoto"><Translate text="Сурет жүктеу"/>
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
