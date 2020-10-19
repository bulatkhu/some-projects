import React from 'react'
import CourseBox from '../../components/courseBox/courseBox'
import courseImg from '../../../../images/login/myCourses/courseImg.jpg'
import {Link} from 'react-router-dom'
import '../../containers/myCourses/myCourses.scss'

const courseItems = [
  {courseImg, filling: '67%', text: 'жалғастыру'},
  {courseImg, filling: '90%', text: 'жалғастыру'}
]

const TeacherCourses = () => {


  return (
    <section className="myCourses">

      <div className="myCourses__top">

        <h1 className="myCourses__title">Курстарым</h1>

        <div className="myCourses__content">

          {courseItems.map((item, index) => {
            return <CourseBox key={index} {...item}/>
          })}

        </div>

      </div>

      <div className="myCourses__bottom myCoursesBottom">

        <h2 className="myCourses__secondTitle">Live вебинарлар</h2>

        <div className="myCoursesBottom__content">

          <span>
            <Link className="myCourses__goToLive" to="/teacher/connecting">
              Go Live
            </Link>
          </span>


        </div>

      </div>

    </section>
  )
}

export default TeacherCourses