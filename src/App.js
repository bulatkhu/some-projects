import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.scss'
import Menu from './Layout/landing/containers/menu/menu'
import Footer from './Layout/landing/containers/footer/footer'
import Landing from './Layout/landing/landing'
import Login from './Layout/login/login'
import NotFound from './Layout/general/notFound/notFound'

const menuLinks = [
  {name: 'Негізгі', to: '/'},
  {name: 'Ұстаздар', to: '/'},
  {name: 'Курстар', to: '/'},
  {name: 'Материалдар', to: '/'},
  {name: 'Блог', to: '/'},
  {name: 'EduCoin', to: '/'},
]

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu links={menuLinks} isSignIn={false}/>


        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Landing/>
          </Route>



          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>



        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
