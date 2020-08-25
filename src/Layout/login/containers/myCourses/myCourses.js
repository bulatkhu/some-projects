import React from 'react'
import './myCourses.scss'
import courseImg from '../../../../images/login/myCourses/courseImg.jpg'
import thingItem1 from '../../../../images/login/myCourses/courseItem.jpg'
import thingItem2 from '../../../../images/login/myCourses/courseItem2.jpg'
import thingItem3 from '../../../../images/login/myCourses/courseItem3.jpg'
import thingItem4 from '../../../../images/login/myCourses/courseItem4.jpg'
import CourseBox from '../../components/courseBox/courseBox'
// import thingItem1 from '../../../../images/login/myCourses/courseItem.jpg'
// import thingItem1 from '../../../../images/login/myCourses/courseItem.jpg'
// import thingItem1 from '../../../../images/login/myCourses/courseItem.jpg'

const courseItems = [
  {courseImg, filling: '67%', text: 'жалғастыру'},
  {courseImg, filling: '90%', text: 'жалғастыру'},
  {courseImg, filling: '30%', text: 'жалғастыру'},
  {courseImg, filling: '20%', text: 'жалғастыру'},
  {courseImg, filling: '10%', text: 'жалғастыру'},
  {courseImg, filling: '70%', text: 'жалғастыру'},
  {courseImg, filling: '10%', text: 'жалғастыру'},
  {courseImg, filling: '10%', text: 'жалғастыру'},
]

const webinarItems = [
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem1, date: '20 agust 2020', progress: '0%'},
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem2, date: '20 agust 2020', progress: '0%'},
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem3, date: '20 agust 2020', progress: '0%'},
  {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '/', img: thingItem4, date: '20 agust 2020', progress: '0%'},
]

const MyCourses = () => {

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

          {webinarItems.map((item, index) => {
            return (
              <div className="myCoursesBottom__column">

                <div className="myCoursesBottom__img">
                  <img src={item.img} alt="item"/>
                </div>

                <div className="myCoursesBottom__text">{item.text}</div>

                <div className="myCoursesBottom__date">
                  <a href={item.link}>{item.date}</a>
                </div>

                <div className="myCoursesBottom__percent">
                  <span>{item.progress}</span>
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