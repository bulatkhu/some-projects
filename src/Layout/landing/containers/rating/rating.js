import React from 'react'
import {Translate} from 'react-translated'
import TableItem from '../../../landing/components/TableItem/TableItem'
import './rating.scss'


const tableItems = [
  {rating: 1, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 2, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 3, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 4, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 5, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 6, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 7, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 8, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 9, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 10, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 12, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 13, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 14, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 15, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 16, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
  {rating: 17, name: 'Student name', country: 'Almaty', school: 'School Name', coins: '99999'},
]

const Rating = () => {

  return (
    <section id="rating" className="rating">
      <div className="rating__container _container">
        <h3 className="rating__title"><Translate text="EduCoin рейтинг"/></h3>

        <table className="rating__table rateTable">
          <thead className="rateTable__head">
          <tr className="rateTable__title rateTitle">
            <th className="rateTitle__none"><div className="rateTitle__cell">&nbsp;</div></th>
            <th className="rateTitle__schoolboy"><div className="rateTitle__cell"><Translate text="Аты-жөні"/></div></th>
            <th className="rateTitle__class"><div className="rateTitle__cell"><Translate text="Қаласы"/></div></th>
            <th className="rateTitle__school"><div className="rateTitle__cell"><Translate text="Мектеп"/></div></th>
            <th className="rateTitle__coins"><div className="rateTitle__cell"><Translate text="EduCoin"/></div></th>
          </tr>
          </thead>
          <tbody className="rateTable__body">

          {
            tableItems.map((item, index) => (
              <TableItem item={item} key={item.rating + index}/>
            ))
          }

          </tbody>

        </table>
      </div>
    </section>
  )
}

export default Rating
