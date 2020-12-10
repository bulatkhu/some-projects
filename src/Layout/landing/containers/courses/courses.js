import React, { useMemo, useState } from 'react'
import ThingCard from '../../../landing/components/ThingCard/ThingCard'
import {getCoursesFromIndex} from '../../../../request/apiRequests'
import './courses.scss'


const Courses = () => {
  const [courses, setCourses] = useState(null)
  const [activeTab, setActiveTab] = useState(null)

  useMemo(async () => {

    try {
      const response = await getCoursesFromIndex()

      if (response.status === 200) {
        const courses = {}

        response.data.forEach(course => {
          if (courses[course.category.title]) {
            courses[course.category.title].push(course)
          } else {
            courses[course.category.title] = [course]
          }
        })

        setActiveTab(Object.keys(courses)[0])
        setCourses(courses)
      }
    } catch (e) {
      console.log('error', e)
    }

  }, [])



  return (
    <section className="courses">

      <div className="courses__header">
        <h2 className="courses__title">Курстарымыз</h2>

        <div className="tabs">
          {
            courses ? (
              Object.keys(courses).map((title, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(title)}
                    className={['tabs__item', 'btn__noFocus', activeTab === title ? 'active-tab' : null].join(' ')}
                  >
                    {title}
                  </button>
                )
              })
            ) : <div>No courses</div>
          }
        </div>

      </div>

      <div className="courses__bottom bottom">
        <div className="bottom__container _container">
          <div className="bottom__content">
            {
              courses && courses[activeTab].length ? (
                courses[activeTab].map((item1, index1) => <ThingCard key={index1} course={item1}/>)
              ) : null
            }
          </div>
        </div>
      </div>

    </section>
  )
}



export default Courses
