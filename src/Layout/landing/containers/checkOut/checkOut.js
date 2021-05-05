import React, {useEffect, useState} from 'react'
import MySelect from '../../../general/component/mySelect/mySelect'
import {Transition} from 'react-transition-group'
import {Translate} from 'react-translated'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import kaspiBank from '../../../../images/landing/checkBoxes/bankKaspi.svg'
import bankCard from '../../../../images/landing/checkBoxes/bankCard.svg'
import roundAdd from '../../../../images/landing/checkBoxes/roundAdd.svg'
import {createPayment} from '../../../../request/apiPayment'
import ThingCard from '../../components/ThingCard/ThingCard'
import Payment from '../payment/payment'
import {isEmpty} from '../../../../scripts/isEmpty/isEmpty'
import {getCoursesForPrices} from '../../../../request/apiPrices'
import Loader from '../../../general/component/loader/loader'
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
        <span className="subOverlayBtn__text"><Translate text="Қосу"/></span>
      </button>
    </div>
  )
}

function combinationsToOption(combination) {
  return Object.keys(combination)
    .map(item => ({
      label: `${combination[item][0].content.title} - ${combination[item][1].content.title}`,
      option: item,
      courses: combination[item].map(course => {
        let cover = course.content.metas.find(meta => meta.option === 'cover') || null
        if (cover) {
          cover = cover.value
        }

        return {
          relationId: course.relation_id,
          id: course.content_id,
          title: course.content.title,
          img: cover
        }
      })
    }))
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
            <span className="about__column"><Translate text="Бейіндік:"/></span>
            <span className="about__column">{textSelectCourses}</span>
          </p>
        ) : null
      }
      {
        type !== 'profs' ? (
          <p className="about__row">
            <span className="about__column"><Translate text="Негізгі:"/></span>
            <span className="about__column">{textMainCourses}</span>
          </p>
        ) : null
      }
      <p className="about__row">
        <span className="about__column"><Translate text="Жалпы сомма:"/></span>
        <span className="about__column">{price}₸</span>
        <input className="hidden" readOnly type="text" name="price" value={price}/>
      </p>
    </div>
  )
}

function CloseButton({show})  {

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
  {label: 'Қазақша', option: 'kz'},
  {label: 'Русский', option: 'ru'},
]


