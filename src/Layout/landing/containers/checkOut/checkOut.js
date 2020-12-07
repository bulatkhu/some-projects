import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {Transition} from 'react-transition-group'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import kaspiBank from '../../../../images/landing/checkBoxes/bankKaspi.svg'
import bankCard from '../../../../images/landing/checkBoxes/bankCard.svg'
import roundAdd from '../../../../images/landing/checkBoxes/roundAdd.svg'
import {createPayment} from '../../../../request/apiPayment'
import {SITE_BASE_URL} from '../../../../app.config'
import ThingCard from '../../components/ThingCard/ThingCard'
import Payment from '../payment/payment'
import './checkOut.scoped.scss'

function CoursesOverplay({text, onClick}) {

  return (
    <div onClick={onClick} className="checkOut-subject__overlay subOverlay">
      <p className="subOverlay__text">
        {text}
      </p>

      <button className="subOverlay__btn subOverlayBtn">

        <span className="subOverlayBtn__img">
          <img src={roundAdd} alt="roundAdd"/>
        </span>
        <span className="subOverlayBtn__text">Қосу</span>
      </button>
    </div>
  )
}

function combinationsToOption(combination) {

  const options = Object.keys(combination).map(item => ({
    label: `${combination[item][0].content.title} - ${combination[item][1].content.title}`,
    option: item,
    courses: combination[item].map(course => {
      const img = course.content.category.image ? SITE_BASE_URL + course.content.category.image : null

      return {
        relationId: course.relation_id,
        id: course.content_id,
        title: course.content.title,
        img
      }
    })
  }))

  return options
}

function genCoursesDescription({type, lang, main, selectCourses, price, title}) {
  const textSelectCourses = selectCourses.label.toString().split(' - ').join(', ')
  const textMainCourses = main.map(item => item.content.title).join(', ')

  return (
    <div className="about">
      <p className="about__row">
        <span className="about__column">Курс: </span>
        <span className="about__column">{title}</span>
        {type ? <input className="hidden" readOnly type="text" name="type" value={type}/> : null}
      </p>
      <p className="about__row">
        <span className="about__column">Тілі: </span>
        <span className="about__column">{lang === 'ru' ? 'Орысша' : 'Қазақша'}</span>
        <input className="hidden" readOnly type="text" name="lang" value={lang === 'ru' ? 'Орысша' : 'Қазақша'}/>
      </p>
      {
        type !== 'main' ? (
          <p className="about__row">
            <span className="about__column">Бейіндік: </span>
            <span className="about__column">{textSelectCourses}</span>
          </p>
        ) : null
      }
      {
        type !== 'profs' ? (
          <p className="about__row">
            <span className="about__column">Негізгі:</span>
            <span className="about__column">{textMainCourses}</span>
          </p>
        ) : null
      }
      <p className="about__row">
        <span className="about__column">Жалпы сомма: </span>
        <span className="about__column">{price}₸</span>
        <input className="hidden" readOnly type="text" name="price" value={price}/>
      </p>
    </div>
  )
}

function CloseButton({show}) {

  return (
    <span onClick={() => show({show: false, id: null})} className="close">
      <span className="close__relative">
        <span/>
        <span/>
      </span>
    </span>
  )
}

const defaultStyle = {
  transition: `opacity 500ms ease`,
  opacity: 0,
}

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
}

const selectsLangs = [
  {label: 'kz', option: 'kz'},
  {label: 'ru', option: 'ru'},
]


