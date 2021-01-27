import React from 'react'
import './TableItem.scss'


const TableItem = ({item, rating}) => {

  const cls = ['rate__wrapper']

  if (+rating === 1) {
    cls.push('circle__gold')
  } else if (+rating === 2) {
    cls.push('circle__silver')
  } else if (+rating === 3) {
    cls.push('circle__bronze')
  }

  return (
    <tr className="rateRow">
      <td className="rateRow__number">
        <div className="cellWrapper">
          <span className={cls.join(' ')}>{rating}</span>
        </div>
      </td>
      <td className="rateRow__name"><div className="cellWrapper">{item.name }</div></td>
      <td className="rateRow__class"><div className="cellWrapper">{item.country || 'No info'}</div></td>
      <td className="rateRow__school"><div className="cellWrapper">{item.school || 'No info'}</div></td>
      <td className="rateRow__coins coins">
        <div className="coins__wrapper cellWrapper">
          <div className="coins__image"/>
          <div className="coins__text">
            {item.rate_point}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default TableItem
