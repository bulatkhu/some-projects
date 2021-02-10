import CanvasCircle from '../../login/components/CanvasCircle/CanvasCircle'
import React from 'react'
import './considerResults.scss'
import {Translate} from "react-translated";

const ConsiderResults = ({results: { right, wrong, empty }}) => {

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
          <span className="numeralRating__text numeralRating-color__red"><Translate text="false"/></span>
        </div>

        <div className="numeralRating__item">
          <span className="numeralRating__number numeralRating-color__yellow">{empty ? empty : 0}</span>
          <span className="numeralRating__line numeralRating-color__bgYellow"/>
          <span className="numeralRating__text numeralRating-color__yellow"><Translate text="Empty"/></span>
        </div>

        <div className="numeralRating__item">
          <span className="numeralRating__number numeralRating-color__right">{right ? right : 0}</span>
          <span className="numeralRating__line numeralRating-color__bgRight"/>
          <span className="numeralRating__text numeralRating-color__right"><Translate text="true"/></span>
        </div>

      </div>
    </>
  )
}


export default ConsiderResults
