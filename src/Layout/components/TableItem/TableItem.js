import React from 'react'
import arcIcon from '../../../images/educoin/eduCoin.svg'
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
        <span className={cls.join(' ')}>{item.rating}</span>
      </td>
      <td className="rateRow__name">{item.name}</td>
      <td className="rateRow__class">{item.country}</td>
      <td className="rateRow__school">{item.school}</td>
      <td className="rateRow__coins coins">
        <div className="coins__wrapper">
          <div className="coins__image">
            <div className="coins__arc">
              <img src={arcIcon} alt="arc"/>
            </div>
          </div>
          <div className="coins__text">
            {item.coins}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default TableItem