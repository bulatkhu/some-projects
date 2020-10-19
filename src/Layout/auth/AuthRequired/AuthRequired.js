import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Login from '../../login/login'
import MyCourses from '../../login/containers/myCourses/myCourses'
import Chat from '../../login/containers/chat/chat'
import PromoCode from '../../login/containers/promoCode/promoCode'
import EditProfile from '../../login/containers/editProfile/editProfile'
import Payment from '../../login/containers/payment/payment'
import Calendar from '../../login/containers/calendar/calendar'
import BuySubject from '../../login/containers/buySubject/buySubject'
import Lesson from '../../general/lesson/lesson'
import Connect from '../../general/connect/connect'
import WatchCourse from '../../login/containers/watchCourse/watchCourse'
import TeacherPage from '../../general/teacherPage/teacherPage'
// import Subject from '../../general/subject/subject'
import TeacherCourses from '../../login/teacher/teacherCourses/teacherCourses'
import TeacherList from '../../login/teacher/teacherList/teacherList'
import TutorEducoin from '../../login/tutor/tutorEducoin/tutorEducoin'
import TutorCalendar from '../../login/tutor/tutorCalendar/tutorCalendar'
import studentPhoto from '../../../images/login/navbar/profilePhoto.jpg'
import teacherPhoto from '../../../images/login/navbar/teacherPhoto.jpg'


const loggedInfo = {
  student: {
    name: 'Student name',
    type: 'student',
    photo: studentPhoto,
    coins: 99999,
    links: {
      base: '/student',
      chat: '/student/chat',
      promo: '/student/promo',
      edit: '/student/edit',
      payment: '/student/payment',
      calendar: '/student/calendar',
      buy: '/student/buy',
      lesson: '/student/lesson',
      connecting: '/student/connecting',
      watchCourse: '/student/watchCourse',
    }
  },
  teacher: {
    name: 'Teacher name',
    type: 'teacher',
    photo: teacherPhoto,
    links: {
      base: '/teacher',
      calendar: '/teacher/calendar',
    }
  },
  tutor: {
    name: 'Tutor name',
    type: 'tutor',
    photo: teacherPhoto,
    links: {
      base: '/tutor',
    }
  }
}


const AuthRequired = ({isAuth}) => {
  const {teacher, student, tutor} = loggedInfo


  return (
    <>
      {
        isAuth
          ? <>
            <Route path="/student">
              <Login
                {...teacher}
                name={teacher.name}
                photo={student.photo}
                type="student"
                coins={student.coins}
                links={student.links}
              >
                <Route exact path={student.links.base} component={MyCourses}/>
                <Route exact path={student.links.chat} component={Chat}/>
                <Route exact path={student.links.promo} component={PromoCode}/>
                <Route exact path={student.links.edit}>
                  <EditProfile type={student.type}/>
                </Route>
                <Route exact path={student.links.payment} component={Payment}/>
                <Route exact path={student.links.calendar} component={Calendar}/>
                <Route exact path={student.links.buy} component={BuySubject}/>
                <Route exact path={student.links.lesson} component={Lesson}/>
                <Route exact path={student.links.connecting} component={Connect}/>
                <Route exact path={student.links.watchCourse} component={WatchCourse}/>


                <Route path="/student/teacher" component={TeacherPage}/>
                {/*<Route path="/student/subject" component={Subject}/>*/}

                {/*<Route path="*" component={NotFound}/>*/}
              </Login>
            </Route>

            <Route path="/teacher">
              <Login
                {...teacher}
                photo={teacher.photo}
                type="teacher"
                links={teacher.links}
              >
                <Route exact path="/teacher">
                  <TeacherCourses/>
                </Route>
                <Route exact path={teacher.links.base + '/calendar'}>
                  <Calendar/>
                </Route>
                <Route exact path={teacher.links.base + '/list'}>
                  <TeacherList/>
                </Route>
                <Route exact path={teacher.links.base + '/chat'}>
                  <Chat/>
                </Route>
                <Route exact path={teacher.links.base + '/edit'}>
                  <EditProfile type={teacher.type}/>
                </Route>
                <Route exact path={teacher.links.base + '/connecting'}>
                  <Connect/>
                </Route>
              </Login>
            </Route>

            <Route path="/tutor">
              <Login
                {...tutor}
                photo={teacher.photo}
                links={tutor.links}
                type="tutor"
              >
                <Route path={tutor.links.base + '/list'}>
                  <TeacherList/>
                </Route>
                <Route path={tutor.links.base + '/chat'}>
                  <Chat/>
                </Route>
                <Route path={tutor.links.base + '/educoin'}>
                  <TutorEducoin/>
                </Route>
                <Route path={tutor.links.base + '/edit'}>
                  <EditProfile type={tutor.type}/>
                </Route>
                <Route path={tutor.links.base + '/calendar/:id?'}>
                  <TutorCalendar/>
                </Route>
              </Login>
            </Route>
          </>
          : <Redirect to="/"/>
      }
    </>
  )

}

export default AuthRequired