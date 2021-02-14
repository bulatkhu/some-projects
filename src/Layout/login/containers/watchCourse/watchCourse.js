import React, {useCallback, useEffect, useRef, useState} from 'react'
import Countdown from 'react-countdown'
import {Link} from 'react-router-dom'
import {Translate} from 'react-translated'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import TestSlider from '../../components/testSlider/testSlider'
import ConsiderResults from '../../../landing/auxiliary/considerResults'
import {getQuizById, takeQuizById} from '../../../../request/apiQuizzes'
import Loader from '../../../general/component/loader/loader'
import AddTestComment from './addTestComment/addTestComment'
import './watchCourse.scoped.scss'

const initialTestState = {
  showTest: false,
  startTest: false,
  time: 14,
  showResults: false,
}

const initialTestResults = {response: null, circleData: null, time: 0}

const onButtonClick = event => {
  event.target.classList.toggle('active')
}


function testToResults(results) {
  const newResults = results
    .map(item => {
      const options = []

      if (item.answer.length) {
        item.answer.forEach(answer => {
          options.push(item.options[answer].id)
        })
      }

      return {
        id: item.questionId,
        options: options
      }
    })
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
  const [response, setResponse] = useState(null)
  const [testState, changeTestState] = useState(initialTestState)
  const [testItems, setTestItems] = useState(null)
  const [testAnswersItems, setTestAnswersItems] = useState(null)
  const [testResults, setTestResults] = useState(initialTestResults)
  const [sideParts, setSideParts] = useState([])
  const [linkToVideo, setLinkToVideo] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [isTestItemsFetching, setIsTestItemsFetching] = useState(true)
  const [error, setError] = useState(null)





  const handleResponse = () => {
    setTestItems(null)
    changeTestState(prevState => ({...initialTestState, showTest: prevState.showTest}))
    setTestResults(initialTestResults)
    const {parts} = response
    const lessons = Object.keys(parts).map(key => parts[key])
    const mergedLessons = [].concat.apply([], lessons)
    const lesson = mergedLessons.find(item => item.id === +id)
    const res = {
      error: false,
      quiz: lesson.quiz,
      currentLesson: lesson,
      parts
    }

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
          options: item.options,
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
            .filter(answer => {
              return !!(answer || answer === 0);
            })
        }
      })
      setTestItems(newTestItems)
      setTestAnswersItems(newTestItems)
      changeTestState(prev => ({...prev, time: +duration || 14}))
    } else {
      setError(`Request error:, ${res.message}`)
      setIsTestItemsFetching(false)
    }
  }


  const  requestGetQuiz = () => {
    getQuizById({contentId, id})
      .then(res => {
        setResponse(res.data)
        handleResponse(res.data)
        return res
      })
      .catch(err => {
        console.log('error', JSON.parse(JSON.stringify(err)))
        setError(`Error: ${err.message}`)
        setIsTestItemsFetching(false)
        return null
      })
  }



  useEffect(() => {
    requestGetQuiz()
    // eslint-disable-next-line
  }, [])



  useEffect(() => {
    if (response && !isTestItemsFetching) {
      handleResponse(response)
    }
  // eslint-disable-next-line
  }, [id, isTestItemsFetching, response])

  const timeIsOver = useCallback(() => {
    finishButton.current.click()
  }, [])


  if (isTestItemsFetching) {
    return <Loader container/>
  }



  const showTestHandler = (info) => {
    changeTestState(prevState => ({
      ...prevState, showTest: info
    }))
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
      const timeIsGone = document.querySelector('.courseTimer__time').textContent
      takeQuizById({results: testToResults(testAnswersItems), id: currentLesson.quiz.id})
        .then(response => {
          const {total_attempt, empty, correct_answers} = response.data
          setTestResults({
            time: timeIsGone,
            circleData: {
              empty,
              right: correct_answers,
              wrong: total_attempt - correct_answers - empty
            },
            response: response.data
          })
        })
    }
  }






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
                    className={['course-buttons__btn btn__noFocus', !testState.showTest ? 'active' : null ].join(' ')}
                  >
                    <Translate text="Сабақ"/>
                  </button>
                  <button
                    onClick={ev => showTestHandler(true, ev)}
                    className={['course-buttons__btn btn__noFocus', testState.showTest ? 'active' : null ].join(' ')}
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

                        <h2 className="course-start__title course-book__title">
                          <Translate text="Тақырып бойынша арнайы тесттер"/>
                        </h2>

                        <p className="course-start__text">
                          <Translate text="Сізге берілетін тесттер"/>
                        </p>

                        <div className="course-start__btnWrap">
                          <button onClick={() => handleTest('start')}
                                  className="btn__shadowFromNull courseQuestFrom__button course-start__button">
                            <Translate text="Бастау"/>
                          </button>
                        </div>


                      </div>
                  }

                  <div className="course__question courseQuestion">
                    <h2 className="courseQuestion__title course-book__title">
                      <Translate text="Сабақ бойынша сұрақ қою"/>
                    </h2>

                    <AddTestComment id={id}/>
                  </div>


                </div>
                : !testItems
                  ? <div className="course__errorWrapper">
                    <p className="error__middle">No quizzes</p>
                  </div>
                  : <>
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
                            <Translate text="Аяқтау"/>
                          </button>

                        </div>
                        : ''
                        : testResults.circleData
                        ? <div className="course-results courseResults">
                          <ConsiderResults results={testResults.circleData}/>
                        </div>
                        : <Loader/>
                    }
                    <TestSlider testItems={testItems} setTestItems={setTestAnswersItems} showResults={false}/>
                  </>
                : <>
                  {
                    testResults.response ? (
                      <div className="course__resultsInfo resultsInfo">
                        <h1 className="resultsInfo__title"><Translate text="Тест нәтижесі"/></h1>
                        <ul className="resultsInfo__list">
                          <li className="resultsInfo__item"><span><Translate text="Сұрақ саны:"/></span>
                            <span>{testResults.response.total_attempt}</span></li>
                          <li className="resultsInfo__item"><span><Translate text="Дұрысы:"/></span>
                            <span>{testResults.circleData.right}</span></li>
                          <li className="resultsInfo__item"><span><Translate text="Белгіленбеген:"/></span>
                            <span>{testResults.circleData.empty}</span></li>
                          <li className="resultsInfo__item"><span><Translate text="Тестке кеткен уақыт:"/></span>
                            <span>{testResults.time}</span></li>
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
              <h1 className="accordion__title"><Translate text="Мазмұны"/></h1>
            </div>


            <div className="accordion__itemsWrapper default-scroll slim">

              {sideParts.map((item, key) => {
                const isActive = key === 0

                return (
                  <div key={key + item.title} className="accordion__wrapper">
                    <div
                      onClick={onButtonClick}
                      id="accordion__item"
                      className={[`accordion__top`, isActive ? 'active' : null].join(' ')}>
                      {item.title}
                    </div>
                    <div className="accordion__bottom accorBot default-scroll slim">
                      {item.players.map((item1, key1) => (
                        <div key={key1} className="accorBot__wrapper">
                          <Link to={item1.link}
                                className={['accorBot__icon', item1.access === 'open' ? 'green' : null].join(' ')}>&nbsp;</Link>
                          <div className="accorBot__content">

                            <div className="accorBot__text">{item1.title}</div>
                            <div className="accorBot-progress clearFix">
                              <div className="accorBot-progress__line">
                                <span style={{width: item1.progress + '%'}}/>
                              </div>
                              <span className="accorBot-progress__number">{item1.progress}%</span>
                            </div>
                            <div className="accorBot-test">
                              <div className="accorBot-test__text"><Translate text="Тақырыптық тест"/></div>
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

          </div>

          {
            testResults.circleData
              ? <div className="course-results courseResults">
                <ConsiderResults results={testResults.circleData}/>
              </div>
              : null
          }
        </div>


      </div>

    </section>
  )
}

export default Course
