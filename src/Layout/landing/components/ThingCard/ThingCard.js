import React from 'react'
import Stars from '../../../general/stars/stars'

const ThingCard = ({item}) => {
  const {img, rating, curPrice, tab} = item

  return (
    <div className="bottom__column" data-item="true" data-forid={tab}>
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