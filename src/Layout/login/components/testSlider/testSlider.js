import React, {useEffect, useRef, useState} from 'react'
import './testSlider.scss'
import '../../containers/watchCourse/watchCourse.scoped.scss'
import Slider from 'react-slick'


const navSliderSettings = {
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
const mainSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  button: false
}



const TestSlider = ({showResults, testItems, setTestItems}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  navSliderSettings.slidesToShow = testItems.length > 18 ? 18 : testItems.length



  const navSlider = useRef(null)
  const mainSlider = useRef(null)
  const navSliderWrapper = useRef(null)

  useEffect(() => {

    if (currentSlide || currentSlide === 0) {
      mainSlider.current.slickGoTo(currentSlide)
      navSlider.current.slickGoTo(currentSlide)
    }
  }, [currentSlide])


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
      curAnswer.answer = answerInfo.answerId
      setTestItems(prev => {

        prev[answerInfo.questionId] = curAnswer

        return [
          ...prev,
        ]
      })
    }
  }



  return (
    <div className="course__column">

      {
        showResults
          ?  <div className="course__resultsInfo resultsInfo">
            <h1 className="resultsInfo__title">Тест нәтижесі</h1>
            <ul className="resultsInfo__list">
              <li className="resultsInfo__item"><span>Сұрақ саны:</span> <span>20</span></li>
              <li className="resultsInfo__item"><span>Дұрысы:</span> <span>20</span></li>
              <li className="resultsInfo__item"><span>Дұрысы:</span> <span>20</span></li>
              <li className="resultsInfo__item"><span>Белгіленбеген:</span> <span>20</span></li>
              <li className="resultsInfo__item"><span>Тестке кеткен уақыт:</span> <span>20</span></li>
            </ul>
          </div>
          :  null
      }


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
                  if (item.answer === null) {
                    cls.push('empty')
                  } else if (item.answer === item.rightAnswer) {
                    cls.push('right')
                  } else {
                    cls.push('false')
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


            if (showResults) {
              if (item1.answer !== null) {

                item1.answer === item1.rightAnswer
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
                    ? <p className="slideItem__text">{item1.text}</p>
                    : <p className="slideItem__text">Ut non neque, ut fusce. In quis lectus ipsum nisl. Id feugiat
                      pellentesque tristique pellentesque tellus in ni</p>
                  }

                  <div className="slideItem__choices">
                    <ul onClick={event => showResults ? null : setAnswer(event)}>
                      {item1.questions.map((item, indexOfItem) => {
                        const cls = ['slideItem__variant']



                        if (showResults) {
                          cls.push('slideItem__otherHover')

                          if (item1.answer !== null) {
                            if (indexOfItem === item1.rightAnswer) {
                              cls.push('right')
                            } else if (indexOfItem === item1.answer) {
                              cls.push('false')
                            }
                          }
                        } else if (item1.answer !== null && indexOfItem === item1.answer) {
                          cls.push('active')
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

                  {
                    showResults
                     ? <div className="slideItem__buttons">
                        {btn}

                        <button className="btn__noFocus btn__shadowFromNull slideItem__btn">Видео</button>
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