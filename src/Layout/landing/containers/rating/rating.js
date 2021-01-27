import React, {useEffect, useState} from 'react'
import {Translate} from 'react-translated'
import TableItem from '../../../landing/components/TableItem/TableItem'
import {ApiSetRatingByBonus} from '../../../../request/apiRequests'
import Loader from '../../../general/component/loader/loader'
import './rating.scss'

const Rating = () => {
  const [studentList, setStudentList] = useState(null)


  useEffect(() => {

    ApiSetRatingByBonus()
      .then(res => {
        const students = res.data.students
        students.length = 15

        setStudentList(students)
        console.log('res', students)

      })


  },[])


  return (
    <section id="rating" className="rating">
      <div className="rating__container _container">
        <h3 className="rating__title"><Translate text="EduCoin рейтинг"/></h3>


        {
          studentList
            ? (
              <div className="rating__tableWrapper default-scroll">
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
                  <tbody className="rateTable__body default-scroll">
                  {
                    studentList.map((item, index) => (
                      <TableItem item={item} rating={index + 1} key={index}/>
                    ))
                  }
                  </tbody>

                </table>
              </div>
            )
            : <Loader/>
        }

      </div>
    </section>
  )
}

export default Rating
