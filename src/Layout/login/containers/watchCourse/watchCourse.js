import React, {useCallback, useEffect, useRef, useState} from 'react'
import Countdown from 'react-countdown'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import Stars from '../../../general/stars/stars'
import FlipBookComponent from '../../../general/flipBook/flipBookComp'
import TestSlider from "../../components/testSlider/testSlider"
import ConsiderResults from '../../../landing/auxiliary/considerResults'
import {getQuizById, takeQuizById} from '../../../../request/apiQuizzes'
import Loader from '../../../general/component/loader/loader'
import './watchCourse.scoped.scss'
// import useScript from "../../../../hooks/useScript";

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
  time: 14,
  showResults: false,
}

const onButtonClick = event => {
  event.target.classList.toggle('active')
  const panel = event.target.nextElementSibling
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px'
  }
}


function testToResults(results) {
  const newResults = results
    .map(item => ({
      id: item.questionId,
      options: item.answer
    }))
  return {
    questions: newResults
  }
}

function countdownRenderer(rerenderData) {
  const { completed, formatted: { minutes, seconds } } = rerenderData

  if (completed) {
    // Render a completed state
    return <span>Time is over.</span>
  } else {
    // Render a countdown
    return <>{minutes}:{seconds}</>
  }
}

const CountdownComponent  = React.memo(function ({handleTest, time}) {

  return (
    <Countdown
      date={Date.now() + 60 * 1000 * time}
      renderer={countdownRenderer}
      onComplete={() => handleTest('showResults')}
    />
  )
})


function Course() {
  const refCoursesButtons = useRef(null)
  const finishButton = useRef(null)
  const [testState, changeTestState] = useState(initialTestState)
  const [testItems, setTestItems] = useState(null)
  const [testResults, setTestResults] = useState({response: null, circleData: null})

  // useScript('https://polyfill.io/v3/polyfill.min.js?features=es6')
  // useScript('https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js')


  useEffect(() => {
    let mounted = true



      if ((!testItems || !testItems.length) && mounted) {
        try {

          getQuizById(13)
            .then(res => {
              const {questions, duration} = res.data

              console.log('res data', res.data)

              const newTestItems = questions.map(item => {
                return {
                  multiple: !!item.is_multiple,
                  text: item.question,
                  questionId: item.id,
                  questions: item.options.map(option => {
                    return option.option_text
                  }),
                  answer: [],
                  rightAnswers: item.options
                    .map((option, index) => {
                      if (!!option.correct) {
                        return index
                      }
                      return null
                    })
                    .filter(answer => !!answer)
                }
              })
              setTestItems(newTestItems)
              changeTestState(prev => ({...prev, time: +duration || 14}))
            })

        } catch (e) {
          console.error('error', e)
        }

      }




    return () => {
      mounted = false
    }
  }, [testItems])


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

      console.info('testItems', testItems)

      takeQuizById({results:  testToResults(testItems),id: 13})
        .then(response => {
          const {correct_answers, total_attempt, empty} = response.data
          setTestResults({
            circleData: {
              empty,
              right: correct_answers,
              wrong: total_attempt - correct_answers - empty
            },
            response: response.data
          })
          console.info('new results', response.data)
        })
    }
  }

  const timeIsOver = useCallback(() => {
    finishButton.current.click()
  }, [])


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
                  <button
                    onClick={ev => showTestHandler(false, ev)}
                    disabled={!!testState.showTest && !testState.showResults}
                    className="course-buttons__btn active btn__noFocus"
                  >Сабақ</button>
                  <button
                    onClick={ev => showTestHandler(true, ev)}
                    disabled={!!testState.showTest && !testState.showResults}
                    className="course-buttons__btn btn__noFocus"
                  >Тест</button>
                </div>

              </div>
            </div>

          </div>


        </div>

        {

          testItems && testItems.length
            ? (
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

                        <button className="btn__shadowFromNull courseQuestFrom__button">Send</button>

                      </div>

                    </form>
                  </div>


                </div>
                  : <TestSlider testItems={testItems} setTestItems={setTestItems} showResults={false}/>
                : <>
                    {
                      testResults.response ? (
                        <div className="course__resultsInfo resultsInfo">
                          <h1 className="resultsInfo__title">Тест нәтижесі</h1>
                          <ul className="resultsInfo__list">
                            <li className="resultsInfo__item"><span>Сұрақ саны:</span>
                              <span>{testResults.response.total_attempt}</span></li>
                            <li className="resultsInfo__item"><span>Дұрысы:</span>
                              <span>{testResults.response.correct_answers}</span></li>
                            {/*<li className="resultsInfo__item"><span>Дұрысы:</span> <span>20</span></li>*/}
                            <li className="resultsInfo__item"><span>Белгіленбеген:</span>
                              <span>{testResults.response.empty}</span></li>
                            <li className="resultsInfo__item"><span>Тестке кеткен уақыт:</span> <span>{testState.time}</span></li>
                          </ul>
                        </div>
                      ) : <Loader/>
                    }
                    <TestSlider testItems={testItems} setTestItems={setTestItems} showResults={true}/>
                  </>
              )
            : <Loader/>

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
                        <CountdownComponent
                          handleTest={timeIsOver}
                          time={testState.time}
                        />

                        {/*<Countdown*/}
                        {/*  date={Date.now() + 60 * 1000 * testState.time}*/}
                        {/*  renderer={countdownRerender}*/}
                        {/*  onComplete={() => handleTest('showResults')}*/}
                        {/*/>*/}
                      </div>
                    </div>

                    <button
                      ref={finishButton}
                      onClick={() => handleTest('showResults')}
                      className="btn__noFocus btn__shadow courseTimer__button"
                    >
                      Аяқтау
                    </button>

                </div>
                : ''
              : testResults.circleData
                ? <div className="course-results courseResults">
                    <ConsiderResults results={testResults.circleData}/>
                  </div>
                : <Loader/>
          }
        </div>


      </div>

    </section>
  )
}


export default Course
