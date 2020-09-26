import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.scss'
import Menu from './Layout/landing/containers/menu/menu'
import Footer from './Layout/landing/containers/footer/footer'
import Landing from './Layout/landing/landing'
import Login from './Layout/login/login'
import NotFound from './Layout/general/notFound/notFound'
import Materials from './Layout/general/materials/materials'
import Subject from './Layout/general/subject/subject'
import TeachersRoute from './Layout/general/teachersRoute/teachersRoute'
import Paying from './Layout/login/containers/paying/paying'
import MyCourses from './Layout/login/containers/myCourses/myCourses'
import Chat from './Layout/login/containers/chat/chat'
import PromoCode from './Layout/login/containers/promoCode/promoCode'
import EditProfile from './Layout/login/containers/editProfile/editProfile'
import Payment from './Layout/login/containers/payment/payment'
import Calendar from './Layout/login/containers/calendar/calendar'
import BuySubject from './Layout/login/containers/buySubject/buySubject'
import Lesson from './Layout/general/lesson/lesson'
import Connect from './Layout/general/connect/connect'
import WatchCourse from './Layout/login/containers/watchCourse/watchCourse'
import TeacherPage from './Layout/general/teacherPage/teacherPage'

const menuLinks = [
  {name: 'Негізгі', to: '/'},
  {name: 'Ұстаздар', to: '/teachers'},
  {name: 'Курстар', to: '/'},
  {name: 'Материалдар', to: '/materials'},
  {name: 'Блог', to: '/'},
  {name: 'EduCoin', to: '/'},
]

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu links={menuLinks} isSignIn={false}/>



        <div className="app__wrapper">
          <Switch>
            <Route path="/login">
              <Login>
                <Route exact path="/login"             component={MyCourses}/>
                <Route exact path="/login/chat"        component={Chat}/>
                <Route exact path="/login/promo"       component={PromoCode}/>
                <Route exact path="/login/edit"        component={EditProfile}/>
                <Route exact path="/login/payment"     component={Payment}/>
                <Route exact path="/login/calendar"    component={Calendar}/>
                <Route exact path="/login/buy"         component={BuySubject}/>
                <Route exact path="/login/lesson"      component={Lesson}/>
                <Route exact path="/login/connecting"  component={Connect}/>
                <Route exact path="/login/watchCourse" component={WatchCourse}/>


                <Route path="/login/teacher" component={TeacherPage}/>
                <Route path="/login/subject" component={Subject}/>

                {/*<Route path="*" component={NotFound}/>*/}
              </Login>
            </Route>
            <Route exact path="/">
              <Landing/>
            </Route>
            <Route exact path="/teachers">
              <TeachersRoute/>
            </Route>
            <Route exact path="/materials">
              <Materials/>
            </Route>
            <Route exact path="/subject">
              <Subject container/>
            </Route>
            <Route exact path="/paying">
              <Paying/>
            </Route>



            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>



        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
