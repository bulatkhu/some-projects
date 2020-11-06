import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import {INITIAL_EVENTS, createEventId} from './event-utils'
import './calendar.css'



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



class Calendar extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     currentEvents: [
  //       {
  //         id: 0,
  //         title: 'event1',
  //         start: "2020-11-03",
  //         color: '#FF4141'
  //       },
  //       {
  //         id: 1,
  //         title: 'event2',
  //         start: '2020-11-03T12:00:00',
  //         end: '2020-09-12',
  //         color: '#FF4141'
  //       },
  //       {
  //         id: 3,
  //         title: 'event3',
  //         start: '2020-11-03T24:00:00',
  //         allDay: true, // will make the time show
  //         color: '#FF4141'
  //       }
  //     ],
  //     loading: true,
  //     initDragEvents: [
  //       {title: 'Тест тапсыру', color: '#FF4141'},
  //       {title: 'Сабақ қарау', color: '#9D43FF'},
  //       {title: 'Үй тапсырмасын тексеру', color: '#00C0EF'},
  //       {title: 'Кураторға хабарласу', color: '#FFB800'},
  //       {title: 'Кітап оқу', color: '#00A65A'},
  //     ]
  //   }
  //   this.
  // }

  refToBtn = React.createRef()
  refToExtEvents = React.createRef()
  state = {
    currentEvents: [
      {
        id: 0,
        title: 'event1',
        start: "2020-11-03",
        color: '#FF4141'
      },
      {
        id: 1,
        title: 'event2',
        start: '2020-11-03T12:00:00',
        end: '2020-09-12',
        color: '#FF4141'
      },
      {
        id: 3,
        title: 'event3',
        start: '2020-11-03T24:00:00',
        allDay: true, // will make the time show
        color: '#FF4141'
      }
    ],
    loading: true,
    initDragEvents: [
      {title: 'Тест тапсыру', color: '#FF4141'},
      {title: 'Сабақ қарау', color: '#9D43FF'},
      {title: 'Үй тапсырмасын тексеру', color: '#00C0EF'},
      {title: 'Кураторға хабарласу', color: '#FFB800'},
      {title: 'Кітап оқу', color: '#00A65A'},
    ]
  }

  componentDidMount() {
    console.log('events:', INITIAL_EVENTS)

    new Draggable(this.refToExtEvents.current, {
      itemSelector: '.calender__eventItem',
      eventData: eventEl => JSON.parse(eventEl.dataset.event)
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
              droppable={true}
              allDaySlot={true}
              lazyFetching={true}
              initialView='dayGridMonth'
              editable={true}
              loading={false}
              selectable={true}
              selectMirror={true}
              eventBackgroundColor={'blue'}
              dayMaxEvents={true}
              // initialEvents={INITIAL_EVENTS}
              events={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents}
              // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
            />
          </div>
        </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar calender__content'>

        <div className="calender__column">

          <h2 className="calender__sidebarTitle">Calendar </h2>

        </div>

        <div ref={this.refToExtEvents} className='calender__eventContent calender__column' id='external-events'>

          <h2 className='calender__eventTitle'>Тапсырмалар</h2>

          {this.state.initDragEvents.map((item, index) => {

            return (
              <div key={index}
                   data-event={JSON.stringify(item)}
                   style={{background: item.color}}
                   className='calender__eventItem'>
                <div className='fc-event-main'>{item.title}</div>
              </div>
            )

          })}
        </div>

        <div className="calender__eventAdd calenderAdd calender__column">

          <h2 className="calenderAdd__title">Жаңа тапсырма</h2>

          <ul onClick={this.colorPickerHandler} className="calenderAdd__colors">
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#FFE15A'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#FF5773'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#04CC00'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#8BCAFF'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#8581D2'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#FFBB6E'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#FFA2B2'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#D3DCFB'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#70D7E5'}}/>
            </li>
            <li className="calenderAdd__eventColor">
              <i className="calenderAdd__boxColor" style={{background: '#D478FF'}}/>
            </li>


          </ul>

          <div className="calenderAdd__wrapper">

            <form action="/add-item" onSubmit={this.addColorItem}>
              <input name="title" placeholder="Тапсырма атауы" type="text" className="calenderAdd__input"/>
              <button
                ref={this.refToBtn}
                className="calenderAdd__button"
              >Қосу
              </button>
            </form>

          </div>

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
        ...prev,
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


export default Calendar
