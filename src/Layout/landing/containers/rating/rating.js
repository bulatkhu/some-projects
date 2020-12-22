import React, {useState} from 'react'
import './rating.scss'
// import Tabs from '../../../landing/components/Tabs/tabs'
import TableItem from '../../../landing/components/TableItem/TableItem'
import {Translate} from "react-translated";


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
  const [showMore, setShowMore] = useState(false)

  const btnClickHandler = () => setShowMore(prev => !prev)


  const numberOfItems = showMore ? tableItems.length : 10

  return (
    <section id="rating" className="rating">
      <div className="rating__container _container">
        <h3 className="rating__title"><Translate text="EduCoin рейтинг"/></h3>

        <table className="rating__table rateTable">
          <thead className="rateTable__head">
          <tr className="rateTable__title rateTitle">
            <td className="rateTitle__none">&nbsp;</td>
            <th className="rateTitle__schoolboy"><Translate text="Аты-жөні"/></th>
            <th className="rateTitle__class"><Translate text="Қаласы"/></th>
            <th className="rateTitle__school"><Translate text="Мектеп"/></th>
            <th className="rateTitle__coins"><Translate text="EduCoin"/></th>
          </tr>
          </thead>
          <tbody className="rateTable__body">

          {
            tableItems.slice(0, numberOfItems).map((item, index) => (
              <TableItem item={item} key={item.rating + index}/>
            ))
          }

          </tbody>

        </table>
        <div className="rating__showMore showMore">
          <button
            onClick={btnClickHandler}
            className={['showMore__btn', 'btn', showMore ? 'btn__showed' : null].join(' ')}
          >
            Show More
            <span className="btn__arrow"/>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Rating
