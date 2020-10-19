import React from 'react'
import './teachersRoute.scss'
import teacherIcon1 from '../../../images/general/teachersRoute/teacher-icon1.jpg'
import teacherIcon2 from '../../../images/general/teachersRoute/teacher-icon2.jpg'
import teacherIcon3 from '../../../images/general/teachersRoute/teacher-icon3.jpg'
import teacherIcon4 from '../../../images/general/teachersRoute/teacher-icon4.jpg'
import teacherIcon5 from '../../../images/general/teachersRoute/teacher-icon5.jpg'

const initialTeachers = [
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon1},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon2},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon3},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon4},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon5},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon1},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon2},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon3},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon4},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon5},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon1},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon2},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon3},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon4},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon5},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon1},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon2},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon3},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon4},
  {name: 'Teacher Name', subject: 'Math Teacher', img: teacherIcon5},
]

const TeachersRoute = () => {

  return (
    <section className="teachersRoute">

      <div className="teachersRoute__container _container">
        <h1 className="teachersRoute__title">Ұстаздар</h1>

        <div className="teachersRoute__content">

          {initialTeachers.map((item, index) => {
            return (
              <div key={index} className="teachersRoute__column teachersRouteCol">
                <div className="teachersRouteCol__img">
                  <img src={item.img} alt="teacher"/>
                </div>
                <div className="teachersRouteCol__name">{item.name}</div>
                <div className="teachersRouteCol__subject">Math Teacher</div>
              </div>
            )
          })}

        </div>
      </div>
      
    </section>
  )
}

export default TeachersRoute