const CheckOut = ({type, show, info}) => {
  const [typeState, setTypeState] = useState(null)
  const [showResults, setShowResults] = useState({show: false, card: null, data: null})
  const [langOption, setLangOption] = useState(selectsLangs[0])
  const [currentCourses, setCurrentCourses] = useState(null)
  const [coursesSelect, setCoursesSelect] = useState(null)
  const [currentCoursesSelect, setCurrentCoursesSelect] = useState({label: 'default', option: 'default', courses: null})
  const [isError, setIsError] = useState(null)
  const [courses, setCourses] = useState(null)



  useEffect(() => {

    console.log('coursesSelect', coursesSelect)

  },[coursesSelect])


  const onLoadPrices = () => getCoursesForPrices()
    .then(res => {

      if (!res.error && +res.data.status === 1) {
        const {data} = res.data
        if (
          !data.kz.combinations ||
          !data.kz.main ||
          !data.ru.combinations ||
          !data.ru.main
        ) {
          setIsError('we do not have yet any courses')
        } else {
          const resCurrentCourse = data[langOption.option]
          const courses = combinationsToOption(resCurrentCourse.combinations)
          setCourses(data)
          setCurrentCourses(resCurrentCourse)
          setCurrentCoursesSelect({
            courses: courses[0].courses,
            label: courses[0].label,
            option: courses[0].option
          })
        }
      }
    })


  useEffect(() => {

    onLoadPrices()
      .catch(err => {
        console.log('err', err)
      })

    // eslint-disable-next-line
  }, [])

  useEffect(() => {

    if (info.show) {
      scrollBodyHandler.lock()
    }

    return () => {
      scrollBodyHandler.unLock()
      setShowResults({show: false, card: null, data: null})
    }
  }, [info])

  useEffect(() => {

    if (type) {
      setTypeState(type)
    }

  }, [type])

  useEffect(() => {
    if (courses) {
      setCurrentCourses(courses[langOption.option])
    }
  }, [langOption, courses])

  useEffect(() => {
    if (!isEmpty(currentCourses)) {
      const courses = combinationsToOption(currentCourses.combinations)
      setCoursesSelect(courses)
    }
  }, [currentCourses])

  useEffect(() => {

    if (coursesSelect && coursesSelect.length) {

      setCurrentCoursesSelect({
        courses: coursesSelect[0].courses,
        label: coursesSelect[0].label,
        option: coursesSelect[0].option
      })
    }

  }, [coursesSelect])


  const onFormSubmit = (event) => {
    event.preventDefault()
    const bank = event.target.card.checked ? 'credit' : 'kaspi'
    const sum = event.target.price.value
    const order_type = event.target.type.value
    const relationId = event.target.relationId.value
    const lang = event.target.lang.value
    const data = {bank, sum, order_type, relation_id: relationId}

    createPayment(data)
      .then(res => {

        if (+res.data.status === 1) {
          const mainCourses = typeState === 'combo'
            ? currentCourses.main.map(course => course.content.title).join(', ')
            : null

          setShowResults({show: true, card: bank, data: {...res.data.data, lang, mainCourses}})
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
    formInfo.title = <Translate text="Негізгі пәндер"/>
    formInfo.subTitle = '3 пәнге/6 айға'
    formInfo.color = '#6CA04A'
    formInfo.price = 22990
  }
  if (typeState === 'profs') {
    formInfo.title = <Translate text='Бейіндік пәндер'/>
    formInfo.subTitle = '2 пәнге/6 айға'
    formInfo.color = '#3EC1EB'
    formInfo.price = 27990
  }
  if (typeState === 'combo') {
    formInfo.title = 'COMBO'
    formInfo.subTitle = '5 пәнге/6 айға'
    formInfo.color = '#FD6CA3'
    formInfo.price = 50980
  }

  const relationId = () => {
    if (!currentCourses.main && !currentCourses.main[0]) return setIsError('we do not have main courses')
    if (!currentCoursesSelect.courses &&
      !currentCoursesSelect.courses[0]) return setIsError('we do not have your choose courses')

    const mainRelId = currentCourses.main[0]
      ? currentCourses.main[0].relation_id
      : null
    const combinationRelId = currentCoursesSelect.courses[0]
      ? currentCoursesSelect.courses[0].relationId
      : null

    if (typeState === 'main') {
      return mainRelId
    } else if (typeState === 'profs' || typeState === 'combo') {
      return combinationRelId
    }

    return 0
  }

  // console.log('relationId', relationId())


  if (!courses || !currentCoursesSelect.courses || !currentCourses) {
    return <Loader container/>
  }

  return (
    <Transition unmountOnExit in={info.show} timeout={500}>
      {state => (
        <div
          style={{...defaultStyle, ...transitionStyles[state]}}
          className="checkOut__wrapper">

          <div className="checkOut">
            <h1 className="checkOut__title">
              <span><Translate text="ТӨЛЕМ ЖАСАУ"/></span>
              <CloseButton show={show}/>
            </h1>

            <div className="checkOut__body default-scroll">

              {
                !showResults.show
                  ? <div className="checkOut__content">
                    <div className="checkOut__column">
                      <h2 className="checkOut__courseTitle"><Translate text="Пәндерді таңдаңыз"/></h2>
                    </div>
                    <div className="checkOut__column"/>
                    <div className="checkOut__column">
                      <div className="checkOut-select__wrapper checkOut-subject__content">
                        <div className="checkOut-select__input checkOut-select__short">
                          <MySelect
                            value={langOption}
                            options={selectsLangs}
                            placeholder="Курс тілі"
                            onChange={onLangSelectChange}
                          />
                        </div>

                        <div className="checkOut-select__input checkOut-select__long">
                          <MySelect
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

                    {
                      currentCourses && !isEmpty(currentCourses.main)
                        ? (
                          <div className="checkOut__column">
                            <h2 className="checkOut__subTitle"><Translate text="Негізгі пәндер"/></h2>

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
                                  let cover = item.content.metas.find(meta => meta.option === 'cover') || null

                                  if (cover) {
                                    cover = cover.value
                                  }

                                  return (
                                    <ThingCard key={index} course={{
                                      title: item.content.title,
                                      img: cover,
                                      id: item.content_id
                                    }}/>
                                  )
                                }) : null
                              }

                            </div>

                          </div>
                        )
                        : null
                    }


                    {
                      currentCourses && currentCourses.main
                        ? (
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
                                  lang: langOption.option,
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
                                  <h3 className="checkOut-side__checkTitle"><Translate text="Төлем түрін таңдаңыз"/></h3>

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

                          <span className="bank__text"><Translate text="Банк картасы"/> </span>
                        </span>

                      </span>
                                  </label>
                                </div>

                                {
                                  isError ? (
                                    <div className="error__middle text-center margin__button2">{isError}</div>
                                  ) : null
                                }

                                <button className="checkOut-side__btn btn__shadowFromNull">
                                  <span>{formInfo.price} ₸</span>
                                  <span><Translate text="ТӨЛЕМ ЖАСАУ"/></span>
                                </button>
                              </div>

                            </div>
                          </form>
                        )
                        : null
                    }
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
