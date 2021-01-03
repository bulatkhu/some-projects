import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Provider as TranslatedProvider} from 'react-translated'
import translation from './translation/translationMainPage'
import Menu from './Layout/landing/containers/menu/menu'
import Footer from './Layout/landing/containers/footer/footer'
import Landing from './Layout/landing/landing'
// import NotFound from './Layout/general/notFound/notFound'
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

const AppWrapper = React.memo(() => {

  return (
    <>
      <div className="app__wrapper">
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
        <Route path="/login">
          <AuthRequired/>
        </Route>
        <Route exact path="/paying">
          <Paying/>
        </Route>
        <Route path="/teacher-page/:id" component={TeacherPage}/>
        <Route path="/educoin-page" component={EducoinPage}/>
        {/*<Route path="*">*/}
        {/*  <NotFound/>*/}
        {/*</Route>*/}
      </div>

      <Footer/>
    </>
  )
})

function App({lang}) {
  const [isShowHeaderMenu, setIsShowHeaderMenu] = useState(false)
  const [menuFixed, setMenuFixed] = useState(true)

  const headerMenuHandler = () => {
    if (window.pageYOffset > 60) {
      setIsShowHeaderMenu(false)
    } else {
      setIsShowHeaderMenu(true)
    }

    if (window.pageYOffset > 1) {
      setMenuFixed(true)
    } else {
      setMenuFixed(false)
    }
  }


  useEffect(() => {

    onScrollWindows(headerMenuHandler)

    return () => deleteCallbackOnUnMounting(headerMenuHandler)
  }, [])

  useEffect(() => {

    if (lang) {
      setLocalLanguage(lang)
    }

  }, [lang])

  return (
    <TranslatedProvider language={lang} translation={translation}>
      <div className="app">
        <div className={['app__menubar', menuFixed ? 'fixed' : null].join(' ')}>
          <HeaderMenu isHide={isShowHeaderMenu}/>
          <Menu/>
        </div>

        <AppWrapper/>

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
