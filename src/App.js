import React from 'react'
import './App.scss'
import Menu from './Layout/containers/menu/menu'
import Main from "./Layout/containers/main/main";
import Features from "./Layout/containers/features/features";
import Literacy from "./Layout/containers/literacy/literacy";
import Courses from "./Layout/containers/courses/courses";
import Marathon from "./Layout/containers/marathon/marathon";
import Teachers from "./Layout/containers/teachers/teachers";
import Footer from "./Layout/containers/footer/footer";

const menuLinks = [
  {name: 'Негізгі', to: '/'},
  {name: 'Курстар', to: '/'},
  {name: 'Материалдар', to: '/'},
  {name: 'Профильt', to: '/'},
  {name: 'Сілтеме', to: '/'},
  {name: 'Байланыс', to: '/'},
]

function App() {
  return (
    <div className="App">
      <Menu
        links={menuLinks}
        isSignIn={false}
      />
      <Main/>
      <Features/>
      <Literacy/>
      <Courses/>
      <Marathon/>
      <Teachers/>
      <Footer/>
    </div>
  );
}

export default App;
