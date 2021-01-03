import React from 'react'
import './coursesBox.scoped.scss'
import {Link} from 'react-router-dom'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'

const CourseBox = ({courseImg, title, link, percentage}) => {

  return (
    <div className="coursesBox__column">
      <div className="coursesBox__wrapper">
        <h3 className="coursesBox__title">{title}</h3>
        <div className="coursesBox__img">
          {
            courseImg
              ? <img src={courseImg} alt="course"/>
              : <NoPhoto/>
          }
        </div>
        <div className="coursesBox__percent percent">
          <span className="percent__number">{percentage}%</span>
          <span className="percent__scope">
            <span className="percent__value" style={{ width: `${percentage}%` }}/>
          </span>
        </div>
        <Link to={link || '/'} className="coursesBox__text">
          жалғастыру
        </Link>
      </div>
    </div>
  )
}

export default CourseBox
