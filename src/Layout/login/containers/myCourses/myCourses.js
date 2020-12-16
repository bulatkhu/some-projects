import React, {useEffect, useState} from 'react'
import './myCourses.scss'
import thingItem1 from '../../../../images/login/myCourses/courseItem.jpg'
import thingItem2 from '../../../../images/login/myCourses/courseItem2.jpg'
import thingItem3 from '../../../../images/login/myCourses/courseItem3.jpg'
import thingItem4 from '../../../../images/login/myCourses/courseItem4.jpg'
import CourseBox from '../../components/courseBox/courseBox'
import {apiGetStudentsCourses} from '../../../../request/student/apiStudent'
import {SITE_BASE_URL} from '../../../../app.config'

const webinarItems = [
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem1, date: '20 agust 2020', progress: '0%'},
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem2, date: '20 agust 2020', progress: '0%'},
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem3, date: '20 agust 2020', progress: '0%'},
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem4, date: '20 agust 2020', progress: '0%'},
]

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
      link: '/student/subject/' + item.id
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

        <h1 className="myCourses__title">Курстарым</h1>

        <div className="myCourses__content">

          {courses.map((item, index) => {
            return <CourseBox key={index} {...item}/>
          })}

          <div className="myCourses__column">
            <div className="myCourses__addSubject myCoursesAdd">

              <a href="/" className="myCoursesAdd">

                <div className="myCoursesAdd__wrapper">
                  <div className="myCoursesAdd__plus">
                    <span/>
                    <span/>
                  </div>

                  <div className="myCoursesAdd__btn">New</div>
                </div>

              </a>

            </div>
          </div>


        </div>

      </div>

      <div className="myCourses__bottom myCoursesBottom">

        <h2 className="myCourses__secondTitle">Live вебинарлар</h2>

        <div className="myCoursesBottom__content">

          {webinarItems.map((item, index) => {
            return (
              <div key={index} className="myCoursesBottom__column">


                <div className="myCoursesBottom__topWrapper">
                  <div className="myCoursesBottom__img">
                    <img src={item.img} alt="item"/>
                  </div>

                  <div className="myCoursesBottom__text">{item.text}</div>
                </div>

                <div className="myCoursesBottom__wrapper">
                  <div className="myCoursesBottom__date">
                    <a href={item.link}>{item.date}</a>
                  </div>

                  <div className="myCoursesBottom__percent">
                    <span>{item.progress}</span>
                  </div>
                </div>
              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default MyCourses