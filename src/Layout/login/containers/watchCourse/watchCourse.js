import React, {useEffect, useRef, useState} from 'react'
import './watchCourse.scoped.scss'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import Stars from '../../../general/stars/stars';
import FlipBookComponent from '../../../general/flipBook/flipBookComp'
import Slider from 'react-slick'
import CanvasCircle from '../../components/CanvasCircle/CanvasCircle'

const playersProps = [
  {
    title: 'Функция',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 37, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 50, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 21, link: '/'},
    ]
  },
  {
    title: 'Термодинамика',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 1, link: '/'}
    ]
  },
  {
    title: 'Сандық сипаттамалар',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 14, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 28, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 99, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 99, link: '/'},
    ]
  },
  {
    title: 'Тригонометрия',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 12, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 32, link: '/'},
    ]
  }
]
const initialTestState = {
  showTest: false,
  startTest: false,
  time: 15,
  showResults: true,
}
const initialSliderItems = [
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 0,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', ],
    rightAnswer: 2,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 3,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 5,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 1,
    answer: null
  },{
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 0,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', ],
    rightAnswer: 2,
    answer: null
  },{
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 0,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', ],
    rightAnswer: 2,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 3,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 5,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 1,
    answer: null
  },{
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 0,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', ],
    rightAnswer: 2,
    answer: null
  },{
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 0,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', ],
    rightAnswer: 2,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 3,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 3,
    answer: null
  },
  {
    text: null,
    questions: [ 'Lorem Upson', 'Lorem Upson', 'Lorem Upson', 'Lorem Upson' ],
    rightAnswer: 3,
    answer: null
  },

]

