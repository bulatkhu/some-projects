import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {Transition} from 'react-transition-group'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
// import subjectIMG1 from '../../../../images/general/courses/tab-thing1.jpg'
// import subjectIMG2 from '../../../../images/general/courses/tab-thing2.jpg'
// import Stars from '../../../general/stars/stars'
import kaspiBank from '../../../../images/landing/checkBoxes/bankKaspi.svg'
import bankCard from '../../../../images/landing/checkBoxes/bankCard.svg'
import roundAdd from '../../../../images/landing/checkBoxes/roundAdd.svg'
import ThingCard from '../../components/ThingCard/ThingCard'
import {isEmpty} from '../../../../scripts/isEmpty/isEmpty'
import './checkOut.scoped.scss'
import {createPayment} from '../../../../request/apiPayment'

function CoursesOverplay() {

  return (
    <div className="checkOut-subject__overlay subOverlay">
      <p className="subOverlay__text">
        Негізгі пәндерді қосу арқылы 5 990₸ эконом жасаңыз.
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

function genCoursesDescription(type) {

  if (type === 'combo') {
    return (
      <div className="about">
        <p className="about__row">
          <span className="about__column">Курс: </span>
          <span className="about__column">COMBO</span>
          <input className="hidden" readOnly type="text" name="type" value={type}/>
        </p>
        <p className="about__row">
          <span className="about__column">Тілі: </span>
          <span className="about__column">Қазақша</span>
        </p>
        <p className="about__row">
          <span className="about__column">Бейіндік: </span>
          <span className="about__column">Физика Математика</span>
        </p>
        <p className="about__row">
          <span className="about__column">Негізгі:</span>
          <span className="about__column">Оқу сауаттылығы
          Математикалық сауаттылық Қазақстан тарихы</span>
        </p>
        <p className="about__row">
          <span className="about__column">Жалпы сомма: </span>
          <span className="about__column">44 990₸</span>
          <input className="hidden" readOnly type="text" name="price" value="44990"/>
        </p>
      </div>
    )
  } else if (type === 'main') {
    return (
      <div className="about">
        <p className="about__row">
          <span className="about__column">Курс: </span>
          <span className="about__column">Негізгі пәндер</span>
          <input className="hidden" readOnly type="text" name="type" value={type}/>
        </p>
        <p className="about__row">
          <span className="about__column">Тілі: </span>
          <span className="about__column">Қазақша</span>
        </p>
        <p className="about__row">
          <span className="about__column">Бейіндік: </span>
          <span className="about__column">Физика Математика</span>
        </p>
        <p className="about__row">
          <span className="about__column">Негізгі:</span>
          <span className="about__column">Оқу сауаттылығы
          Математикалық сауаттылық Қазақстан тарихы</span>
        </p>
        <p className="about__row">
          <span className="about__column">Жалпы сомма: </span>
          <span className="about__column">22 990₸</span>
          <input className="hidden" readOnly type="text" name="price" value="22990"/>
        </p>
      </div>
    )
  } else if (type === 'optional') {
    return (
      <div className="about">
        <p className="about__row">
          <span className="about__column">Курс: </span>
          <span className="about__column">Бейіндік пәндер</span>
          <input className="hidden" readOnly type="text" name="type" value="profs"/>
        </p>
        <p className="about__row">
          <span className="about__column">Тілі: </span>
          <span className="about__column">Қазақша</span>
        </p>
        <p className="about__row">
          <span className="about__column">Бейіндік: </span>
          <span className="about__column">Физика Математика</span>
        </p>
        <p className="about__row">
          <span className="about__column">Негізгі:</span>
          <span className="about__column">Оқу сауаттылығы
          Математикалық сауаттылық Қазақстан тарихы</span>
        </p>
        <p className="about__row">
          <span className="about__column">Жалпы сомма: </span>
          <span className="about__column">27 990₸</span>
          <input className="hidden" readOnly type="text" name="price" value="27990"/>
        </p>
      </div>
    )
  }

  return (
    <div className="about">
      <p className="about__row">
        <span className="about__column">Курс: </span>
        <span className="about__column">COMBO</span>
        <input className="hidden" readOnly type="text" name="type" value={type}/>
      </p>
      <p className="about__row">
        <span className="about__column">Тілі: </span>
        <span className="about__column">Қазақша</span>
      </p>
      <p className="about__row">
        <span className="about__column">Бейіндік: </span>
        <span className="about__column">Физика Математика</span>
      </p>
      <p className="about__row">
        <span className="about__column">Негізгі:</span>
        <span className="about__column">Оқу сауаттылығы
          Математикалық сауаттылық Қазақстан тарихы</span>
      </p>
      <p className="about__row">
        <span className="about__column">Жалпы сомма: </span>
        <span className="about__column">44 990₸</span>
        <input className="hidden" readOnly type="text" name="price" value="44990"/>
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

const options = [
  {label: 2021, value: 2021},
  {label: 2020, value: 2020},
  {label: 2019, value: 2019},
  {label: 2018, value: 2018},
  {label: 2017, value: 2017}
]

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


const CheckOut = ({type, show, info, rowCourses, combinations}) => {
  const [showResults, setShowResults] = useState({show: false, card: null})
  const [combinationsLabel, setCombinationsLabel] = useState([])
  const [selectedOption, setSelectedOption] = useState([])

  useEffect(() => {

    if (info.show) {
      scrollBodyHandler.lock()
    }

    return () => {
      scrollBodyHandler.unLock()
      setShowResults({show: false, card: null})
      setSelectedOption(null)
    }
  }, [info, rowCourses])

  useEffect(() => {

    if (combinations) {

      const options = Object
        .keys(combinations)
        .map(item => {
          const label = `${combinations[item][0].content.title} - ${combinations[item][1].content.title}`
          const option = combinations[item][0].relation_id
          return {option, label, courses: [{...combinations[item][0]}, {...combinations[item][1]}]}
        })

      setCombinationsLabel(options)
    }

  }, [combinations])

  useEffect(() => {
    if (selectedOption && combinationsLabel) {

      // console.info('selectedOption', selectedOption)
      // console.info('combinationsLabel', combinationsLabel)
      // console.info('\n')

    }

  }, [selectedOption, combinationsLabel])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const bank = event.target.card.checked ? 'card' : 'kaspi'
    const sum = event.target.price.value
    const order_type = event.target.type.value
    const relationId = event.target.relationId.value


    const data = { bank, sum, order_type, relation_id: relationId }

    createPayment(data)
      .then(res => {

        console.info('res', res)

      })


    // console.log('sum', sum)
    // console.log('bank', bank)
    // console.log('orderType', order_type)
    // console.log('relationId', relationId)

    setShowResults({show: true, card: bank})
  }

  const onSelectChange = selectedOption => {
    setSelectedOption(selectedOption.courses)
  }

  let formInfo = {
    title: '',
    subTitle: '',
    color: '#6CA04A',
    price: '0'
  }

  if (type === 'main') {
    formInfo.title = 'Негізгі пәндер'
    formInfo.subTitle = '3 пәнге/6 айға'
    formInfo.color = '#6CA04A'
    formInfo.price = 22990
  }
  if (type === 'optional') {
    formInfo.title = 'Бейіндік пәндер'
    formInfo.subTitle = '2 пәнге/6 айға'
    formInfo.color = '#3EC1EB'
    formInfo.price = 27990
  }
  if (type === 'combo') {
    formInfo.title = 'COMBO'
    formInfo.subTitle = '5 пәнге/6 айға'
    formInfo.color = '#FD6CA3'
    formInfo.price = 44990
  }

  const relationId = () => {
    if (!selectedOption) {
      return combinationsLabel[0].courses[0].relation_id
    } else if (combinationsLabel.length) {
      return selectedOption[0].relation_id
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
                            options={options}
                            placeholder="Курс тілі"
                          />
                        </div>

                        <div className="checkOut-select__input checkOut-select__long">
                          <Select
                            value={combinationsLabel[0]}
                            options={combinationsLabel}
                            onChange={onSelectChange}
                            placeholder="Бейіндік пән"
                          />
                        </div>
                      </div>
                      <div className="checkOut-subject__content">
                        {
                          type === 'main' && (!isEmpty(selectedOption) || !isEmpty(combinations))
                            ? <CoursesOverplay/>
                            : null
                        }

                        {
                          !isEmpty(combinations) && isEmpty(selectedOption) && (
                            combinations[Object
                              .keys(combinations)
                              .find((item, index) => {
                                if (index === 0) {
                                  return item
                                }
                                return null
                              })].map((item, index) => (
                              <ThingCard key={index} course={{
                                id: item.content_id,
                                img: item.img,
                                title: item.title || item.content.title,
                              }}/>
                            ))
                          )
                        }

                        {
                          !isEmpty(selectedOption) && (
                            selectedOption.map((item, index) => (
                              <ThingCard key={index} course={{
                                id: item.content_id,
                                img: item.img,
                                title: item.title || item.content.title,
                              }}/>
                            ))
                          )
                        }

                      </div>

                    </div>

                    <div className="checkOut__column">
                      <h2 className="checkOut__subTitle">Негізгі пәндер</h2>

                      <div className="checkOut-subject__content checkOut-subject__subContent">

                        {
                          type === 'optional' && !isEmpty(rowCourses)
                            ? <CoursesOverplay/>
                            : null
                        }


                        {!isEmpty(rowCourses) &&
                        rowCourses.map((item, index) => (
                          <ThingCard key={index} course={{
                            id: item.content_id,
                            img: item.img,
                            title: item.title || item.content.title,
                          }}/>
                        ))}
                      </div>

                    </div>
                    <form onSubmit={onFormSubmit} className="checkOut__column checkOut-side">
                      <div className="checkOut-side__body">

                        <h2 className="checkOut-side__title" style={{background: formInfo.color}}>
                          <span>{formInfo.title}</span>
                          <span>{formInfo.subTitle}</span>
                        </h2>

                        <div className="checkOut-side__wrapper">

                          {genCoursesDescription(type)}

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

                          <button className="checkOut-side__btn btn__shadowFromNull">
                            <span>44 990 ₸</span>
                            <span>Төлем жасау</span>
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>
                  : showResults.card
                    ? <div className="results">
                        <div className="results__info textLeft">
                          <p className="results__content"><span className="results__column">Тапсырыс нөмірі: </span>
                            <span className="results__column"><span className="results__amount">789 521</span></span></p>
                          <p className="results__content"><span className="results__column">ҰБТ-ға дайындық курсы: </span>
                            <span className="results__column">COMBO</span></p>
                          <p className="results__content"><span className="results__column">Курс тілі: </span>
                            <span className="results__column">Қазақша</span></p>
                          <p className="results__content"><span className="results__column">Бейіндік пәндер: </span>
                            <span className="results__column">Физика <br/> Математика</span></p>
                          <p className="results__content"><span className="results__column">Негізгі пәндер: </span>
                            <span className="results__column">Оқу сауаттылығы <br/> Математикалық сауаттылық  <br/> Қазақстан тарихы</span>
                          </p>
                          <p className="results__content"><span className="results__column">Төленген сомма:</span>
                            <span className="results__column">34 990₸</span></p>
                          <p className="results__content"><span className="results__column">Төлем түрі: </span>
                            <span className="results__column">{!showResults.card ? 'Kaspi.kz' : 'card'}</span></p>
                        </div>

                        <p className="text-center results__description">*Түбіртек “Төлемдер” бөлімінде сақталды.</p>
                      </div>
                    : <div className="results">

                        <div className="results__info">
                          <p className="results__content"><span className="results__column">Тапсырыс нөмірі: </span>
                            <span className="results__column"><span className="results__amount active">789 521</span></span>
                          </p>
                          <p className="results__content"><span className="results__column">ҰБТ-ға дайындық курсы: </span>
                            <span className="results__column">COMBO</span></p>
                          <p className="results__content"><span className="results__column">Курс тілі: </span>
                            <span className="results__column">Қазақша</span></p>
                          <p className="results__content"><span className="results__column">Бейіндік пәндер: </span>
                            <span className="results__column">Физика <br/> Математика</span></p>
                          <p className="results__content"><span className="results__column">Негізгі пәндер: </span>
                            <span className="results__column">Оқу сауаттылығы <br/> Математикалық сауаттылық  <br/> Қазақстан тарихы</span>
                          </p>
                          <p className="results__content"><span className="results__column">Оқу ақысы: </span>
                            <span className="results__column">44 990₸</span></p>
                          <p className="results__content"><span className="results__column">Төлем түрі: </span>
                            <span className="results__column">{!showResults.card ? 'Kaspi.kz' : 'card'}</span></p>
                        </div>

                        <div className="results__block resultsBlock">

                          <div className="resultsBlock__wrapper">
                            <h3 className="resultsBlock__title">«Kaspi.kz» телефон қосымшасы арқылы төлем жасау.</h3>

                            <p className="resultsBlock__text">1. Ұялы телефоныңыздан «Kaspi.kz» қосымшасына кіріңіз.</p>
                            <p className="resultsBlock__text">2. «Платежи» бөліміне өтіп, іздеу жолағына «Educon» деп
                              теріңіз.</p>
                            <p className="resultsBlock__text">3. «Номер заказа» жолағына сізге берілген тапсырыс нөмірін
                              енгізіп, «Продолжить» батырмасын басыңыз.</p>
                          </div>

                          <div className="resultsBlock__wrapper">
                            <h3 className="resultsBlock__title">«Kaspi.kz» сайты арқылы төлем жасау. </h3>

                            <p className="resultsBlock__text">1. <a rel="noopener noreferrer" target="_blank"
                                                                    style={{color: '#329DFF'}}
                                                                    href="https://kaspi.kz/">«Kaspi.kz»</a> сайтына кіріңіз.
                            </p>
                            <p className="resultsBlock__text">2. «Платежи» бөліміне өтіп, іздеу жолағына «Educon» деп
                              теріңіз.</p>
                            <p className="resultsBlock__text">3. «Номер заказа» жолағына сізге берілген тапсырыс нөмірін
                              енгізіп, «Продолжить» батырмасын басыңыз.</p>
                          </div>

                        </div>

                      </div>
              }

            </div>

          </div>
        </div>
      )}
    </Transition>
  )
}

export default CheckOut
