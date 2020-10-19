import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {createEventId, todayStr} from './event-utils'
import '../../containers/calendar/calendar.css'
import './tutorCalendar.scoped.scss'
import studentImg from '../../../../images/login/calendar/studentImg.jpg'
import {Link, withRouter} from 'react-router-dom'
// import qs from 'qs'


/*

!! IMPORTANT !!

calendar works well only on versions
and you should install packages with --save flag
"@fullcalendar/core": "^5.0.0",
"@fullcalendar/daygrid": "^5.0.0",
"@fullcalendar/interaction": "^5.0.0",
"@fullcalendar/react": "^5.0.0",
"@fullcalendar/timegrid": "^5.0.0",

CHECK YOUR DEPENDENCIES BEFORE RUNNING

*/

const students = [
  {id: 1, icon: studentImg, name: 'Student Name', timetable: [
      {
        id: createEventId(),
        title: 'student 1',
        start: todayStr,
        color: '#FF4141'
      },
      {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr + 'T24:00:00',
        color: '#FF4141'
      },
    ]},
  {id: 2, icon: studentImg, name: 'Student Name', timetable: [{
        id: createEventId(),
        title: 'student ' + createEventId(),
        start: todayStr,
        color: '#FF4141'
      },]},
  {id: 3, icon: studentImg, name: 'Student Name', timetable: [{
        id: createEventId(),
        title: 'student ' + createEventId(),
        start: todayStr,
        color: '#FF4141'
      },]},
  {id: 4, icon: studentImg, name: 'Student Name', timetable: [{
        id: createEventId(),
        title: 'student ' + createEventId(),
        start: todayStr,
        color: '#FF4141'
      },]},
  {id: 5, icon: studentImg, name: 'Student Name', timetable: [{
        id: createEventId(),
        title: 'student ' + createEventId(),
        start: todayStr,
        color: '#FF4141'
      },]},
  {id: 6, icon: studentImg, name: 'Student Name', timetable: [{
        id: createEventId(),
        title: 'student ' + createEventId(),
        start: todayStr,
        color: '#FF4141'
      },]},
  {id: 7, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 8, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 9, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 10, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 11, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 12, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 13, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 14, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 15, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 16, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 17, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 18, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},
  {id: 19, icon: studentImg, name: 'Student Name', timetable: [{ id: createEventId(), title: 'student ' + createEventId(), start: todayStr, color: '#FF4141' },]},


]



class TutorCalendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentEvents: [
        {
          title: 'event1',
          start: '2020-10-05'
        },
        {
          title: 'event2',
          start: '2020-10-05',
          end: '2020-09-12'
        },
        {
          title: 'event3',
          start: '2020-01-09T12:30:00',
          allDay: true // will make the time show
        }
      ],
      initDragEvents: [
        {title: 'Тест тапсыру', color: '#FF4141'},
        {title: 'Сабақ қарау', color: '#9D43FF'},
        {title: 'Үй тапсырмасын тексеру', color: '#00C0EF'},
        {title: 'Кураторға хабарласу', color: '#FFB800'},
        {title: 'Кітап оқу', color: '#00A65A'},
      ]
    }
    this.refToBtn = React.createRef()
  }



  render() {

    const { timetable } = students.find(item => item.id === +this.props.match.params.id) || students[0]

    return (
      <div className='demo-app'>
          {this.renderSidebar()}
          <div className='demo-app-main'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              views={{
                dayGridMonth: {
                  type: 'dayGridMonth',
                  buttonText: 'Ай'
                },
                timeGridWeek: {
                  type: 'timeGridWeek',
                  buttonText: 'Апта'
                },
                timeGridDay: {
                  type: 'timeGridDay',
                  buttonText: 'Күн'
                }
              }}
              // droppable={true}
              allDaySlot={true}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              eventBackgroundColor={'blue'}
              dayMaxEvents={true}
              events={timetable} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents}
            />
          </div>
        </div>
    )
  }

  renderSidebar() {
    return (
      <div className='sideboard'>

        <div className="calender__column">

          <h2 className="calender__sidebarTitle">Calendar </h2>

        </div>

        <div className="sideboard__wrapper">
          <ul className="student__list">
            {students.map((item, index) => {

              return (
                <li key={index} className="student__item studentItem">
                  <Link className="studentItem__link" to={`/tutor/calendar/${item.id}`}>
                    <span className="studentItem__img"> <img src={item.icon} alt="student"/> </span>
                    <span className="studentItem__text">{item.name}</span>
                  </Link>
                </li>
              )
            })}

          </ul>

        </div>

      </div>
    )
  }

  addColorItem = event => {
    event.preventDefault()
    const {value} = event.target.title

    if (value && value.trim()) {
      const bg = window.getComputedStyle(this.refToBtn.current).backgroundColor

      this.setState(prev => ({
        initDragEvents: [
          ...prev.initDragEvents,
          {title: value, color: bg}
        ]
      }))
    }
  }

  colorPickerHandler = event => {

    if (event.target.classList.contains('calenderAdd__boxColor')) {
      const bg = event.target.style.background

      this.refToBtn.current.style.background = bg
      this.refToBtn.current.style.borderColor = bg

    }
  }

  handleDateSelect = (selectInfo) => {

    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {

    this.setState(() => {

        return {
          currentEvents: events
        }
      }
    )
  }

}

function renderEventContent(eventInfo) {

  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


export default withRouter(TutorCalendar)