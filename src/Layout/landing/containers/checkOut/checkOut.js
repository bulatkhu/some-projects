import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {Transition} from 'react-transition-group'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import subjectIMG1 from '../../../../images/general/courses/tab-thing1.jpg'
import subjectIMG2 from '../../../../images/general/courses/tab-thing2.jpg'
// import Stars from '../../../general/stars/stars'
import kaspiBank from '../../../../images/landing/checkBoxes/bankKaspi.svg'
import bankCard from '../../../../images/landing/checkBoxes/bankCard.svg'
import roundAdd from '../../../../images/landing/checkBoxes/roundAdd.svg'
import ThingCard from '../../components/ThingCard/ThingCard'
import './checkOut.scoped.scss'

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

function genCoursesDescription(id) {

  if (id === 0) {
    return (
      <div className="about">
        <p className="about__row">
          <span className="about__column">Курс: </span>
          <span className="about__column">COMBO</span>
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
        </p>
      </div>
    )
  } else if (id === 1) {
    return (
      <div className="about">
        <p className="about__row">
          <span className="about__column">Курс: </span>
          <span className="about__column">COMBO</span>
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
        </p>
      </div>
    )
  } else if (id === 2) {
    return (
      <div className="about">
        <p className="about__row">
          <span className="about__column">Курс: </span>
          <span className="about__column">COMBO</span>
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
        </p>
      </div>
    )
  }
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


const CheckOut = ({show, info, courses}) => {
  const [showResults, setShowResults] = useState({show: false, card: null})
  useEffect(() => {
    if (info.show) {
      scrollBodyHandler.lock()
    }

    return () => {
      scrollBodyHandler.unLock()
      setShowResults({show: false, card: null})
    }
  }, [info, courses])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const card = event.target.card.checked

    setShowResults({show: true, card})

    console.log('type', `
       card: ${card},
    `)
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
                            options={options}
                            placeholder="Бейіндік пән"
                          />
                        </div>
                      </div>
                      <div className="checkOut-subject__content">
                        {
                          info.id === 0
                            ? <CoursesOverplay/>
                            : null
                        }

                        <ThingCard course={{
                          id: 0,
                          img: subjectIMG1,
                          title: 'ФИЗИКА',
                        }}/>
                        <ThingCard course={{
                          id: 0,
                          img: subjectIMG2,
                          title: 'МАТЕМАТИКА',
                        }}/>

                      </div>

                    </div>

                    <div className="checkOut__column">
                      <h2 className="checkOut__subTitle">Негізгі пәндер</h2>

                      <div className="checkOut-subject__content checkOut-subject__subContent">

                        {
                          info.id === 1
                            ? <CoursesOverplay/>
                            : null
                        }


                        {courses &&
                        courses.map((item, index) => (
                          <ThingCard key={index} course={{
                            id: item.content_id,
                            img: item.img,
                            title: item.title,
                          }}/>
                        ))
                        }
                      </div>

                    </div>
                    <form onSubmit={onFormSubmit} className="checkOut__column checkOut-side">
                      <div className="checkOut-side__body">

                        <h2 className="checkOut-side__title" style={{background: info.color}}>
                          <span>{info.title}</span>
                          <span>5 пәнге/6 айға</span>
                        </h2>

                        <div className="checkOut-side__wrapper">

                          {genCoursesDescription(info.id)}

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
                            <span className="results__column">Оқу сауаттылығы <br/> Математикалық сауаттылық  <br/> Қазақстан тарихы</span></p>
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
                        <span className="results__column"><span className="results__amount active">789 521</span></span></p>
                      <p className="results__content"><span className="results__column">ҰБТ-ға дайындық курсы: </span>
                        <span className="results__column">COMBO</span></p>
                      <p className="results__content"><span className="results__column">Курс тілі: </span>
                        <span className="results__column">Қазақша</span></p>
                      <p className="results__content"><span className="results__column">Бейіндік пәндер: </span>
                        <span className="results__column">Физика <br/> Математика</span></p>
                      <p className="results__content"><span className="results__column">Негізгі пәндер: </span>
                        <span className="results__column">Оқу сауаттылығы <br/> Математикалық сауаттылық  <br/> Қазақстан тарихы</span></p>
                      <p className="results__content"><span className="results__column">Оқу ақысы: </span>
                        <span className="results__column">44 990₸</span></p>
                      <p className="results__content"><span className="results__column">Төлем түрі: </span>
                        <span className="results__column">{!showResults.card ? 'Kaspi.kz' : 'card'}</span></p>
                    </div>

                    <div className="results__block resultsBlock">

                      <div className="resultsBlock__wrapper">
                        <h3 className="resultsBlock__title">«Kaspi.kz» телефон қосымшасы арқылы төлем жасау.</h3>

                        <p className="resultsBlock__text">1. Ұялы телефоныңыздан «Kaspi.kz» қосымшасына кіріңіз.</p>
                        <p className="resultsBlock__text">2. «Платежи» бөліміне өтіп, іздеу жолағына «Educon» деп теріңіз.</p>
                        <p className="resultsBlock__text">3. «Номер заказа» жолағына сізге берілген тапсырыс нөмірін енгізіп, «Продолжить» батырмасын басыңыз.</p>
                      </div>

                      <div className="resultsBlock__wrapper">
                        <h3 className="resultsBlock__title">«Kaspi.kz» сайты арқылы төлем жасау. </h3>

                        <p className="resultsBlock__text">1. <a  rel="noopener noreferrer"  target="_blank" style={{color: '#329DFF'}} href="https://kaspi.kz/">«Kaspi.kz»</a> сайтына кіріңіз.</p>
                        <p className="resultsBlock__text">2. «Платежи» бөліміне өтіп, іздеу жолағына «Educon» деп теріңіз.</p>
                        <p className="resultsBlock__text">3. «Номер заказа» жолағына сізге берілген тапсырыс нөмірін енгізіп, «Продолжить» батырмасын басыңыз.</p>
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
