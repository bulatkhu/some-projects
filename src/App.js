import React from 'react'
import {Switch, Route} from 'react-router-dom'
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
import './App.scss'


const menuLinks = [
  {name: 'Негізгі', to: '/'},
  {name: 'Ұстаздар', to: '/teachers'},
  {name: 'Курстар', to: '/'},
  {name: 'Материалдар', to: '/materials'},
  {name: 'Блог', to: '/'},
  {name: 'EduCoin', to: '/'},
]

function App(props) {
  // const location = useLocation()
  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [location.pathname])


  return (
    <div className="App">
      <Menu links={menuLinks} isSignIn={false}/>


      <div className="app__wrapper">


        <Switch>

          <Route exact path="/">
            <Landing/>
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
          <Route path="/teacher/:id" component={TeacherPage}/>


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
