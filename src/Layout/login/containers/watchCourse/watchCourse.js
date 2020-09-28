import React, {useEffect, useRef, useState} from 'react'
import './watchCourse.scoped.scss'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import Stars from '../../../general/stars/stars';
import FlipBookComponent from '../../../general/flipBook/flipBookComp'
import CanvasCircle from '../../components/CanvasCircle/CanvasCircle'
import TestSlider from "../../components/testSlider/testSlider";

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
  showTest: true,
  startTest: false,
  time: 15,
  showResults: false,
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
const initialAnswers = {
  right: 0,
  wrong: 0,
  empty: 0
}


function Course() {
  const [testState, changeTestState] = useState(initialTestState)
  const [testItems, setTestItems] = useState(initialSliderItems)
  const [answerState, setAnswerState] = useState(initialAnswers)


  const refCoursesButtons = useRef(null)

  useEffect(() => {

    console.log('render testState.showResults')

    // if (testState.showResults) {
    //   testItems.forEach(item => {
    //     if (item.answer === item.rightAnswer) {
    //       return setAnswerState(prev => ({
    //         ...prev, right: prev.right + 1
    //       }))
    //     } else if (item.answer === null) {
    //       return setAnswerState(prev => ({
    //         ...prev, empty: prev.empty + 1
    //       }))
    //     } else {
    //       return setAnswerState(prev => ({
    //         ...prev, wrong: prev.wrong + 1
    //       }))
    //     }
    //   })
    // }

    console.log(testItems)

  }, [testState.showResults, testItems])


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
                  <div
                    onClick={ev => showTestHandler(false, ev)}
                    className="course-buttons__btn active"
                  >Сабақ</div>
                  <div
                    onClick={ev => showTestHandler(true, ev)}
                    className="course-buttons__btn"
                  >Тест</div>
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
                                  className="btn__shadowFromNull courseQuestFrom__button course-start__button">Бастау
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
                : <TestSlider testItems={testItems} setTestItems={setTestItems} showResults={false}/>
            : <TestSlider testItems={testItems} setTestItems={setTestItems} showResults={true}/>
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
                      right={initialAnswers.right}
                      wrong={initialAnswers.wrong}
                      empty={initialAnswers.empty}
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