import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {ChatIcon} from '../../../../images/general/menuIcons/infoIcon'
import {getChatMentors} from '../../../../request/apiRequests'
import Loader from '../../../general/component/loader/loader'
import './teacherList.scoped.scss'

const listContent = [
  {
    place: null,
    name: 'Name Name sd',
    date: null,
    courses: null,
    review: null,
    testResult: null,
    coins: null,
    chat: null,
    status: null
  },
  // {
  //   place: 1,
  //   name: 'Name Name sd',
  //   date: '15.01.2020',
  //   courses: 2,
  //   review: 13,
  //   testResult: 10,
  //   coins: 100000,
  //   chat: 1,
  //   status: 'онлайн'
  // },
  {
    place: 2,
    name: 'Name Name a',
    date: '13.02.2020',
    courses: 3,
    review: 23,
    testResult: 12,
    coins: 145000,
    chat: 3,
    status: 'кеше'
  },
  {
    place: 3,
    name: 'Name Name as',
    date: '14.01.2020',
    courses: 5,
    review: 33,
    testResult: 45,
    coins: 180020,
    chat: 4,
    status: '2 күн'
  },
  {
    place: 4,
    name: 'Name Name sd',
    date: '18.10.2019',
    courses: 9,
    review: 53,
    testResult: 75,
    coins: 140070,
    chat: 3,
    status: 'онлайн'
  },
  {
    place: 5,
    name: 'Name Name d',
    date: '16.10.2017',
    courses: 4,
    review: 63,
    testResult: 80,
    coins: 120500,
    chat: 2,
    status: '8 күн бұрын'
  },
  {
    place: 6,
    name: 'Name Name dc',
    date: '17.11.2018',
    courses: 2,
    review: 33,
    testResult: 25,
    coins: 159980,
    chat: 6,
    status: 'кеше'
  },
  {
    place: 7,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 8,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 9,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 10,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 11,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 12,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 13,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 14,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 15,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 16,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 17,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
  {
    place: 18,
    name: 'Name Name f',
    date: '15.02.2020',
    courses: 1,
    review: 12,
    testResult: 81,
    coins: 203000,
    chat: 3,
    status: '2 күн'
  },
]


const counterState = {
  sortName: { touched: false, sort: false },
  sortDate: { touched: false, sort: false },
  sortCourses: { touched: false, sort: false },
  sortReview: { touched: false, sort: false },
  sortTests: { touched: false, sort: false },
  sortCoins: { touched: false, sort: false },
  sortStatus: { touched: false, sort: false }
}

const TeacherList = ({type}) => {
  // eslint-disable-next-line no-unused-vars
  const [students, setStudents] = useState(listContent)
  const [secondList, setSecondList] = useState(listContent)
  const [counter, setCounter] = useState(counterState)
  const [inputValue, setInputValue] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    try {

     if (type) {

       getChatMentors(type)
         .then(res => {
           const {students} = res.data

           const newStudents = students.map(item => {
             const student = {...item, ...item.user}
             delete item.user
             return student
           })

           // console.log('students', newStudents)

           setStudents(newStudents)
           setSecondList(newStudents)



           setIsLoaded(true)
         })
         .catch(err => {
           setIsLoaded(true)
           throw new Error(err)
         })


     }


    } catch (e) {
      console.error('error mentor / teacher list', e)
    }
  },[type])

  const formatDate = (date) => {
    const newDate = date.split('.')
    const firstValue = newDate.slice(0,1)
    const lastValue = newDate.slice(-1,3)
    newDate.splice(0, 1, ...lastValue)
    newDate.splice(-1, 1, ...firstValue)
    return newDate.join('-')
  }


  useEffect(() => {
    const {sortName, sortDate, sortCourses, sortReview, sortTests, sortCoins, sortStatus} = counter

    const sortByLettersAndSet = (array, argument, type = 'top') => {
      type === 'top'
        ? setSecondList(array.slice()
          .sort((a, b) => ('' + a[argument]).localeCompare(b[argument])))
        : setSecondList(array.slice()
          .sort((a, b) => ('' + b[argument]).localeCompare(a[argument])))
    }

    const sortByDateAndSet = (array, type = 'top') => {
      type === 'top'
        ? setSecondList(array.slice()
          .sort((a, b) => new Date(formatDate(b.date)) - new Date(formatDate(a.date))))
        : setSecondList(array.slice()
          .sort((a, b) => new Date(formatDate(a.date)) - new Date(formatDate(b.date))))
    }

    const sortByNumbersAndSet = (array, argument, type = 'top') => {
      type === 'top'
        ? setSecondList(array.slice()
          .sort((a, b) => +b[argument] - +a[argument]))
        : setSecondList(array.slice()
          .sort((a, b) => +a[argument] - +b[argument]))

    }

    if (sortName.sort && sortName.touched) {
      sortByLettersAndSet(students,'name','top')
    } else if (!sortName.sort && sortName.touched) {
      sortByLettersAndSet(students,'name','reverse')
    }

    if (sortDate.sort && sortDate.touched) {
      sortByDateAndSet(students,'top')
    } else if (!sortDate.sort && sortDate.touched) {
      sortByDateAndSet(students,'reverse')
    }


    if (sortCourses.sort && sortCourses.touched) {
      sortByNumbersAndSet(students, 'courses', 'top')
    } else if (!sortCourses.sort && sortCourses.touched) {
      sortByNumbersAndSet(students, 'courses', 'reverse')
    }

    if (sortReview.sort && sortReview.touched) {
      sortByNumbersAndSet(students, 'review', 'top')
    } else if (!sortReview.sort && sortReview.touched) {
      sortByNumbersAndSet(students, 'review', 'reverse')
    }

    if (sortTests.sort && sortTests.touched) {
      sortByNumbersAndSet(students, 'testResult', 'top')
    } else if (!sortTests.sort && sortTests.touched) {
      sortByNumbersAndSet(students, 'testResult', 'reverse')
    }

    if (sortCoins.sort && sortCoins.touched) {
      sortByNumbersAndSet(students, 'coins', 'top')
    } else if (!sortCoins.sort && sortCoins.touched) {
      sortByNumbersAndSet(students, 'coins', 'reverse')
    }

    if (sortStatus.sort && sortStatus.touched) {
      sortByLettersAndSet(students,'status','top')
    } else if (!sortStatus.sort && sortStatus.touched) {
      sortByLettersAndSet(students,'status','reverse')
    }

  }, [counter, students])

  const onShowMoreHandler = () => setShowMore(prev => !prev)

  const onFilterList = (ev, info) => {
    ev.stopPropagation()
    ev.preventDefault()


    if (info === 'name') {

      setCounter(prev => ({
        ...counterState,
        sortName: { sort: !prev.sortName.sort, touched: true },
      }))

    } else if (info === 'date') {

      setCounter(prev => ({
        ...counterState,
        sortDate: { sort: !prev.sortDate.sort, touched: true },
      }))

    } else if (info === 'courses') {

      setCounter(prev => ({
        ...counterState,
        sortCourses: { sort: !prev.sortCourses.sort, touched: true },
      }))

    } else if (info === 'videoReview') {

      setCounter(prev => ({
        ...counterState,
        sortReview: { sort: !prev.sortReview.sort, touched: true },
      }))
    } else if (info === 'tests') {
      setCounter(prev => ({
        ...counterState,
        sortTests: { sort: !prev.sortTests.sort, touched: true },
      }))
    } else if (info === 'coin') {
      setCounter(prev => ({
        ...counterState,
        sortCoins: { sort: !prev.sortCoins.sort, touched: true },
      }))
    } else if (info === 'online') {
      setCounter(prev => ({
        ...counterState,
        sortStatus: { sort: !prev.sortStatus.sort, touched: true },
      }))
    }


  }

  const onInputChange = event => {
    const value = event.target.value.trim().toLowerCase()

    if (value) {
      setInputValue(value)
    } else {
      setInputValue(null)
    }

  }


  const filteredList = secondList
    .slice(0, showMore ? secondList.length : 16)
    .filter(searchItem => {
    if (inputValue) {

      if (searchItem.name.toLowerCase().includes(inputValue)) {
        return searchItem
      } else {
        return null
      }

    } else {
      return searchItem
    }
  })

  if (!isLoaded) {
    return (
      <section className="list">

        <Loader container/>

      </section>
    )
  }

  return (
    <section className="list">

      <div className="list__top listTop">
        <h1 className="listTop__title">Жалпы тізім</h1>

        <label className="listTop__label" htmlFor="studentName">
          <input
            className="input__focusedBoxShadow listTop__input"
            name="studentName" id="studentName" type="text"
            placeholder="Search student name..."
            onChange={onInputChange}
          />
        </label>
      </div>

      <div className="list__bottom listBottom">

        <table className="listBottom__table table">

          <thead className="table__thead">
          <tr className="table__titleRow">
            <th className="table__title"/>
            <th className="table__title">Аты-жөні</th>
            <th className="table__title">Курс бастаған уақыты</th>
            <th className="table__title">Курстар саны</th>
            <th className="table__title">Видеосабақ қаралымы</th>
            <th className="table__title">Тесттері</th>
            <th className="table__title">EduCoin</th>
            <th className="table__title">Чат</th>
            <th className="table__title">Соңғы кірген уақыты</th>
          </tr>
          </thead>

          <tbody className="table__tbody">
          <tr className="table__filterRow filter__row">
            <td className="table__filter filter__item"/>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'name')}
                data-id="name"
                className={['filter__label', counter.sortName.touched ? 'active' : null].join(' ')}
                htmlFor="filter-name"
              >
                <span className="filter__text">Filter</span>
                <input id="filter-name" name="filter" type="radio" className="filter__icon"/>
                <span className="filter__arrow"/>
              </label>
            </td>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'date')}
                data-id="date"
                className={['filter__label', counter.sortDate.touched ? 'active' : null].join(' ')}
                htmlFor="filter-date"
              >
                <span className="filter__text">Filter</span>
                <input id="filter-date" name="filter" type="radio" className="filter__icon"/>
                <span className="filter__arrow"/>
              </label>
            </td>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'courses')}
                data-id="courses"
                className={['filter__label', 'filter-courses', counter.sortCourses.touched ? 'active' : null].join(' ')}
                htmlFor="filter-courses"
              >
                <span className="filter__text">Filter</span>
                <input id="filter-courses" name="filter" type="radio" className="filter__icon"/>
                <span className="filter__arrow"/>
              </label>
            </td>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'videoReview')}
                data-id="videoReview"
                className={['filter__label', counter.sortReview.touched ? 'active' : null].join(' ')}
                htmlFor="filter-videoReview"
              >
                <span className="filter__text">Filter</span>
                <input id="filter-videoReview" name="filter" type="radio" className="filter__icon"/>
                <span className="filter__arrow"/>
              </label>
            </td>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'tests')}
                data-id="tests"
                className={['filter__label', counter.sortTests.touched ? 'active' : null].join(' ')}
                htmlFor="filter-tests"
              >
                <span className="filter__text">Filter</span>
                <input id="filter-tests" name="filter" type="radio" className="filter__icon"/>
                <span className="filter__arrow"/>
              </label>
            </td>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'coin')}
                data-id="coin"
                className={['filter__label', counter.sortCoins.touched ? 'active' : null].join(' ')}
                htmlFor="filter-coin"
              ><span className="filter__text">Filter</span>
                <input id="filter-coin" name="filter" type="radio" className="filter__icon"/>
                <span className="filter__arrow"/></label>
            </td>
            <td className="table__filter filter__item"/>
            <td className="table__filter filter__item">
              <label
                onClick={ev => onFilterList(ev, 'online')}
                data-id="online"
                className={['filter__label', counter.sortStatus.touched ? 'active' : null].join(' ')}
                htmlFor="filter-online"><span className="filter__text">Filter</span> <input id="filter-online"
                                                                                                 name="filter"
                                                                                                 type="radio"
                                                                                                 className="filter__icon"/>
                <span className="filter__arrow"/></label>
            </td>

          </tr>

          {
            filteredList.length
              ? filteredList.map((item, index) => {
                  return (
                    <tr key={index} className="table__row">
                      <td className="table__item">{item.id}</td>
                      <td className="table__item">{item.username}</td>
                      <td className="table__item">{item.courseStartDate}</td>
                      <td className="table__item">{item.coursesCount}</td>
                      <td className="table__item">{item.review || 0}%</td>
                      <td className="table__item">{item.lastQuizResult} балл</td>
                      <td className="table__item">{item.credit} <span className="item__coin"/></td>
                      <td className="table__item">
                        <span className="item__chat">
                            <ChatIcon/>
                            <span className="item__chatNumber">{item.income}</span>
                          </span>
                      </td>
                      <td className="table__item">{item.updated_at}</td>
                    </tr>
                  )
                })
              : <tr>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                  <td style={{textAlign: 'center'}}>Not found</td>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                </tr>
          }
          </tbody>

        </table>

      </div>

      {
        secondList.length > 15
          ? (
            <div className="rating__showMore">
              <button
                onClick={onShowMoreHandler}
                className={['showMore__btn', 'btn', showMore ? 'btn__showed' : null].join(' ')}
              >
                Show More
                <span className="btn__arrow"/>
              </button>
            </div>
          )
          : null
      }

    </section>
  )
}


function mapStateToProps(state) {

  return {
    type: state.user.user.type
  }
}


export default connect(mapStateToProps)(TeacherList)