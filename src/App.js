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
              <Login/>
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
