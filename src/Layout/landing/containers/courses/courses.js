import React, { useMemo, useState } from 'react'
import './courses.scss'
// import tabItem1 from '../../../../images/general/courses/tab-thing1.jpg'
// import tabItem2 from '../../../../images/general/courses/tab-thing2.jpg'
// import tabItem3 from '../../../../images/general/courses/tab-thing3.jpg'
// import tabItem4 from '../../../../images/general/courses/tab-thing4.jpg'
// import tabItem5 from '../../../../images/general/courses/tab-thing5.jpg'
// import tabItem6 from '../../../../images/general/courses/tab-thing6.jpg'
// import tabItem7 from '../../../../images/general/courses/tab-thing7.jpg'
// import tabItem8 from '../../../../images/general/courses/tab-thing8.jpg'
// import tabItem9 from '../../../../images/general/courses/tab-thing9.jpg'
// import tabItem10 from '../../../../images/general/courses/tab-thing10.jpg'
// import tabItem11 from '../../../../images/general/courses/tab-thing11.jpg'
// import tabItem12 from '../../../../images/general/courses/tab-thing12.jpg'
// import tabItem13 from '../../../../images/general/courses/tab-thing13.jpg'
import ThingCard from '../../../landing/components/ThingCard/ThingCard'
import Tabs from '../../../landing/components/Tabs/tabs'
import {connect} from 'react-redux'
import {setActiveTab} from '../../../../redux/actions/coursesTab/coursesTabActionsFunc'
import {getCoursesFromIndex} from "../../../../request/apiRequests";



const Courses = props => {
  const [courses, setCourses] = useState([])

  useMemo(async () => {

    try {
      const response = await getCoursesFromIndex()
      const courses = response.data.data.content

      const coursesArray = Object
        .keys(courses)
        .map(item => ({title: item, courses: courses[item]}))
        .filter(course => course.title === 'new' || course.title === 'popular' || course.title === 'vip'
          || course.title === 'sell')

      setCourses(() => coursesArray)
    } catch (e) {
      console.log('error', e)
    }

  }, [])



  return (
    <section className="courses">

      <div className="courses__header">
        <h2 className="courses__title">Курстарымыз</h2>

        {
          courses.length
            ? <Tabs useDefTabs={false} data={courses} />
            : null
        }

      </div>

      <div className="courses__bottom bottom">
        <div className="bottom__container _container">
          <div className="bottom__content">
            {courses.filter(item => item.title === props.activeTab).map((item) => {
              return item.courses.map((item1, index1) => <ThingCard key={index1} course={item1} />)
            })}
          </div>
        </div>
      </div>

    </section>
  )
}

function mapStateToProps(state) {
  return {
    activeTab: state.courseTab.activeTab
  }
}


function mapDispatchToProps(dispatch) {
  return {
    selectTab: tab => dispatch(setActiveTab(tab))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Courses)
