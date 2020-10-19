import React, {useState} from 'react'
import './materials.scss'
import Tabs from '../../landing/components/Tabs/tabs'

import item0img1 from '../../../images/general/materials/items0/item1.png'
import item0img2 from '../../../images/general/materials/items0/item2.png'
import item0img3 from '../../../images/general/materials/items0/item3.png'
import item0img4 from '../../../images/general/materials/items0/item4.png'
import item0img5 from '../../../images/general/materials/items0/item5.png'
import item0img6 from '../../../images/general/materials/items0/item6.png'
import item0img7 from '../../../images/general/materials/items0/item7.png'
import item0img8 from '../../../images/general/materials/items0/item8.png'
import item0img9 from '../../../images/general/materials/items0/item9.png'
import item0img10 from '../../../images/general/materials/items0/item10.png'
import item0img11 from '../../../images/general/materials/items0/item11.png'

import item1img1 from '../../../images/general/materials/items1/item1.png'
import item1img2 from '../../../images/general/materials/items1/item2.png'
import item1img3 from '../../../images/general/materials/items1/item3.png'
import item1img4 from '../../../images/general/materials/items1/item4.png'
import item1img5 from '../../../images/general/materials/items1/item5.png'
import item1img6 from '../../../images/general/materials/items1/item6.png'
import item1img7 from '../../../images/general/materials/items1/item7.png'

import item2img1 from '../../../images/general/materials/items2/item1.png'
import item2img2 from '../../../images/general/materials/items2/item2.png'
import item2img3 from '../../../images/general/materials/items2/item3.png'
import item2img4 from '../../../images/general/materials/items2/item4.png'
import item2img5 from '../../../images/general/materials/items2/item5.png'
import item2img6 from '../../../images/general/materials/items2/item6.png'
import item2img7 from '../../../images/general/materials/items2/item7.png'
import item2img8 from '../../../images/general/materials/items2/item8.png'
import item2img9 from '../../../images/general/materials/items2/item9.png'
import item2img10 from '../../../images/general/materials/items2/item10.png'

import item3img1 from '../../../images/general/materials/items3/item1.png'
import item3img2 from '../../../images/general/materials/items3/item2.png'
import item3img3 from '../../../images/general/materials/items3/item3.png'
import item3img4 from '../../../images/general/materials/items3/item4.png'
import item3img5 from '../../../images/general/materials/items3/item5.png'
import item3img6 from '../../../images/general/materials/items3/item6.png'
import item3img7 from '../../../images/general/materials/items3/item7.png'
import item3img8 from '../../../images/general/materials/items3/item8.png'
import item3img9 from '../../../images/general/materials/items3/item9.png'
import item3img10 from '../../../images/general/materials/items3/item10.png'
import item3img11 from '../../../images/general/materials/items3/item11.png'
import item3img12 from '../../../images/general/materials/items3/item12.png'

import item4img1 from '../../../images/general/materials/items4/item1.png'
import item4img2 from '../../../images/general/materials/items4/item2.png'
import item4img3 from '../../../images/general/materials/items4/item3.png'
import item4img4 from '../../../images/general/materials/items4/item4.png'
import item4img5 from '../../../images/general/materials/items4/item5.png'
import item4img6 from '../../../images/general/materials/items4/item6.png'
import item4img7 from '../../../images/general/materials/items4/item7.png'
import item4img8 from '../../../images/general/materials/items4/item8.png'
import item4img9 from '../../../images/general/materials/items4/item9.png'
import item4img10 from '../../../images/general/materials/items4/item10.png'


const Materials = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const items = [
    {id: 0, title: 'ҰБТ'},
    {id: 1, title: 'НЗМ'},
    {id: 2, title: 'БИЛ'},
    {id: 3, title: 'Қосымша'},
    {id: 4, title: 'Тесттер'},
  ]

  const contentItems = [
    {id: 0, images: [item0img1, item0img2, item0img3, item0img4, item0img5, item0img6, item0img7, item0img8, item0img9, item0img10, item0img11]},
    {id: 1, images: [item1img1, item1img2, item1img3, item1img4, item1img5, item1img6, item1img7]},
    {id: 2, images: [item2img1, item2img2, item2img3, item2img4, item2img5, item2img6, item2img7, item2img8, item2img9, item2img10]},
    {id: 3, images: [item3img1, item3img2, item3img3, item3img4, item3img5, item3img6, item3img7, item3img8, item3img9, item3img10, item3img11, item3img12],},
    {id: 4, images: [item4img1, item4img2, item4img3, item4img4, item4img5, item4img6, item4img7, item4img8, item4img9, item4img10]},
  ]

  const changeTabs = event => {
    if (event.target.classList.contains('tabs__item')) {

      if (event.target.classList.contains('active-tab')) {
        return null
      } else {
        const id = +event.target.dataset.tabid
        unActivateTab(event.currentTarget)
        event.target.classList.add('active-tab')
        setCurrentTab(id)
      }

    }
  }

  const unActivateTab = target => {
    const tabs = target.querySelectorAll('.tabs__item')
    tabs.forEach(item => {
      item.classList.remove('active-tab')
    })
  }

  return (
    <section className="materials">
      <div className="materials__container _container">
        <h1 className="materials__title">Материалдар</h1>
        <Tabs useDefTabs={changeTabs} data={items} className="materials__tabs"/>

        <div className="materials__content">
          {contentItems
            .filter(item => item.id === currentTab)
            .map((item, index) => {
            return item.images.map((item, index1) => {
              return (
                <div key={index + index1} className="materials__item">
                  <img src={item} alt="material"/>
                </div>
              )
            })
          })}
        </div>
      </div>
    </section>
  )
}

export default Materials