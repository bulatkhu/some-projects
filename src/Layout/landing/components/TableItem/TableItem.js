import React from 'react'
import './TableItem.scss'


const TableItem = ({item}) => {

  const cls = ['rate__wrapper']

  if (+item.rating === 1) {
    cls.push('circle__gold')
  } else if (+item.rating === 2) {
    cls.push('circle__silver')
  } else if (+item.rating === 3) {
    cls.push('circle__bronze')
  }

  return (
    <tr className="rateRow" key={item.rating}>
      <td className="rateRow__number">
        <div className="cellWrapper">
          <span className={cls.join(' ')}>{item.rating}</span>
        </div>
      </td>
      <td className="rateRow__name"><div className="cellWrapper">{item.name}</div></td>
      <td className="rateRow__class"><div className="cellWrapper">{item.country}</div></td>
      <td className="rateRow__school"><div className="cellWrapper">{item.school}</div></td>
      <td className="rateRow__coins coins">
        <div className="coins__wrapper cellWrapper">
          <div className="coins__image"/>
          <div className="coins__text">
            {item.coins}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default TableItem
