import React from 'react'
import './buySubject.scss'
import ThingCard from '../../../landing/components/ThingCard/ThingCard'

import itemIcon1 from '../../../../images/general/courses/tab-thing1.jpg'
import itemIcon2 from '../../../../images/general/courses/tab-thing2.jpg'
import itemIcon3 from '../../../../images/general/courses/tab-thing3.jpg'
import itemIcon4 from '../../../../images/general/courses/tab-thing4.jpg'
import itemIcon5 from '../../../../images/general/courses/tab-thing5.jpg'
import itemIcon6 from '../../../../images/general/courses/tab-thing6.jpg'
import itemIcon7 from '../../../../images/general/courses/tab-thing7.jpg'
import itemIcon8 from '../../../../images/general/courses/tab-thing8.jpg'
import itemIcon9 from '../../../../images/general/courses/tab-thing9.jpg'
import itemIcon10 from '../../../../images/general/courses/tab-thing10.jpg'
import itemIcon11 from '../../../../images/general/courses/tab-thing11.jpg'
import itemIcon12 from '../../../../images/general/courses/tab-thing12.jpg'

const things = [
  {img: itemIcon1, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon2, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon3, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon4, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon5, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon6, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon7, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon8, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon9, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon10, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon11, curPrice: '99999 ₸', rating: 5},
  {img: itemIcon12, curPrice: '99999 ₸', rating: 5},
]

const BuySubject = () => {


  return (
    <section className="buySubject">

      <p className="buySubject__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit nibh ut hac eget.
        Diam eget egestas viverra elementum. Elit porttitor vestibulum morbi faucibus donec felis sit laoreet consequat.
        Bibendum malesuada et viverra posuere tincidunt lectus. </p>

      <div className="buySubject__mainSubject buyMainSubject">

        <div className="buyMainSubject__content">
          <ThingCard item={{img: itemIcon1, rating: 5, curPrice: '99999 ₸',  important: true}}/>
        </div>

      </div>

      <div className="buySubject__items buySubjectItems">
        <div className="buySubjectItems__content">

          <div className="buySubjectItems__column">
            <div className="buySubjectItems__item">
              <div className="buySubjectItems__action">-10</div>

              <div className="buySubjectItems__month">1 айға</div>

              <div className="buySubjectItems__line"/>

              <div className="buySubjectItems__price">99999 ₸</div>
              <div className="buySubjectItems__oldPrice">99999 ₸</div>
            </div>
          </div>

          <div className="buySubjectItems__column">
            <div className="buySubjectItems__item">
              <div className="buySubjectItems__action">-10</div>

              <div className="buySubjectItems__month">3 айға</div>

              <div className="buySubjectItems__line"/>

              <div className="buySubjectItems__price">99999 ₸</div>
              <div className="buySubjectItems__oldPrice">99999 ₸</div>
            </div>
          </div>

          <div className="buySubjectItems__column">
            <div className="buySubjectItems__item">
              <div className="buySubjectItems__action">-10</div>

              <div className="buySubjectItems__month">6 айға</div>

              <div className="buySubjectItems__line"/>

              <div className="buySubjectItems__price">99999 ₸</div>
              <div className="buySubjectItems__oldPrice">99999 ₸</div>
            </div>
          </div>

          <div className="buySubjectItems__column">
            <div className="buySubjectItems__item">
              <div className="buySubjectItems__action">-10</div>

              <div className="buySubjectItems__month">9 айға</div>

              <div className="buySubjectItems__line"/>

              <div className="buySubjectItems__price">99999 ₸</div>
              <div className="buySubjectItems__oldPrice">99999 ₸</div>
            </div>
          </div>


        </div>
      </div>

      <div className="buySubject-button">
        <button className="buySubject-button__button">Төлем жасау</button>
      </div>

      <div className="buySubjectThings">

        <div className="buySubjectThings__content">

          {things.map((item, index) => {

            return (
              <ThingCard item={item} key={index + item.rating}/>
            )

          })}

        </div>

      </div>

    </section>
  )
}

export default BuySubject