function Course() {
  const [testState, changeTestState] = useState(initialTestState)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [testItems, setTestItems] = useState(initialSliderItems)

  const refCoursesButtons = useRef(null)
  const navSlider = useRef(null)
  const mainSlider = useRef(null)
  const navSliderWrapper = useRef(null)


  const onButtonClick = event => {
    event.target.classList.toggle('active')
    const panel = event.target.nextElementSibling
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px'
    }
  }

  const showTestHandler = (info, element) => {
    const $buttons = refCoursesButtons.current.querySelectorAll('.course-buttons__btn')
    $buttons.forEach(item => item.classList.remove('active'))
    changeTestState(prevState => ({
      ...prevState, showTest: info
    }))

    element.target.classList.add('active')
  }

  const handleTest = info => {
    if (info === 'start') {
      changeTestState(prev => ({
        ...prev, startTest: true
      }))
    } else if (info === 'showResults') {
      changeTestState(prev => ({
        ...prev,
        showResults: true
      }))
    }
  }


  useEffect(() => {

    if (testState.showResults) {
      setCurrentSlide(0)
    }

    if (currentSlide) {
      mainSlider.current.slickGoTo(currentSlide)
      navSlider.current.slickGoTo(currentSlide)
    }

  }, [testState, currentSlide])

  const navSliderHandler = info => {

    if (typeof info === 'string') {
      if (info === 'next') {
        navSlider.current.slickNext()
      } else if (info === 'prev') {
        navSlider.current.slickPrev()
      }
    } else if (info.target.dataset.id) {
      const {id} = info.target.dataset
      setCurrentSlide(id)
    }

  }

  const testSliderHandler = info => {
    if (info === 'next') {
      mainSlider.current.slickNext()
    } else if (info === 'prev') {
      mainSlider.current.slickPrev()
    }
  }

  const setAnswer = event => {
    if (event.target.dataset.answerid) {
      const answerInfo = JSON.parse(event.target.dataset.answerid)
      const curAnswer = testItems[answerInfo.questionId]
      curAnswer.answer = answerInfo.answerId
      setTestItems(prev => {

        prev[answerInfo.questionId] = curAnswer

        return [
          ...prev,
        ]
      })
    }
  }


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    button: false
  }

  const navSliderSettings = {
    slidesToShow: initialSliderItems.length > 18 ? 18 : initialSliderItems.length,
    speed: 500,
    infinite: false,
    slidesToScroll: 1,
    button: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 14,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 12,
        }
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 10,
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 6,
        }
      },
    ]
  }

  return (
    <section className="course">


      <div className="course__content">

        <div className="course__column">

          <div className="course-video">
            <div className="lesson__playerWrapper">
              <VideoPlayer
                className="lesson__video"
              />
            </div>
          </div>

          <div className="course-panel">
            <div className="course-panel__content">
              <div className="course-panel__column">
                <div className="course-panel__stars">
                  <Stars rating={4} classNameOfValue="hidden"/>
                </div>

                <div className="course-panel__text">Сіздің бағаңыз</div>
              </div>

              <div className="course-panel__column">

                <div ref={refCoursesButtons} className="course-buttons">
                  <div onClick={ev => showTestHandler(false, ev)} className="course-buttons__btn active">Сабақ</div>
                  <div onClick={ev => showTestHandler(true, ev)} className="course-buttons__btn">Тест</div>
                </div>

              </div>
            </div>

          </div>


        </div>

        {

          !testState.showResults
            ? !testState.startTest
              ? <div className="course__column course-book__column">
                {
                  !testState.showTest
                    ? <div className="course-book">

                      <h2 className="course-book__title">
                        Теориялық бөлім
                      </h2>

                      <FlipBookComponent/>

                    </div>
                    : <div className="course-start">

                      <h2 className="course-start__title course-book__title">Тақырып бойынша арнайы тесттер</h2>

                      <p className="course-start__text">Сізге берілетін тесттер сіздің осы тақырыпты қаншалықты
                        меңгергеніңізді көрсетеді. Нәтижеге көңіліңіз
                        толмаса, сабақты қайта көруді ұсынамыз.
                        Тестті аяқтағаннан кейін, қатемен жұмыс жасау үшін әр тесттің видео шешімі бар. Әр тесттің дұрыс
                        жауабы
                        үшін EduCoin беріледі. Тест тапсыру</p>

                      <p className="course-start__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus
                        aliquet sed enim, iaculis. Sed consequat
                        a gravida viverra vivamus laoreet cursus. Enim morbi pulvinar lobortis lacus diam nibh. Feugiat purus
                        lorem sed aliquam vestibulum nec. </p>

                      <div className="course-start__btnWrap">
                        <button onClick={() => handleTest('start')}
                                className="courseQuestFrom__button course-start__button">Бастау
                        </button>
                      </div>


                    </div>
                }

                <div className="course__question courseQuestion">
                  <h2 className="courseQuestion__title course-book__title">Сабақ бойынша сұрақ қою</h2>

                  <form className="courseQuestion__form courseQuestFrom">

                    <textarea className="courseQuestFrom__input" placeholder="Сұрағыңызды жазыңыз..."/>

                    <div className="courseQuestFrom__wrapper">

                      <label htmlFor="attachFile">
                        <input name="file" id="attachFile" className="courseQuestFrom__file" multiple type="file"/>
                        <span className="courseQuestFrom__button">Foto or File</span>
                      </label>

                      <button className="courseQuestFrom__button">Send</button>

                    </div>

                  </form>
                </div>


              </div>
              : <div className="course__column">
              <div className="course__testing courseTesting">

                <div className="courseTesting__wrapper">
                  <button
                    className="btn__noFocus courseTesting__btn courseTesting__prev"
                    onClick={() => navSliderHandler('prev')}
                  >&lt;</button>

                  <div
                    onClick={ev => navSliderHandler(ev)}
                    className="courseTesting__navWrapper"
                    ref={navSliderWrapper}
                  >
                    <Slider
                      {...navSliderSettings}
                      ref={navSlider}
                      className="courseTesting__sliderControl"
                    >
                      {initialSliderItems.map((item, index) => {
                        const number = index + 1
                        const cls = ['courseTesting__point']

                        if (index === +currentSlide) {
                          cls.push('active')
                        }
                        return (
                          <div key={number + index}>
                        <span
                          className={cls.join(' ')}
                          data-id={index}
                        >{number}</span></div>
                        )
                      })}
                    </Slider>
                  </div>

                  <button
                    onClick={() => navSliderHandler('next')}
                    className="btn__noFocus courseTesting__btn courseTesting__next"
                  >&gt;</button>
                </div>

              </div>

              <div className="courseTesting__sliderWrapper">

                <button
                  onClick={() => testSliderHandler('prev')}
                  className="btn__noFocus  courseTesting__btnPrev courseTesting__btnItem"
                >
                  prev
                </button>

                <Slider
                  ref={mainSlider}
                  beforeChange={(current, next) => setCurrentSlide(next)}
                  {...settings}
                >

                  {testItems.map((item1, indexOfQuestion) => {
                    return (
                      <div key={indexOfQuestion} className="courseTesting__itemWrapper slideItem__wrapper">
                        <div className="courseTesting__slideItem slideItem">
                          {item1.text
                            ? <p className="slideItem__text">{item1.text}</p>
                            : <p className="slideItem__text">Ut non neque, ut fusce. In quis lectus ipsum nisl. Id feugiat
                              pellentesque tristique pellentesque tellus in ni</p>
                          }

                          <div className="slideItem__choices">
                            <ul onClick={event => setAnswer(event)}>
                              {item1.questions.map((item, index) => {
                                const cls = ['slideItem__variant']

                                if (item1.answer !== null && index === item1.answer) {
                                  cls.push('active')
                                }

                                return (
                                  <li key={index}>
                                    <span
                                      data-answerid={JSON.stringify({answerId: index, questionId: indexOfQuestion })}
                                      className={cls.join(' ')}
                                    >{item}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                </Slider>

                <button
                  onClick={() => testSliderHandler('next')}
                  className="btn__noFocus  courseTesting__btnNext courseTesting__btnItem"
                >
                  next
                </button>

              </div>
            </div>
            : <div className="course__column">
                <div className="course__resultsInfo resultsInfo">
                  <h1 className="resultsInfo__title">Тест нәтижесі</h1>
                  <ul className="resultsInfo__list">
                    <li className="resultsInfo__item"><span>Сұрақ саны:</span> <span>20</span></li>
                    <li className="resultsInfo__item"><span>Дұрысы:</span> <span>20</span></li>
                    <li className="resultsInfo__item"><span>Дұрысы:</span> <span>20</span></li>
                    <li className="resultsInfo__item"><span>Белгіленбеген:</span> <span>20</span></li>
                    <li className="resultsInfo__item"><span>Тестке кеткен уақыт:</span> <span>20</span></li>
                  </ul>
                </div>

                <div className="course__testing courseTesting">

                  <div className="courseTesting__wrapper">
                    <button
                      className="btn__noFocus courseTesting__btn courseTesting__prev"
                      onClick={() => navSliderHandler('prev')}
                    >&lt;</button>

                    <div
                      onClick={ev => navSliderHandler(ev)}
                      className="courseTesting__navWrapper"
                      ref={navSliderWrapper}
                    >
                      <Slider
                        ref={navSlider}
                        {...navSliderSettings}
                      >
                        {initialSliderItems.map((item, index) => {
                          const number = index + 1
                          const cls = ['courseTesting__point']

                          if (item.answer === null) {
                            cls.push('empty')
                          } else if (item.answer === item.rightAnswer) {
                            cls.push('right')
                          } else {
                            cls.push('false')
                          }

                          return (
                            <div key={number + index}>
                          <span
                            className={cls.join(' ')}
                            data-id={index}
                          >{number}</span></div>
                          )
                        })}
                      </Slider>
                    </div>

                    <button
                      onClick={() => navSliderHandler('next')}
                      className="btn__noFocus courseTesting__btn courseTesting__next"
                    >&gt;</button>
                  </div>

                </div>

                <div className="courseTesting__sliderWrapper">

                  <button
                    onClick={() => testSliderHandler('prev')}
                    className="btn__noFocus  courseTesting__btnPrev courseTesting__btnItem"
                  >
                    prev
                  </button>

                  <Slider
                    ref={mainSlider}
                    beforeChange={(current, next) => setCurrentSlide(next)}
                    {...settings}
                  >

                    {testItems.map((item1, indexOfQuestion) => {
                      let btn

                      if (item1.answer !== null) {

                        item1.answer === item1.rightAnswer
                          ? btn = <button className="btn__noFocus btn__shadowFromNull slideItem__btn slideItem__btnRight">Дұрыс</button>
                          : btn = <button className="btn__noFocus btn__shadowFromNull slideItem__btn slideItem__btnError">Қате</button>
                      } else {
                        btn = <button className="btn__noFocus btn__shadowFromNull slideItem__btn slideItem__btnEmpty">Белгіленбеген</button>
                      }

                      return (
                        <div key={indexOfQuestion} className="courseTesting__itemWrapper slideItem__wrapper">
                          <div className="courseTesting__slideItem slideItem">
                            {item1.text
                              ? <p className="slideItem__text">{item1.text}</p>
                              : <p className="slideItem__text">Ut non neque, ut fusce. In quis lectus ipsum nisl. Id feugiat
                                pellentesque tristique pellentesque tellus in ni</p>
                            }

                            <div className="slideItem__choices">
                              <ul>
                                {item1.questions.map((item, indexOfItem) => {

                                  const cls = ['slideItem__variant']

                                  if (item1.answer !== null) {
                                    if (indexOfItem === item1.rightAnswer) {
                                      cls.push('right')
                                    } else if (indexOfItem === item1.answer) {
                                      cls.push('false')
                                    }
                                  }
                                  return (
                                    <li key={indexOfItem}>
                                      <span
                                        data-answerid={JSON.stringify({answerId: indexOfItem, questionId: indexOfQuestion })}
                                        className={cls.join(' ')}
                                      >{item}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>

                            <div className="slideItem__buttons">
                              {btn}

                              <button className="btn__noFocus btn__shadowFromNull slideItem__btn">Видео</button>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  </Slider>

                  <button
                    onClick={() => testSliderHandler('next')}
                    className="btn__noFocus  courseTesting__btnNext courseTesting__btnItem"
                  >
                    next
                  </button>

                </div>
              </div>
        }


        <div className="course__column accordion__column">
          <div className="accordion">

            <div className="accordion__content">
              <h1 className="accordion__title">Мазмұны</h1>
            </div>

            {playersProps.map((item, key) => {

              return (
                <div key={key + item.title} className="accordion__wrapper">
                  <div onClick={onButtonClick} id="accordion__item" className="accordion__top">
                    {item.title}
                  </div>
                  <div className="accordion__bottom accorBot">
                    {item.players.map((item1, key1) => (
                      <div key={key1} className="accorBot__wrapper">
                        <a href={item1.link} className="accorBot__icon">&nbsp;</a>
                        <div className="accorBot__content">

                          <div className="accorBot__text">{item1.text}</div>
                          <div className="accorBot-progress clearFix">
                            <div className="accorBot-progress__line">
                              <span style={{width: item1.progress + '%'}}/>
                            </div>
                            <span className="accorBot-progress__number">{item1.progress}%</span>
                          </div>
                          <div className="accorBot-test">
                            <div className="accorBot-test__text">Тақырыптық тест</div>
                            <input type="checkbox"/>
                          </div>

                        </div>
                        <div className="accorBot__time">{item1.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

          </div>

          {
            !testState.showResults
              ? testState.startTest
                ? <div className="course__timer courseTimer">

                  <div className="courseTimer__wrapper">
                    <div className="courseTimer__time">
                      14:44:44
                    </div>
                  </div>

                  <button
                    onClick={() => handleTest('showResults')}
                    className="btn__noFocus btn__shadow courseTimer__button"
                  >
                    Аяқтау
                  </button>

                </div>
                : ''
              : <div className="course-results courseResults">
                  <div className="courseResults__circleWrapper">

                    <CanvasCircle
                      right={5}
                      wrong={5}
                      empty={5}
                      width={70}
                    />

                  </div>

                  <div className="courseResults__numeralRating numeralRating">

                    <div className="numeralRating__item">
                      <span className="numeralRating__number">5</span>
                      <span className="numeralRating__line"/>
                      <span className="numeralRating__text">False</span>
                    </div>

                    <div className="numeralRating__item">
                      <span className="numeralRating__number">5</span>
                      <span className="numeralRating__line"/>
                      <span className="numeralRating__text">False</span>
                    </div>

                    <div className="numeralRating__item">
                      <span className="numeralRating__number">5</span>
                      <span className="numeralRating__line"/>
                      <span className="numeralRating__text">False</span>
                    </div>

                  </div>
                </div>
          }
        </div>


      </div>

    </section>
  )
}

export default Course