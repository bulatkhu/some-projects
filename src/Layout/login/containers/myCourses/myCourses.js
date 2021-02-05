import React, {useEffect, useState} from 'react'
import CourseBox from '../../components/courseBox/courseBox'
import {apiGetStudentsCourses} from '../../../../request/student/apiStudent'
import {SITE_BASE_URL} from '../../../../app.config'
import './myCourses.scss'
import {Translate} from "react-translated";


function reqToShowCourses(courses) {
  return courses.map(item => {
    let img = item.metas && item.metas.length
      ? item.metas.find(data => data.option === 'cover').value
      : null

    if (img) {

      if (!img.toString().includes('http')) {
        img = SITE_BASE_URL + img
      }

    }

    return {
      title: item.title,
      courseImg: img,
      link: '/login/student/subject/' + item.id,
      percentage: item.percentage
    }
  })
}


const MyCourses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {

    apiGetStudentsCourses()
      .then(res => {
        if (res.status === 200) {

          console.log(res.data)

          setCourses(reqToShowCourses(res.data.courses))
        }
      })

  },[])


  return (
    <section className="myCourses">

      <div className="myCourses__top">

        <h1 className="myCourses__title"><Translate text="Курстарым"/></h1>

        <div className="myCourses__content">

          {courses.map((item, index) => {
            return <CourseBox key={index} {...item}/>
          })}

          <div className="myCourses__column">
            <div className="myCourses__addSubject myCoursesAdd">

              <a href="/#courses" className="myCoursesAdd">

                <div className="myCoursesAdd__wrapper">
                  <div className="myCoursesAdd__plus">
                    <span/>
                    <span/>
                  </div>

                  <div className="myCoursesAdd__btn"><Translate text="New"/></div>
                </div>

              </a>

            </div>
          </div>


        </div>

      </div>
    </section>
  )
}

export default MyCourses
