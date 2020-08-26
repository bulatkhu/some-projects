import React from 'react'
import './chat.scss'
import tutor1 from '../../../../images/login/chat/tutor-name1.jpg'
import tutor2 from '../../../../images/login/chat/tutor-name2.jpg'
import tutor3 from '../../../../images/login/chat/tutor-name3.jpg'
import tutor4 from '../../../../images/login/chat/tutor-name4.jpg'
import tutor5 from '../../../../images/login/chat/tutor-name5.jpg'
import tutor6 from '../../../../images/login/chat/tutor-name6.jpg'
import tutor7 from '../../../../images/login/chat/tutor-name7.jpg'

const peopleChat = [
  {name: 'Tutor Name', img: tutor1, subject: 'Math Teacher', messages: 2},
  {name: 'Tutor Name', img: tutor2, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor3, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor4, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor5, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor6, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor7, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor7, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor7, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor7, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor7, subject: 'Math Teacher'},
  {name: 'Tutor Name', img: tutor7, subject: 'Math Teacher'},
]

const Chat = () => {

  return (
    <section className="chat">
      <div className="chat__content">

        <div className="chat__column">
          <div className="chat__people chatPeople">

            <form className="chatPeople__searchWrapper">
              <input className="chatPeople__search" placeholder="Search student name..."/>
              <button className="chatPeople__searchButton"/>
            </form>


            <div className="chatPeople__row">

              {peopleChat.map((item, index) => {

                return (
                  <div className="chatPeople__box" key={index}>

                    <div className="chatPeople__wrapper">

                      <div className="chatPeople__human">
                        <div className="chatPeople__img">
                          <img src={item.img} alt="tutor"/>
                        </div>

                        <div className="chatPeople__description">
                          <div className="chatPeople__name">{item.name}</div>
                          <div className="chatPeople__subject">{item.subject}</div>
                        </div>
                      </div>

                    </div>

                    {item.messages
                      ? <div className="chatPeople__messages">
                        <span>{item.messages}</span>
                      </div>
                      : null
                    }

                  </div>
                )

              })}


            </div>


          </div>
        </div>
        <div className="chat__column">
          <div className="chat__display chatDisplay">

            <div className="chatDisplay__description">
              <h2 className="chatDisplay__title">Tutor Name</h2>
              <div className="chatDisplay__status">
                <span className="chatDisplay__activeDot"/>
                <span>Active</span>
              </div>
            </div>

            {/*<div className="chatDisplay__content">*/}


            <div className="chatDisplay__chat chatMsgBox">

              <div className="chatMsgBox__message">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>
                <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>
                <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Lorem upson</span>
                <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message chatMsgBox__ownMessage">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>
                <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message chatMsgBox__ownMessage">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>
                <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message chatMsgBox__ownMessage">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Lorem upson</span>
                <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>
                  <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>
                  <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message chatMsgBox__ownMessage">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>
                  <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

              <div className="chatMsgBox__message chatMsgBox__ownMessage">
                <div className="chatMsgBox__wrapper">
                  <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>
                  <span className="chatMsgBox__time">15:05</span>
                </div>
              </div>

            </div>


            <form method="post" action="/addMessage" className="chatDisplay__form">
              <div className="chatDisplay__formWrapper">
                <input className="chatDisplay__input" type="text"/>
                <input className="chatDisplay__file" type="file" multiple/>
                <button className="chatDisplay__button" type="submit">Send</button>
              </div>
            </form>

            {/*</div>*/}

          </div>
        </div>

      </div>
    </section>
  )
}

export default Chat