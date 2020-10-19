import React from 'react'


const CourseBox = ({courseImg, filling, text}) => {


  return (
    <div className="myCourses__column">
      <div className="myCourses__img">
        <img src={courseImg} alt="course"/>
      </div>

      <div className="myCourses__progress progressWrapper">
        <div className="progressWrapper__num">{filling}</div>
        <div className="progressWrapper__line">
          <div className="progressWrapper__filling" style={{width: filling}}/>
        </div>
      </div>
      <div className="myCourses__text">{text}</div>
    </div>
  )
}

export default CourseBox