import React, {useEffect, useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Provider as TranslatedProvider} from 'react-translated'
import translation from './translation/translationMainPage'
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
import {setLocalLanguage} from './hooks/useLanguages'
import {deleteCallbackOnUnMounting, onScrollWindows} from './scripts/windowsEvents/windowsEvents'
import './App.scss'


function App({lang, isAuth}) {
  const [isShowHeaderMenu, setIsShowHeaderMenu] = useState(true)

  const headerMenuHandler = () => {
    if (window.pageYOffset > 45) {
      setIsShowHeaderMenu(false)
    } else {
      setIsShowHeaderMenu(true)
    }
  }


  useEffect(() => {

    onScrollWindows(headerMenuHandler)

    return () => deleteCallbackOnUnMounting(headerMenuHandler)
  },[])

  useEffect(() => {

    if (lang) {
      setLocalLanguage(lang)
    }

  },[lang])


  return (
    <TranslatedProvider language={lang} translation={translation}>
    <div className={`app ${isShowHeaderMenu ? 'padding' : 'minPadding'}`}>

      <div className="app__menubar">
        <HeaderMenu isHide={isShowHeaderMenu}/>
        <Menu isSignIn={false}/>
      </div>


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
            <Subject container details={false}/>
          </Route>
          <Route exact path="/paying">
            <Paying/>
          </Route>
          <Route path="/teacher-page/:id" component={TeacherPage}/>
          <Route path="/educoin-page" component={EducoinPage}/>


          <AuthRequired isAuth={isAuth}/>

          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>

      <Footer/>
    </div>
    </TranslatedProvider>
  )
}

const mapStateToProps = state => {
  return {
    menu: state.menu,
    isAuth: state.auth.isAuthenticated,
    lang: state.lang.value
  }
}


export default connect(mapStateToProps)(App)
