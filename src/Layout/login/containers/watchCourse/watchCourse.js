import React, {useCallback, useEffect, useRef, useState} from 'react'
import Countdown from 'react-countdown'
import {Link} from 'react-router-dom'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
// import FlipBookComponent from '../../../general/flipBook/flipBookComp'
import TestSlider from '../../components/testSlider/testSlider'
import ConsiderResults from '../../../landing/auxiliary/considerResults'
import {getQuizById, takeQuizById} from '../../../../request/apiQuizzes'
import Loader from '../../../general/component/loader/loader'
import './watchCourse.scoped.scss'
import {isArraysEqual} from "../../../../scripts/dataHandler/dataHandler";
// import useScript from "../../../../hooks/useScript";

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
  const {completed, formatted: {minutes, seconds}} = rerenderData

  if (completed) {
    return <span>Time is over.</span>
  } else {
    return <>{minutes}:{seconds}</>
  }
}

function partsToSideParts(parts) {
  if (!parts) return []

  return Object.keys(parts).map(part => {
    return {
      title: part,
      players: parts[part]
        .map(part => ({
          link: `/login/student/detail-course/${part.content_id}/${part.id}`,
          ...part
        }))
    }
  })
}


const CountdownComponent = React.memo(function ({handleTest, time}) {

  return (
    <Countdown
      date={Date.now() + 60 * 1000 * time}
      renderer={countdownRenderer}
      onComplete={() => handleTest('showResults')}
    />
  )
})


