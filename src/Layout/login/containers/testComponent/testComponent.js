import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import './testComponent.scoped.scss'
import {getStudentQuizzes} from '../../../../request/apiQuizzes'

// const flavourOptions = [
//   { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
//   { value: 'chocolate', label: 'Chocolate', rating: 'good' },
//   { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
//   { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
// ]
//
//
// const mockResults = [
//   {
//     lesson: 'Тригонометрия',
//     count_of_question: 2,
//     correct_answers: 2,
//     errors: 0,
//     percentage: 0,
//   },
//   {
//     lesson: 'Тригонометрия',
//     count_of_question: 1,
//     correct_answers: 1,
//     errors: 0,
//     percentage: 0,
//   },
//   {
//     lesson: 'Тригонометрия',
//     count_of_question: 2,
//     correct_answers: 2,
//     errors: 0,
//     percentage: 0,
//   },
//   {
//     lesson: 'Тригонометрия',
//     count_of_question: 1,
//     correct_answers: 1,
//     errors: 0,
//     percentage: 0,
//   },
// ]


const TestComponent = () => {
  const [results, setResults] = useState(null)
  const [coursesOption, setCoursesOption] = useState(null)
  const [currentCourse, setCurrentCourse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (!results) {

      getStudentQuizzes()
        .then(res => {
          const resResults = res.data.map(item => {
            const newItem = {...item}
            delete newItem.results

            const haveResults = (item.results && item.results[0]) ? {...item.results[0]} : null

            return {
              ...newItem,
              ...haveResults
            }
          })
          const coursesTitle = [...new Set(res.data.map(item => item.course))]
          const options = coursesTitle.map(item => ({ label: item, option: item }))
          setCoursesOption(options)
          setResults(resResults)
          if (options && options.length) {
            setCurrentCourse(options[0])
          }
        })
        .catch(err => {

          setError(err.message)
          console.log('err', err)

        })


    }



  },[results])


  return (
    <div className="test">
      <h1 className="test__title">Тесттер</h1>

      <div className="test__wrapper">


        {
          coursesOption && coursesOption.length
            ? (
              <div className="test__select">
                <Select
                  onChange={option => setCurrentCourse(option)}
                  value={currentCourse}
                  options={coursesOption}
                />
              </div>
            )
            : null
        }


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
            {
              results && results.length && currentCourse && !error
                ? (
                  results
                    .filter(item => item.course === currentCourse.option)
                    .map((item, index) => (
                      <tr className="testTable__row" key={index}>
                        <td className="testTable__cell">{item.lesson}</td>
                        <td className="testTable__cell">{item.count_of_questions}</td>
                        <td className="testTable__cell">{item.correct_answers}</td>
                        <td className="testTable__cell">{item.count_of_questions - item.correct_answers}</td>
                        <td className="testTable__cell">{item.percentage * 100}%</td>
                      </tr>
                    ))
                )
                : <tr>
                    <td colSpan="5">
                      <p className="error__middle text-center">{ error || 'No results' }</p>
                    </td>
                  </tr>
            }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default TestComponent