import React from 'react'
import Stars from '../../../general/stars/stars'
import './ThingCard.scss'

const ThingCard = ({item}) => {
  const {img, rating, curPrice, tab, important} = item
  const cls = ['bottom__column']

  if (important) {
    cls.push('bottom__border')
  }

  return (
    <div className={cls.join(' ')} data-item="true" data-forid={tab}>
      <div className="bottom__item">
        <div className="bottom__item_img">
          { img ? <img src={img} alt="thing"/> : null }
        </div>

        <Stars
          className="bottom__item_mark"
          classNameOfValue=""
          rating={rating}
        />
        <div className="bottom__item_price item_price">
          <span className="item_price__current">{curPrice}</span>
        </div>
        <button className="bottom__item_button item_button">
          Толығырақ
        </button>
      </div>
    </div>
  )
}

export default ThingCard