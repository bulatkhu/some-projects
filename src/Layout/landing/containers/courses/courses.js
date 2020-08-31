import React from 'react'
import './courses.scss'
import tabItem1 from '../../../../images/general/courses/tab-thing1.jpg'
import tabItem2 from '../../../../images/general/courses/tab-thing2.jpg'
import tabItem3 from '../../../../images/general/courses/tab-thing3.jpg'
import tabItem4 from '../../../../images/general/courses/tab-thing4.jpg'
import tabItem5 from '../../../../images/general/courses/tab-thing5.jpg'
import tabItem6 from '../../../../images/general/courses/tab-thing6.jpg'
import tabItem7 from '../../../../images/general/courses/tab-thing7.jpg'
import tabItem8 from '../../../../images/general/courses/tab-thing8.jpg'
import tabItem9 from '../../../../images/general/courses/tab-thing9.jpg'
import tabItem10 from '../../../../images/general/courses/tab-thing10.jpg'
import tabItem11 from '../../../../images/general/courses/tab-thing11.jpg'
import tabItem12 from '../../../../images/general/courses/tab-thing12.jpg'
import tabItem13 from '../../../../images/general/courses/tab-thing13.jpg'
import ThingCard from '../../../landing/components/ThingCard/ThingCard'
import Tabs from '../../../landing/components/Tabs/tabs'

const dataTabs = [
  {title: 'ҰБТ', id: '1'},
  {title: 'НЗМ', id: '2'},
  {title: 'БИЛ', id: '3'},
]

const boxThing = [
  {tab: 1, img: tabItem1,  rating: '3,0', curPrice: '9999 ₸'},
  {tab: 1, img: tabItem2,  rating: '5,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem3,  rating: '1,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem4,  rating: '2,0', curPrice: '9999 ₸'},
  {tab: 1, img: tabItem5,  rating: '5,0', curPrice: '9999 ₸'},
  {tab: 2, img: tabItem6,  rating: '3,0', curPrice: '9999 ₸'},
  {tab: 2, img: tabItem7,  rating: '5,0', curPrice: '9999 ₸'},
  {tab: 2, img: tabItem8,  rating: '4,0', curPrice: '9999 ₸'},
  {tab: 2, img: tabItem9,  rating: '2,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem10, rating: '4,0', curPrice: '9999 ₸'},
  {tab: 3, img: null,      rating: '4,0', curPrice: '9999 ₸'},
  {tab: 3, img: null,      rating: '4,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem11, rating: '5,0', curPrice: '9999 ₸'},
  {tab: 3, img: tabItem12, rating: '1,0', curPrice: '9999 ₸'},
  {tab: 2, img: null,      rating: '4,0', curPrice: '9999 ₸'},
  {tab: 2, img: tabItem13, rating: '5,0', curPrice: '9999 ₸'}
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

        <Tabs useDefTabs={false} data={dataTabs} />
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