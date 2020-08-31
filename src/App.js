import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.scss'
import Menu from './Layout/landing/containers/menu/menu'
import Footer from './Layout/landing/containers/footer/footer'
import Landing from './Layout/landing/landing'
import Login from './Layout/login/login'
import NotFound from './Layout/general/notFound/notFound'
import Materials from './Layout/general/materials/materials'

const menuLinks = [
  {name: 'Негізгі', to: '/'},
  {name: 'Ұстаздар', to: '/'},
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
            <Route exact path="/materials">
              <Materials/>
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
