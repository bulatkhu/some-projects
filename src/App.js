import React, {useState, useLayoutEffect, useEffect} from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import {connect} from 'react-redux'
import Menu from './Layout/landing/containers/menu/menu'
import Footer from './Layout/landing/containers/footer/footer'
import Landing from './Layout/landing/landing'
import NotFound from './Layout/general/notFound/notFound'
import Materials from './Layout/general/materials/materials'
import Subject from './Layout/general/subject/subject'
import TeachersRoute from './Layout/general/teachersRoute/teachersRoute'
import Paying from './Layout/login/containers/paying/paying'
import AuthRequired from './Layout/auth/AuthRequired/AuthRequired'
import TeacherPage from './Layout/general/teacherPage/teacherPage'
import EducoinPage from './Layout/general/educoinPage/educoinPage'
import HeaderMenu from './Layout/landing/containers/headerMenu/headerMenu'
import './App.scss'


const menuLinks = [
  {name: 'Негізгі', to: '/'},
  {name: 'Ұстаздар', to: '/teachers'},
  {name: 'Курстар', to: '/'},
  {name: 'Материалдар', to: '/materials'},
  {name: 'Блог', to: '/'},
  {name: 'EduCoin', to: '/educoin-page'},
]

function App(props) {
  const [isShowHeaderMenu, setIsShowHeaderMenu] = useState(true)
  const [isShowArrowUp, setIsShowArrowUp] = useState(false)

  useEffect(() => {

    console.log(isShowHeaderMenu)

  },[isShowHeaderMenu])

  window.onscroll = () => {

    console.log('scroll', window.pageYOffset)

    if (window.pageYOffset > 28) {

      console.log('window.pageYOffset > 28')

      setIsShowHeaderMenu(true)
    } else {
      setIsShowHeaderMenu(false)
    }

    if (window.pageYOffset > 300) {
      setIsShowArrowUp(true)
    } else {
      setIsShowArrowUp(false)
    }
  }


  return (
    <div className={`app ${isShowHeaderMenu ? 'padding' : 'minPadding'}`}>

      <div className="app__menubar">
        <HeaderMenu isHide={isShowHeaderMenu}/>
        <Menu links={menuLinks} isSignIn={false}/>
      </div>


      <div className="app__wrapper">
        <Switch>

          <Route exact path="/">
            <Landing showArrow={isShowArrowUp}/>
          </Route>

          <Route exact path="/teachers">
            <TeachersRoute/>
          </Route>
          <Route exact path="/materials">
            <Materials/>
          </Route>
          <Route exact path="/subject/:id?">
            <Subject container/>
          </Route>
          <Route exact path="/paying">
            <Paying/>
          </Route>
          <Route path="/teacher-page/:id" component={TeacherPage}/>
          <Route path="/educoin-page">
            <EducoinPage/>
          </Route>


          <AuthRequired isAuth={props.isAuth}/>

          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>

      <Footer/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    menu: state.menu,
    isAuth: state.auth.isAuthenticated
  }
}


export default connect(mapStateToProps)(App)
