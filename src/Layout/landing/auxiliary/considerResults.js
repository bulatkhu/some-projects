import CanvasCircle from '../../login/components/CanvasCircle/CanvasCircle'
import React from 'react'
import './considerResults.scss'

const ConsiderResults = ({results: { right, wrong, empty }}) => {
  // let empty = 0, right = 0, wrong = 0
  //
  // results.forEach(item => {
  //
  //   if (!item.answer || !item.answer.length) {
  //     empty++
  //   } else if (item.answer === item.rightAnswer) {
  //     right++
  //   } else {
  //     wrong++
  //   }
  //
  // })



  return (
    <>
      <div className="courseResults__circleWrapper">
        <CanvasCircle
          right={right}
          wrong={wrong}
          empty={empty}
          width={70}
        />
      </div>
      <div className="courseResults__numeralRating numeralRating">

        <div className="numeralRating__item">
          <span className="numeralRating__number numeralRating-color__red">{wrong ? wrong : 0}</span>
          <span className="numeralRating__line numeralRating-color__bgRed"/>
          <span className="numeralRating__text numeralRating-color__red">False</span>
        </div>

        <div className="numeralRating__item">
          <span className="numeralRating__number numeralRating-color__yellow">{empty ? empty : 0}</span>
          <span className="numeralRating__line numeralRating-color__bgYellow"/>
          <span className="numeralRating__text numeralRating-color__yellow">Empty</span>
        </div>

        <div className="numeralRating__item">
          <span className="numeralRating__number numeralRating-color__right">{right ? right : 0}</span>
          <span className="numeralRating__line numeralRating-color__bgRight"/>
          <span className="numeralRating__text numeralRating-color__right">True</span>
        </div>

      </div>
    </>
  )
}


export default ConsiderResults