const CheckOut = ({type, show, info, courses}) => {
  const [typeState, setTypeState] = useState(null)
  const [showResults, setShowResults] = useState({show: false, card: null, data: null})
  const [langOption, setLangOption] = useState(selectsLangs[0])
  const [currentCourses, setCurrentCourses] = useState(courses[selectsLangs[0]])
  const [coursesSelect, setCoursesSelect] = useState(null)
  const [currentCoursesSelect, setCurrentCoursesSelect] = useState({label: 'default', option: 'default', courses: null})
  const [isError, setIsError] = useState(null)


  useEffect(() => {

    if (info.show) {
      scrollBodyHandler.lock()
    }

    return () => {
      scrollBodyHandler.unLock()
      setShowResults({show: false, card: null, data: null})
    }
  },[info])

  useEffect(() => {

    if (type) {
      setTypeState(type)
    }

  },[type])


  useEffect(() => {
    if (courses) {
      setCurrentCourses(courses[langOption.option])
    }
  },[langOption, courses])


  useEffect(() => {
    if (currentCourses) {
      const courses = combinationsToOption(currentCourses.combinations)

      setCoursesSelect(courses)

    }
  },[currentCourses])

  useEffect(() => {

    console.log('currentCoursesSelect', currentCoursesSelect)


  },[currentCoursesSelect])


  useEffect(() => {

    if (coursesSelect) {

      setCurrentCoursesSelect({
        courses: coursesSelect[0].courses,
        label: coursesSelect[0].label,
        option: coursesSelect[0].option
      })
    }

  },[coursesSelect])


  const onFormSubmit = (event) => {
    event.preventDefault()
    const bank = event.target.card.checked ? 'credit' : 'kaspi'
    const sum = event.target.price.value
    const order_type = event.target.type.value
    const relationId = event.target.relationId.value
    const lang = event.target.lang.value


    const data = { bank, sum, order_type, relation_id: relationId }

    createPayment(data)
      .then(res => {

        if (+res.data.status === 1) {

          setShowResults({show: true, card: bank, data: {...res.data.data, lang}})
          setIsError(null)

        } else if (res.data.status === 401) {
          setIsError(res.data.error)
        } else {

          setIsError(res.data.error)
        }
      })
  }

  const onLangSelectChange = option => {
    setLangOption(option)
    setCurrentCourses(courses[option.option])
  }

  const onCourseSelect = option => {
    setCurrentCoursesSelect(option)
  }

  let formInfo = {
    title: '',
    subTitle: '',
    color: '#6CA04A',
    price: '0'
  }

  if (typeState === 'main') {
    formInfo.title = 'Негізгі пәндер'
    formInfo.subTitle = '3 пәнге/6 айға'
    formInfo.color = '#6CA04A'
    formInfo.price = 22990
  }
  if (typeState === 'profs') {
    formInfo.title = 'Бейіндік пәндер'
    formInfo.subTitle = '2 пәнге/6 айға'
    formInfo.color = '#3EC1EB'
    formInfo.price = 27990
  }
  if (typeState === 'combo') {
    formInfo.title = 'COMBO'
    formInfo.subTitle = '5 пәнге/6 айға'
    formInfo.color = '#FD6CA3'
    formInfo.price = 44990
  }

  const relationId = () => {
    const mainRelId = currentCourses.main[0].relation_id
    const combinationRelId = currentCoursesSelect.courses[0].relationId

    if (typeState === 'main') {
      return mainRelId
    } else if (typeState === 'profs' || typeState === 'combo') {
      return combinationRelId
    }

    return 0
  }

  return (
    <Transition unmountOnExit in={info.show} timeout={500}>
      {state => (
        <div
          style={{...defaultStyle, ...transitionStyles[state]}}
          className="checkOut__wrapper">

          <div className="checkOut">
            <h1 className="checkOut__title">
              <span>ТӨЛЕМ ЖАСАУ</span>
              <CloseButton show={show}/>
            </h1>

            <div className="checkOut__body">

              {
                !showResults.show
                  ? <div className="checkOut__content">
                    <div className="checkOut__column">
                      <h2 className="checkOut__courseTitle">Пәндерді таңдаңыз</h2>
                    </div>
                    <div className="checkOut__column"/>
                    <div className="checkOut__column">
                      <div className="checkOut-select__wrapper checkOut-subject__content">
                        <div className="checkOut-select__input checkOut-select__short">
                          <Select
                            value={langOption}
                            options={selectsLangs}
                            placeholder="Курс тілі"
                            onChange={onLangSelectChange}
                          />
                        </div>

                        <div className="checkOut-select__input checkOut-select__long">
                          <Select
                            value={currentCoursesSelect}
                            options={coursesSelect}
                            onChange={onCourseSelect}
                            isDisabled={typeState === 'main'}
                            placeholder="Бейіндік пән"
                          />
                        </div>
                      </div>
                      <div className="checkOut-subject__content">
                        {
                          typeState === 'main'
                            ? <CoursesOverplay
                                onClick={() => {
                                  setTypeState('combo')
                                  console.log('go to combo')
                                }}
                                text="Бейіндік пәндерді қосу арқылы 5 990₸ эконом жасаңыз. "
                              />
                            : null
                        }

                        {
                          currentCoursesSelect.courses ? (
                            currentCoursesSelect.courses.map((item, key) => (
                              <ThingCard key={key} course={{
                                title: item.label || item.title,
                                id: item.id,
                                img: item.img
                              }}/>
                            ))
                          ) : null
                        }

                      </div>

                    </div>

                    <div className="checkOut__column">
                      <h2 className="checkOut__subTitle">Негізгі пәндер</h2>

                      <div className="checkOut-subject__content checkOut-subject__subContent">

                        {
                          typeState === 'profs'
                            ? <CoursesOverplay
                                onClick={() => setTypeState('combo')}
                                text="Негізгі пәндерді қосу арқылы 5 990₸ эконом жасаңыз. "
                              />
                            : null
                        }


                        {
                          currentCourses ? currentCourses.main.map((item, index) => {

                            return (
                              <ThingCard key={index} course={{
                                title: item.content.title,
                                img: item.content.category.image,
                                id: item.content_id
                              }}/>
                            )
                          }) : null
                        }

                      </div>

                    </div>
                    <form onSubmit={onFormSubmit} className="checkOut__column checkOut-side">
                      <div className="checkOut-side__body">

                        <h2 className="checkOut-side__title" style={{background: formInfo.color}}>
                          <span>{formInfo.title}</span>
                          <span>{formInfo.subTitle}</span>
                        </h2>

                        <div className="checkOut-side__wrapper">

                          {genCoursesDescription({
                            type: typeState,
                            main: currentCourses.main,
                            selectCourses: currentCoursesSelect,
                            lang: langOption.label,
                            price: formInfo.price,
                            title: formInfo.title
                          })}

                          <input
                            value={relationId()}
                            type="text"
                            name="relationId"
                            readOnly
                            className="hidden"
                          />

                          <div className="checkOut-side__checkBoxes">
                            <h3 className="checkOut-side__checkTitle">Төлем түрін таңдаңыз</h3>

                            <label className="checkOut-side__label" htmlFor="kaspi">
                              <span className="bank">
                                <span className="bank__content">
                                  <input
                                    className="checkOut-side__input"
                                    name="kaspi"
                                    id="kaspi"
                                    type="radio"
                                    required
                                  />
                                  <span className="checkOut-side__checkMark"/>

                                  <span className="bank__img">
                                    <img src={kaspiBank} alt="kaspi"/>
                                  </span>

                                  <span className="bank__text">Kaspi.kz  </span>
                                </span>

                              </span>
                            </label>
                            <label className="checkOut-side__label" htmlFor="card">
                             <span className="bank">
                        <span className="bank__content">
                           <input
                             className="checkOut-side__input"
                             name="kaspi"
                             id="card"
                             type="radio"
                             required
                           />
                         <span className="checkOut-side__checkMark"/>


                          <span className="bank__img">
                            <img src={bankCard} alt="card"/>
                          </span>

                          <span className="bank__text">Банк картасы </span>
                        </span>

                      </span>
                            </label>
                          </div>

                          {
                            isError ? (
                              <div className="error__big text-center">{isError}</div>
                            ) : null
                          }

                          <button className="checkOut-side__btn btn__shadowFromNull">
                            <span>{formInfo.price} ₸</span>
                            <span>Төлем жасау</span>
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>
                  : showResults.card === 'kaspi'
                    ? <Payment data={showResults.data} type="kaspi"/>
                    : <Payment data={showResults.data} type="credit"/>
              }

            </div>

          </div>
        </div>
      )}
    </Transition>
  )
}

export default CheckOut