function Course({match: {params}}) {
  const {id, contentId} = params
  const refCoursesButtons = useRef(null)
  const finishButton = useRef(null)
  const [testState, changeTestState] = useState(initialTestState)
  const [testItems, setTestItems] = useState(null)
  const [testAnswersItems, setTestAnswersItems] = useState(null)
  const [testResults, setTestResults] = useState({response: null, circleData: null})
  const [sideParts, setSideParts] = useState([])
  const [linkToVideo, setLinkToVideo] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [isTestItemsFetching, setIsTestItemsFetching] = useState(true)
  const [error, setError] = useState(null)



  useEffect(() => {

    setTestAnswersItems(null)
    setTestItems(null)
    setError(false)
    changeTestState(prevState => ({...prevState, showResults: false, startTest: false}))
    getQuizById({contentId, id})
      .then(res => {
        setLinkToVideo(res.currentLesson.upload_video)
        setSideParts(partsToSideParts(res.parts))

        if (!res.error) {
          if (!res.quiz) {
            setError(`Error, this course does't have any quizzes`)
            setTestItems(null)
            setIsTestItemsFetching(false)
            return null
          }
          setCurrentLesson(res.currentLesson)
          setIsTestItemsFetching(false)

          const {questions, duration} = res.quiz
          const newTestItems = questions.map(item => {
            return {
              video: item.video,
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
          setTestAnswersItems(newTestItems)
          changeTestState(prev => ({...prev, time: +duration || 14}))
        } else {
          setError(`Request error:, ${res.message}`)
          setIsTestItemsFetching(false)
        }
      })
      .catch(err => {
        console.log('error', JSON.parse(JSON.stringify(err)))
        setError(`Error: ${err.message}`)
        setIsTestItemsFetching(false)
      })

  // eslint-disable-next-line
  },[id])

  useEffect(() => {

    if (isTestItemsFetching) {
      getQuizById({contentId, id})
        .then(res => {
          setLinkToVideo(res.currentLesson.upload_video)
          setSideParts(partsToSideParts(res.parts))

          if (!res.error) {
            if (!res.quiz) {
              setError(`Error, this course does't have any quizzes`)
              setTestItems(null)
              setIsTestItemsFetching(false)
              return null
            }
            setCurrentLesson(res.currentLesson)
            setIsTestItemsFetching(false)

            const {questions, duration} = res.quiz
            const newTestItems = questions.map(item => {
              return {
                video: item.video,
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
            setTestAnswersItems(newTestItems)
            changeTestState(prev => ({...prev, time: +duration || 14}))
          } else {
            setError(`Request error:, ${res.message}`)
            setIsTestItemsFetching(false)
          }
        })
        .catch(err => {
          console.log('error', JSON.parse(JSON.stringify(err)))
          setError(`Error: ${err.message}`)
          setIsTestItemsFetching(false)
        })
    }

  }, [testItems, id, contentId, isTestItemsFetching])


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

      const rightAnswersResult = testAnswersItems.map(item => {
        return !!(isArraysEqual(item.answer, item.rightAnswers) && item.rightAnswers.length)
      }).filter(item => item).length


      takeQuizById({results: testToResults(testAnswersItems), id: currentLesson.quiz.id})
        .then(response => {
          const {total_attempt, empty} = response.data
          setTestResults({
            circleData: {
              empty,
              right: rightAnswersResult,
              wrong: total_attempt - rightAnswersResult - empty
            },
            response: response.data
          })
          // console.info('new results', response.data)
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

          {
            linkToVideo
              ? (
                <div className="course-video">
                  <div className="lesson__playerWrapper">
                    <VideoPlayer
                      url={linkToVideo}
                      className="lesson__video"
                    />
                  </div>
                </div>
              )
              : null
          }

          <div className="course-panel">
            <div className="course-panel__content">
              <div className="course-panel__column"/>

              <div className="course-panel__column">

                <div ref={refCoursesButtons} className="course-buttons">
                  <button
                    onClick={ev => showTestHandler(false, ev)}
                    className="course-buttons__btn active btn__noFocus"
                  >Сабақ
                  </button>
                  <button
                    onClick={ev => showTestHandler(true, ev)}
                    className="course-buttons__btn btn__noFocus"
                  >Тест
                  </button>
                </div>

              </div>
            </div>

          </div>


        </div>

        {
            !isTestItemsFetching
              ? (
                !testState.showResults
                  ? !testState.startTest
                  ? <div className="course__column course-book__column">


                    {
                      !testState.showTest
                        ? null
                        : !testItems
                          ? <div className="course__errorWrapper">
                              <p className="error__middle">{error}</p>
                            </div>
                          : <div className="course-start">

                            <h2 className="course-start__title course-book__title">Тақырып бойынша арнайы тесттер</h2>

                            <p className="course-start__text">Сізге берілетін тесттер сіздің осы тақырыпты қаншалықты
                              меңгергеніңізді көрсетеді. Нәтижеге көңіліңіз
                              толмаса, сабақты қайта көруді ұсынамыз.
                              Тестті аяқтағаннан кейін, қатемен жұмыс жасау үшін әр тесттің видео шешімі бар. Әр тесттің
                              дұрыс
                              жауабы
                              үшін EduCoin беріледі. Тест тапсыру</p>

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
                  : !testItems
                    ? <div className="course__errorWrapper">
                        <p className="error__middle">No quizzes</p>
                      </div>
                    : <TestSlider testItems={testItems} setTestItems={setTestAnswersItems} showResults={false}/>
                  : <>
                    {
                      testResults.response ? (
                        <div className="course__resultsInfo resultsInfo">
                          <h1 className="resultsInfo__title">Тест нәтижесі</h1>
                          <ul className="resultsInfo__list">
                            <li className="resultsInfo__item"><span>Сұрақ саны:</span>
                              <span>{testResults.response.total_attempt}</span></li>
                            <li className="resultsInfo__item"><span>Дұрысы:</span>
                              <span>{testResults.circleData.right}</span></li>
                            {/*<li className="resultsInfo__item"><span>Дұрысы:</span> <span>20</span></li>*/}
                            <li className="resultsInfo__item"><span>Белгіленбеген:</span>
                              <span>{testResults.circleData.empty}</span></li>
                            <li className="resultsInfo__item"><span>Тестке кеткен уақыт:</span>
                              <span>{testState.time}</span></li>
                          </ul>
                        </div>
                      ) : <Loader/>
                    }
                    <TestSlider linkToVideo={linkToVideo} testItems={testItems} setTestItems={setTestAnswersItems}
                                showResults={true}/>
                  </>
              )
              : <Loader/>

        }


        <div className="course__column accordion__column">
          <div className="accordion">

            <div className="accordion__content">
              <h1 className="accordion__title">Мазмұны</h1>
            </div>

            {sideParts.map((item, key) => {

              return (
                <div key={key + item.title} className="accordion__wrapper">
                  <div onClick={onButtonClick} id="accordion__item" className="accordion__top">
                    {item.title}
                  </div>
                  <div className="accordion__bottom accorBot">
                    {item.players.map((item1, key1) => (
                      <div key={key1} className="accorBot__wrapper">
                        <Link to={item1.link} className="accorBot__icon">&nbsp;</Link>
                        <div className="accorBot__content">

                          <div className="accorBot__text">{item1.title}</div>
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
