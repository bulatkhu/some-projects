import React, {useEffect, useRef, useState} from 'react'
import Slider from 'react-slick'
import MathJax from 'react-mathjax2'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import VideoPlayerModal from '../../../landing/components/VideoPlayerModal/VideoPlayerModal'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import '../../containers/watchCourse/watchCourse.scoped.scss'
import './testSlider.scss'


const navSliderSettings = {
  speed: 500,
  infinite: false,
  slidesToScroll: 3,
  button: false,
  // centerMode: true,
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
const mainSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  button: false
}


const areAnswerEqual = (answers, rightAnswer) => {
  return JSON.stringify(answers) === JSON.stringify(rightAnswer)
}


const textToMathJax = text => {
  return (
    <MathJax.Context
      input='ascii'
      script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
      options={{
        asciimath2jax: {
          useMathMLspacing: true,
          delimiters: [["$$","$$"], ['$','$'], ['\\(', '\\)']],
          preview: "none",
        }
      }}
    >
      <div dangerouslySetInnerHTML={{
        __html: text
      }}>
        {/*<MathJax.Text text={ text }/>*/}
      </div>
    </MathJax.Context>
  )
}


const TestSlider = ({showResults, testItems, setTestItems, linkToVideo}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState(false)
  navSliderSettings.slidesToShow =
    testItems && testItems.length > 18
      ? 18
      : testItems.length

  const navSlider = useRef(null)
  const mainSlider = useRef(null)
  const navSliderWrapper = useRef(null)

  console.log('testItems', testItems)

  useEffect(() => {
    if (currentSlide || currentSlide === 0) {
      mainSlider.current.slickGoTo(currentSlide)
      navSlider.current.slickGoTo(currentSlide)
    }
  }, [currentSlide])

  useEffect(() => {

    if (showVideoModal) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }

  },[showVideoModal])


  const onVideoClick = (event, link) => {
    event.preventDefault()
    setShowVideoModal(link)
  }

  const testSliderHandler = info => {
    if (info === 'next') {
      mainSlider.current.slickNext()
    } else if (info === 'prev') {
      mainSlider.current.slickPrev()
    }
  }

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

  const setAnswer = event => {
    if (event.target.dataset.answerid) {
      const answerInfo = JSON.parse(event.target.dataset.answerid)
      const curAnswer = testItems[answerInfo.questionId]
      const haveSameAnswer = curAnswer.answer.includes(answerInfo.answerId)


      if (!curAnswer.answer || !curAnswer.answer.length) {
        curAnswer.answer = []
      } else if (curAnswer.answer.length > 2 && !haveSameAnswer) {
        curAnswer.answer.shift()
      }

      if (!haveSameAnswer) {

        if (curAnswer.multiple) {
          curAnswer.answer = [...curAnswer.answer, answerInfo.answerId].sort((a, b) => a - b)
        } else {
          curAnswer.answer = [answerInfo.answerId]
        }

      } else {
        const idOfDeleteAnswer = curAnswer.answer.findIndex(item => item === answerInfo.answerId)
        curAnswer.answer.splice(idOfDeleteAnswer,1)
      }


      setTestItems(prev => {

        prev[answerInfo.questionId] = curAnswer

        return [
          ...prev
        ]
      })
    }
  }

  if (!testItems || !testItems.length) return null


  return (
    <div className="course__column">
      <ModalPortal>
        <VideoPlayerModal
          showModal={showVideoModal}
          hideModal={() => setShowVideoModal(false)}
          videoUrl={showVideoModal}
        />
      </ModalPortal>

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
              {testItems.map((item, index) => {
                const number = index + 1
                const cls = ['courseTesting__point']

                if (showResults) {
                  if (!item.answer || !item.answer.length) {
                    cls.push('empty')
                  } else if (areAnswerEqual(item.answer, item.rightAnswers)) {
                    cls.push('right')
                  } else {
                    cls.push('false')
                  }

                  if (index === +currentSlide) {
                    cls.push('resultActive')
                  }
                } else {
                  if (index === +currentSlide) {
                    cls.push('active')
                  }
                }


                return (
                  <div key={number + index}>
                        <span
                          className={cls.join(' ')}
                          data-id={index}
                        >{number}</span>
                  </div>
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
          {...mainSliderSettings}
        >

          {testItems.map((item1, indexOfQuestion) => {
            let btn


            console.log('testItems', item1)


            if (showResults) {
              if (item1.answer.length) {

                areAnswerEqual(item1.answer, item1.rightAnswers)
                  ? btn = <button className="btn__noFocus btn__shadowFromNull slideItem__btn slideItem__btnRight">Дұрыс</button>
                  : btn = <button className="btn__noFocus btn__shadowFromNull slideItem__btn slideItem__btnError">Қате</button>
              } else {
                btn = <button className="btn__noFocus btn__shadowFromNull slideItem__btn slideItem__btnEmpty">Белгіленбеген</button>
              }
            } else {
              btn = null
            }

            return (
              <div key={indexOfQuestion} className="courseTesting__itemWrapper slideItem__wrapper">
                <div className="courseTesting__slideItem slideItem">
                  {item1.text
                    ? <div className="slideItem__text">
                        {textToMathJax(item1.text)}
                      </div>
                    : <p className="slideItem__text">
                        No questions
                      </p>
                  }

                  <div className="slideItem__choices">
                    <ul onClick={event => showResults ? null : setAnswer(event)}>
                      {item1.questions.map((item, indexOfItem) => {
                        const cls = ['slideItem__variant']

                        if (showResults) {
                          cls.push('slideItem__otherHover')

                          if (item1.answer && item1.answer.length) {
                            if (item1.rightAnswers.find(rightAnswer => rightAnswer === indexOfItem)) {
                              cls.push('right')
                            } else if (item1.answer.find(answer => answer === indexOfItem) !== undefined) {
                              cls.push('false')
                            }
                          }
                        } else {
                          if (item1.answer.includes(+indexOfItem)) {
                            cls.push('active')
                          }

                        }

                        return (
                          <li key={indexOfItem}>
                            <span
                              data-answerid={JSON.stringify({
                                answerId: indexOfItem,
                                questionId: indexOfQuestion,
                                multiple: item1.multiple
                              })}
                              className={cls.join(' ')}
                            >{textToMathJax(item)}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {
                    showResults
                     ? <div className="slideItem__buttons">
                          {btn}
                          <a
                            onClick={event => onVideoClick(event, item1.video)}
                            href={linkToVideo}
                            className="btn__noFocus btn__shadowFromNull slideItem__btn"
                          >Видео</a>
                        </div>
                    : null
                  }

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
  )
}


export default TestSlider
