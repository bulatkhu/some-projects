import React, {useRef, useState} from 'react'
import {Field, Form} from 'react-final-form'
import Select from 'react-select'
import {apiEditProfile} from '../../../../request/apiRequests'
import './editProfile.scss'


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
    border: 'none',
    background: 'none'
  }),
  placeholder: prev => ({
    ...prev,
    color: '#B9B9B9'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
}


function formatFormValues(fromFormValues) {
  const values = fromFormValues
  const formValues = new FormData()
  const keys = Object.keys(values)
  keys.forEach(item => {
    if (typeof values[item] === 'object') {

      if ((item === 'avatar' || item === 'profile_image') && values[item].length) {
        formValues.append(item, values[item][0], values[item][0].name)
      } else {
        formValues.append(item, values[item].value)
      }
    } else {
      formValues.append(item, values[item])
    }
  })

  for (let item of formValues) {

    console.log('item', item)

  }


  return formValues
}


const EditProfile = ({type}) => {
  const [showMessage, setShowMessage] = useState(null)
  const [photoDescr, setPhotoDescr] = useState(null)
  const onClickAddAvatar = useRef(null)

  const onProfileEdited = values => {
    const formValues = formatFormValues(values)

    apiEditProfile(formValues)
      .then(res => {
        if (res.error) {
          console.log('error:', res)
          setShowMessage(res.data.message)
          return
        }

        console.log('success:', res.data.message)
        setShowMessage(res.data.message)
      })

  }


  let form

  if (type === 'student') {
    form = <>
      <div className="editProfile__buttons">
        <div className="editProfileBtn__wrapper">
        </div>
        <div className="editProfileBtn__wrapper">
        </div>
        <button onClick={() => {
          onClickAddAvatar.current.value = null
          setPhotoDescr('Photo: no')
        }} className="editProfile__btn editProfile__deletePhoto">Суретті өшіру</button>
        <button
          onClick={() => onClickAddAvatar.current.click()}
          className="editProfile__btn editProfile__addPhoto">Сурет жүктеу
        </button>
        <div className="success editProfileBtn__info">{photoDescr}</div>
      </div>

      {showMessage && (
        <div className="success editProfile__error">
          {showMessage}
        </div>
      )}

      <Form onSubmit={onProfileEdited} render={({handleSubmit}) => (
        <form
          onSubmit={handleSubmit}
          className="editProfile__form editProfileForm">

          <div className="editProfileForm__content">

            <div className="editProfileForm__column">
              <Field name="avatar">
                {({input: {value, onChange, ...input}}) => {
                  const handleChange = ({target}) => {
                    onChange(target.files)
                    const description = target.files[0] ? target.files[0].name : 'no'
                    setPhotoDescr(`Photo: ${description}`)
                  }
                  return (
                    <input
                      ref={onClickAddAvatar}
                      onChange={handleChange}
                      {...input}
                      type="file"
                      className="hidden"
                    />
                  )
                }}
              </Field>
              <Field name="name">
                {({input}) => <input {...input} type="text" placeholder="Аты" className="editProfileForm__input"/>}
              </Field>
              <Field name="surname">
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
                    options={options}
                  />
                )}
              />
            </div>
            <div className="editProfileForm__column">
              <Field name="email">
                {({input}) => <input {...input} name="email" type="text" placeholder="E-mail"
                                     className="editProfileForm__input"/>}
              </Field>
              <Field name="phone">
                {({input}) => <input {...input} type="text" placeholder="Тел. нөмірі"
                                     className="editProfileForm__input"/>}
              </Field>
              <Field name="iin">
                {({input}) => <input {...input} type="text" placeholder="ЖСН" className="editProfileForm__input"/>}
              </Field>
              <Field name="user_name">
                {({input}) => <input {...input} type="text" placeholder="ТЖК" className="editProfileForm__input"/>}
              </Field>
              <Field name="parentPhone">
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
          />

          <div className="editProfileForm__wrapper">
            <button type="submit" className="editProfileForm__button">Сақтау</button>
          </div>

        </form>
      )}/>
    </>
  } else if (type === 'teacher' || type === 'mentor') {
    form = (
      <Form
        onSubmit={onProfileEdited}
        render={({handleSubmit}) => (<form onSubmit={handleSubmit} className="editProfile__form editProfileForm">

          <div className="editProfileForm__content">

            <div className="editProfileForm__column">
              <input type="text" placeholder="Аты" className="editProfileForm__input"/>
              <input type="text" placeholder="ЖОО" className="editProfileForm__input"/>
              <input type="text" placeholder="E-mail" className="editProfileForm__input"/>
              <input type="text" placeholder="Пәні" className="editProfileForm__input"/>
            </div>
            <div className="editProfileForm__column">
              <input type="text" placeholder="Тегі" className="editProfileForm__input"/>
              <input type="text" placeholder="Мамандық" className="editProfileForm__input"/>
              <input type="text" placeholder="Тел. нөмірі" className="editProfileForm__input"/>
              <div className="editProfile__buttons" style={{textAlign: 'right'}}>
                <button className="editProfile__teacherBtn editProfile__btn editProfile__deletePhoto">Суретті өшіру
                </button>
                <button className="editProfile__teacherBtn editProfile__btn editProfile__addPhoto">Сурет жүктеу</button>
              </div>
            </div>

          </div>

          <textarea placeholder="Өзім туралы ..." className="editProfileForm__textHolder"/>


          <div className="editProfileForm__wrapper">
            <button className="editProfileForm__button">Сақтау</button>
          </div>

        </form>)}
      />
    )
  }

  return (
    <section className="editProfile">
      {form}
    </section>
  )
}


export default EditProfile
