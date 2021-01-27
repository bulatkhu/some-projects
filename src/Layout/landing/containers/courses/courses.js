import React, {useEffect, useState} from 'react'
import { Translate as ReactTranslate } from 'react-translated'
import ThingCard from '../../../landing/components/ThingCard/ThingCard'
import {getCoursesFromIndex} from '../../../../request/apiRequests'
import Playlist from '../playlist/playlist'
import './courses.scss'
import Loader from "../../../general/component/loader/loader";



const Courses = () => {
  const [courses, setCourses] = useState(null)
  const [activeTab, setActiveTab] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {

    getCoursesFromIndex()
      .then(response => {
        if (response.status === 200) {
          const courses = {}

          response.data.forEach(course => {
            const {metas} = course

            if (metas) {
              const cover = metas.find(meta => meta.option === 'cover')

              if (cover && cover.value) {
                course.img = cover.value
              } else {
                course.img = null
              }
            } else {
              course.img = null
            }

            if (courses[course.category.title]) {
              courses[course.category.title].push(course)
            } else {
              courses[course.category.title] = [course]
            }
          })

          setIsLoaded(true)
          setActiveTab(Object.keys(courses)[0])
          setCourses(courses)
        }
      })
      .catch(err => {
        console.log('courses error', err)
      })

  }, [])


  if (!isLoaded) {
    return (
      <Loader container/>
    )
  }

  return (
    <>
      <section  id="courses" className="courses">

        <div className="courses__header">
          <h2 className="courses__title"><ReactTranslate text="Курстарымыз"/></h2>

          <div className="tabs">
            {
              courses && isLoaded ? (
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

        {
          courses && courses[activeTab].length ? (
            <div className="courses__bottom bottom">
              <div className="bottom__container _container">
                <div className="bottom__content">
                  {courses[activeTab].map((item1, index1) => <ThingCard key={index1} course={item1}/>)}
                </div>
              </div>
            </div>
          ) : null
        }

      </section>
      <Playlist activeTab={activeTab} courses={courses}/>
    </>
  )
}



export default Courses
