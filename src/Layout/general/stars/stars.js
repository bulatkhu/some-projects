import React from 'react'
import './stars.scss'


const Stars = ({rating, className, classNameOfValue}) => {

  const currentRating = +rating.toString().charAt(0)

  const array = [1, 2, 3, 4, 5]
  array.length = currentRating

  const otherStars = 5 - currentRating
  const someArr = [1, 2, 3, 4, 5]
  someArr.length = otherStars

  return (
    <div className={['item_mark', className].join(' ')}>
      <span className={['item_mark__value', classNameOfValue].join(' ')}>{rating}</span>
      <span className="item_mark__stars">
            {someArr.map((item, index) => <span className="grey" key={index}/>)}
        {array.map((item) => <span key={item}/>)}
          </span>
    </div>
  )
}

export default Stars