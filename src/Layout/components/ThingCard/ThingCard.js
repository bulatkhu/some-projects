import React from 'react'

const ThingCard = ({item}) => {
  const {img, title, rating, curPrice, oldPrice, tab} = item
  const currentRating = rating.charAt(0)

  const array = [1, 2, 3, 4, 5]
  array.length = currentRating

  return (
    <div className="bottom__column" data-item="true" data-forid={tab}>
      <div className="bottom__item">
        <div className="bottom__item_img">
          <img src={img} alt="thing"/>
        </div>
        <div className="bottom__item_title">{title}</div>
        <div className="bottom__item_mark item_mark">
          <span className="item_mark__value">{rating}</span>
          <span className="item_mark__stars">
            {array.map((item) => <span key={item}/>)}
          </span>
        </div>
        <div className="bottom__item_price item_price">
          <span className="item_price__current">{curPrice}</span>
          {oldPrice
            ? <span className="item_price__old">{oldPrice}</span>
            : null}
        </div>
        <button className="bottom__item_button item_button">
          Bestseller
        </button>
      </div>
    </div>
  )
}

export default ThingCard