import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {getChatMentors, getScheduleById} from '../../../../request/apiRequests'
import {getFromUserMeta} from '../../../../scripts/dataHandler/dataHandler'
import {SITE_BASE_URL} from '../../../../app.config'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import '../../containers/calendar/calendar.css'
import './tutorCalendar.scoped.scss'
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


class TutorCalendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      events: [],
      students: [],
      currentStudentId: null,
      isError: { boolean: false, text: null }
    }
  }

  setError(newText) {
    this.setState(() => {

      return {
        isError: {
          boolean: true,
          text: `
          ${newText}.
        `
        }
      }
    })
  }

  componentDidMount() {

    if (!this.state.students.length) {
      getChatMentors('mentor')
        .then(res => {
          const {students} = res.data

          if (students && students.length) {

            const studentsInfo = students.map(item => {
              const img = getFromUserMeta(item.user, 'avatar') ||
                getFromUserMeta(item.user, 'profile_img')
              item.img = img ? SITE_BASE_URL + img : null
              return item
            })

            this.setState(() => ({students: studentsInfo}))
            this.setScheduleById(studentsInfo[0].id)

          } else {

            this.setError('Error on getting list of students: no student was found.')

          }
        })
        .catch(err => {

          this.setError(`Error on getting list of students: ${err.message}`)

        })
    }

  }

  setScheduleById(id) {
    getScheduleById(id)
      .then(res => {
        const events = res.data.schedule.map(item => ({...item, title: item.task_name}))
        this.setState(() => ({events: events, currentStudentId: +id}))
      })
      .catch(err => {
        console.log('err', err)
        this.setError(`Error on getting user's ${id} schedule: ${err.message}`)
      })
  }


  render() {

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
              allDaySlot={true}
              initialView='dayGridMonth'
              selectMirror={true}
              eventBackgroundColor={'blue'}
              dayMaxEvents={true}
              events={this.state.events}
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

          {
            this.state.isError.boolean
            ? <p className="error__middle">{this.state.isError.text}</p>
            : null
          }

        </div>

        <div className="sideboard__wrapper">
          <ul className="student__list">
            {this.state.students.length ? this.state.students
              .map((item, index) => {
                const classCurrent = [
                  'student__item',
                  'studentItem',
                  item.id === this.state.currentStudentId
                    ? 'current'
                    : null
                ]

              return (
                <li data-user-id={item.id} key={index} className={classCurrent.join(' ')}>
                  <button
                    className="studentItem__link"
                    onClick={() => this.setScheduleById(item.id)}
                  >
                    <span className="studentItem__img">
                      {
                        item.img
                          ? <img src={item.img} alt="student"/>
                          : <NoPhoto/>
                      }
                    </span>
                    <span className="studentItem__text">{item.user.name}</span>
                  </button>
                </li>
              )
            }) : null}

          </ul>

        </div>

      </div>
    )
  }

}


export default TutorCalendar
