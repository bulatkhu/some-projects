import React from 'react'
import tabItem1 from '../../../images/courses/tab-thing1.svg'
import tabItem2 from '../../../images/courses/tab-thing2.svg'
import tabItem3 from '../../../images/courses/tab-thing3.svg'
import tabItem4 from '../../../images/courses/tab-thing4.svg'
import tabItem5 from '../../../images/courses/tab-thing5.svg'
import tabItem6 from '../../../images/courses/tab-thing6.svg'
import tabItem7 from '../../../images/courses/tab-thing7.svg'
import tabItem8 from '../../../images/courses/tab-thing8.svg'
import tabItem9 from '../../../images/courses/tab-thing9.svg'
import tabItem10 from '../../../images/courses/tab-thing10.svg'
import tabItem11 from '../../../images/courses/tab-thing11.svg'
import tabItem12 from '../../../images/courses/tab-thing12.svg'
import tabItem13 from '../../../images/courses/tab-thing13.svg'
import tabItem14 from '../../../images/courses/tab-thing14.svg'
import tabItem15 from '../../../images/courses/tab-thing15.svg'
import './courses.scss'
import ThingCard from '../../components/ThingCard/ThingCard'
import Tabs from '../../components/Tabs/tabs'

const dataTabs = [
  {title: 'ҰБТ', id: '1'},
  {title: 'НЗМ', id: '2'},
  {title: 'БИЛ', id: '3'},
  {title: 'Қосымша', id: '4'}
]

const boxThing = [
  {tab: 1, img: tabItem1, title: 'Қазақ әдебиеті', rating: '3,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 1, img: tabItem2, title: 'Орыс тілі', rating: '5,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 1, img: tabItem3, title: 'Орыс әдебиеті', rating: '1,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 1, img: tabItem4, title: 'Дүниежүзі тарихы', rating: '2,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 1, img: tabItem5, title: 'Математикалық сауаттылық', rating: '5,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 2, img: tabItem6, title: 'Қазақстан тарихы', rating: '3,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 2, img: tabItem7, title: 'Оқу сауаттылығы', rating: '5,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 2, img: tabItem8, title: 'Биология', rating: '4,0', curPrice: '9999 ₸', oldPrice: '109999 TG'},
  {tab: 2, img: tabItem9, title: 'Физика', rating: '2,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem10, title: 'Математика', rating: '4,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem11, title: 'Химия', rating: '5,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem12, title: 'Қазақ тілі', rating: '1,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem13, title: 'Ағылшын тілі', rating: '5,0', curPrice: '9999 ₸'},
  {tab: 4, img: tabItem14, title: 'АҚҚ', rating: '5,0', curPrice: '9999 ₸'},
  {tab: 4, img: tabItem15, title: 'География', rating: '5,0', curPrice: '9999 ₸'},
]

const Courses = () => {

  const tabHandler = event => {
    const {tabid} = event.target.dataset

    if (event.target.classList.contains('active-tab')) {
      return
    }

    if (tabid && +tabid !== 1) {

      selectCurrentTab(event, tabid)

      changeTabsElements(event.currentTarget, tabid)

    }

    else if (+tabid === 1) {

      selectCurrentTab(event, tabid)

      getAllThings(event.currentTarget).forEach(item => {
        item.classList.remove('unselectedTab')
      })


    }
  }

  const selectCurrentTab = event => {
    getAllTabs(event.currentTarget)
      .forEach(tab => tab.classList.remove('active-tab'))
    event.target.classList.add('active-tab')
  }

  const changeTabsElements = (target, id) => {
    getAllThings(target).forEach(thing => {

      if (+thing.dataset.forid !== +id) {

        if (!thing.classList.contains('unselectedTab')) {
          thing.classList.add('unselectedTab')
        }

        // скрыть

      } else {

        if (thing.classList.contains('unselectedTab')) {
          thing.classList.remove('unselectedTab')
        }

        // показать

      }
    })

  }

  const getAllThings = target => {
    return target.querySelectorAll('[data-item="true"]')
  }

  const getAllTabs = target => {
    return target.querySelectorAll('[data-tab="true"]')
  }

  return (
    <section className="courses" onClick={tabHandler}>

      <div className="courses__header">
        <h2 className="courses__title">Курстарымыз</h2>

        <Tabs data={dataTabs} />
        {/*<div className="courses__tabs tabs">*/}
        {/*  <div className="tabs__item active-tab" data-tab="true" data-tabid="1">ҰБТ</div>*/}
        {/*  <div className="tabs__item" data-tab="true" data-tabid="2">НЗМ</div>*/}
        {/*  <div className="tabs__item" data-tab="true" data-tabid="3">БИЛ</div>*/}
        {/*  <div className="tabs__item" data-tab="true" data-tabid="4">Қосымша</div>*/}
        {/*</div>*/}
      </div>

      <div className="courses__bottom bottom">
        <div className="bottom__container _container">
          <div className="bottom__content">
            {boxThing.map((item, index) => (
              <ThingCard key={index} item={item} />)
            )}
          </div>
        </div>
      </div>

    </section>
  )
}

export default Courses