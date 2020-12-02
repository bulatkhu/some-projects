import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
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
import TeacherCourses from '../../login/teacher/teacherCourses/teacherCourses'
import TeacherList from '../../login/teacher/teacherList/teacherList'
import TutorEducoin from '../../login/tutor/tutorEducoin/tutorEducoin'
import TutorCalendar from '../../login/tutor/tutorCalendar/tutorCalendar'
import studentPhoto from '../../../images/login/navbar/profilePhoto.jpg'
import teacherPhoto from '../../../images/login/navbar/teacherPhoto.jpg'
import EduCoinComponent from '../../login/containers/eduCoin/eduCoin';
import NotFound from '../../general/notFound/notFound';
import {connect} from 'react-redux'


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
      eduCoin: '/student/eduCoin',
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
    type: 'mentor',
    photo: teacherPhoto,
    links: {
      base: '/mentor',
    }
  }
}


const renderStudentsRoutes = ({teacher, student}) => {

  return (
    <Route path="/student">
      <Login
        {...teacher}
        links={student.links}
      >
        <Switch>
          <Route exact path={student.links.base} component={MyCourses}/>
          <Route exact path={student.links.chat} component={Chat}/>
          <Route exact path={student.links.promo} component={PromoCode}/>
          <Route exact path={student.links.edit}>
            <EditProfile type={student.type}/>
          </Route>
          <Route exact path={student.links.payment} component={Payment}/>
          <Route exact path={student.links.eduCoin} component={EduCoinComponent}/>
          <Route exact path={student.links.calendar} component={Calendar}/>
          <Route exact path={student.links.buy} component={BuySubject}/>
          <Route exact path={student.links.lesson} component={Lesson}/>
          <Route exact path={student.links.connecting} component={Connect}/>
          <Route exact path={student.links.watchCourse} component={WatchCourse}/>
          <Route component={NotFound}/>
        </Switch>
      </Login>
    </Route>
  )
}

const renderMentorsRoutes = ({tutor}) => {
  return (
    <Route path="/mentor">
      <Login
        {...tutor}
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
        <Route path={tutor.links.base + '/calendar'}>
          <TutorCalendar/>
        </Route>
      </Login>
    </Route>
  )
}

const renderTeachersRoutes = ({teacher}) => {

  return (
    <Route path="/teacher">
      <Login
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
  )
}


const AuthRequired = ({isAuth, user}) => {
  const {teacher, student, tutor} = loggedInfo


  let RoutesToShow = () => {
    if (user) {
      if (user.type === 'teacher') {
        return renderTeachersRoutes({teacher})
      } else if (user.type === 'mentor') {
        return renderMentorsRoutes({tutor})
      } else if (user.type === 'student') {
        return renderStudentsRoutes({teacher, student})
      }
    } else {
      return renderStudentsRoutes({teacher, student})
    }
  }


  return (
    <>
      {
        isAuth
          ? <>
              <RoutesToShow/>
            </>
          : <Redirect to="/"/>
      }
    </>
  )

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(AuthRequired)
