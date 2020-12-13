import React from 'react'
import Select from 'react-select'
import './testComponent.scoped.scss'

const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
]


const TestComponent = () => {


  return (
    <div className="test">
      <h1 className="test__title">Тесттер</h1>

      <div className="test__wrapper">


        <div className="test__select">
          <Select options={flavourOptions}/>
        </div>


        <div className="test__tableWrapper">

          <table className="test__table testTable">
            <thead>
              <tr className="testTable__rowTitle">
                <th className="testTable__cellTitle">Тақырыптар</th>
                <th className="testTable__cellTitle">Сұрақ саны</th>
                <th className="testTable__cellTitle">Дұрысы</th>
                <th className="testTable__cellTitle">Қатесі</th>
                <th className="testTable__cellTitle">Көрсеткіш</th>
              </tr>
            </thead>
            <tbody>
              <tr className="testTable__row">
                <td className="testTable__cell">Тригонометрия</td>
                <td className="testTable__cell">2</td>
                <td className="testTable__cell">2</td>
                <td className="testTable__cell">0</td>
                <td className="testTable__cell">0%</td>
              </tr>
              <tr className="testTable__row">
                <td className="testTable__cell">Термодинамика</td>
                <td className="testTable__cell">1</td>
                <td className="testTable__cell">1</td>
                <td className="testTable__cell">0</td>
                <td className="testTable__cell">0%</td>
              </tr>
              <tr className="testTable__row">
                <td className="testTable__cell">Lorem Upson</td>
                <td className="testTable__cell">2</td>
                <td className="testTable__cell">2</td>
                <td className="testTable__cell">0</td>
                <td className="testTable__cell">0%</td>
              </tr>
              <tr className="testTable__row">
                <td className="testTable__cell">Lorem Upson</td>
                <td className="testTable__cell">1</td>
                <td className="testTable__cell">1</td>
                <td className="testTable__cell">0</td>
                <td className="testTable__cell">0%</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default TestComponent