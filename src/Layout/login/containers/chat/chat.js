import React, {useEffect, useState} from 'react'
import './chat.scss'
// import tutor1 from '../../../../images/login/chat/tutor-name1.jpg'
// import tutor2 from '../../../../images/login/chat/tutor-name2.jpg'
// import tutor3 from '../../../../images/login/chat/tutor-name3.jpg'
// import tutor4 from '../../../../images/login/chat/tutor-name4.jpg'
// import tutor5 from '../../../../images/login/chat/tutor-name5.jpg'
// import tutor6 from '../../../../images/login/chat/tutor-name6.jpg'
// import tutor7 from '../../../../images/login/chat/tutor-name7.jpg'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import {getChatUsers, getMessagesByUserId, sendMessageById} from '../../../../request/apiRequests'


const noPhotoStyles = {
  background: '#696969',
  color: '#fff',
  fontSize: '12px',
  width: '100%',
  height: '100%',
  textAlign: 'center'
}

const Chat = () => {
  const [users, setUsers] = useState([])
  const [dialogueId, setDialogueId] = useState(null)
  const [filterUser, setFilterUser] = useState(null)
  const [diaMessage, setDiaMessage] = useState(null)
  const [dialogueList, setDialogueList] = useState([])
  const [particsName, setParticsName] = useState('')


  useEffect(() => {

    if (!users.length) {
      getChatUsers()
        .then(res => {
          const {users} = res.data
          setUsers(users || [])
          setDialogueId(users[0].id)
          setParticsName(users[0].name)
        })
    }

    if (users.length && dialogueId) {
      setParticsName(users.find(item => item.id === dialogueId).name)
    }

    if (dialogueId) {
      getMessagesByUserId(dialogueId)
        .then(res => {
          if (res.error) return setDiaMessage(res.data.message)

          setDiaMessage(null)
          setDialogueList(res.data.data)

        })
    }

  },[dialogueId, users])


  const onSendMessage = event => {
    event.preventDefault()
    const value = event.target.message.value
    if (!value.trim()) return

    event.target.message.value = ''

    sendMessageById(value, dialogueId)
      .then(res => {
        if (res.error) return setDiaMessage(res.data.message)

        if (res.status === 201) {
          setDialogueList(prevState => ([...prevState, res.data]))
          setDiaMessage(null)
        }
      })

  }


  const selectCurDia = id => setDialogueId(+id)



  return (
    <section className="chat">
      <div className="chat__content">

        <div className="chat__column">
          <div className="chat__people chatPeople">

            <form
              className="chatPeople__searchWrapper"
              onSubmit={event => event.preventDefault()}
            >
              <input
                onChange={event => setFilterUser(event.target.value.trim().toLowerCase())}
                className="chatPeople__search input__focusedBoxShadow"
                placeholder="Search student name..."
              />
              <button type="submit" className="chatPeople__searchButton input__noFocus"/>
            </form>


            <div className="chatPeople__row">

              {users
                .filter(item => {
                  if (filterUser) {

                    if (item.name.toLowerCase().includes(filterUser)) {
                      return item
                    } else {
                      return null
                    }

                  } else {
                    return item
                  }
                })
                .map((item, index) => {
                  const current = item.id === dialogueId ? 'current' : null
                  const avatar = item.usermetas.find(item => item.option === 'avatar') || false


                  return (
                    <div
                      key={index}
                      onClick={() => selectCurDia(item.id)}
                      className={['chatPeople__box', current].join(' ')}
                    >

                      <div className="chatPeople__wrapper">

                        <div className="chatPeople__human">
                          <div className="chatPeople__img">
                            {
                              avatar && avatar.value
                                ? <img src={'https://api.ustaz.xyz/' + avatar.value} alt="tutor"/>
                                : <NoPhoto style={noPhotoStyles}/>
                            }
                          </div>

                          <div className="chatPeople__description">
                            <div className="chatPeople__name">{item.name}</div>
                            <div className="chatPeople__subject">{item.username || item.subject}</div>
                          </div>
                        </div>

                      </div>

                      {item.messages && (
                        <div className="chatPeople__messages">
                          <span>{item.messages}</span>
                        </div>
                      )}

                    </div>
                  )

               })}


            </div>


          </div>
        </div>
        <div className="chat__column">
          <div className="chat__display chatDisplay">

            <div className="chatDisplay__description">
              <h2 className="chatDisplay__title">{particsName}</h2>
              <div className="chatDisplay__status">
                <span className="chatDisplay__activeDot"/>
                <span>Active</span>
              </div>
            </div>

            {/*<div className="chatDisplay__content">*/}


            <div className="chatDisplay__chat chatMsgBox">

              {/*{renderMessages()}*/}

              {diaMessage
                ? <div className="text-center">{diaMessage}s</div>
                : dialogueList
                  .sort((a, b) => a.created_at - b.created_at)
                  .map((item, index) => {
                    // const date = new Date(Date.parse(item.created_at.substr(11, 5)))
                    // const currentData = [+date.getMonth() + 1, date.getDay(), date.getHours(), date.getMinutes()].join('.')
                      //
                    const isOwner = +item.sender.id !== dialogueId ? 'chatMsgBox__ownMessage' : null


                    return (
                      <div className={['chatMsgBox__message', isOwner].join(' ')} key={index}>
                        <div className="chatMsgBox__wrapper">
                          <span className="chatMsgBox__text">{item.body}</span>
                          <span className="chatMsgBox__time">{item.created_at.substr(11, 5)}</span>
                        </div>
                      </div>
                    )
                  })}

              <>

                {/*<div className="chatMsgBox__message">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Lorem upson</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message chatMsgBox__ownMessage">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message chatMsgBox__ownMessage">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message chatMsgBox__ownMessage">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Lorem upson</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Malesuada nam vitae dignissim.</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message chatMsgBox__ownMessage">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="chatMsgBox__message chatMsgBox__ownMessage">*/}
                {/*  <div className="chatMsgBox__wrapper">*/}
                {/*    <span className="chatMsgBox__text">Quam nunc ut vitae. Lore</span>*/}
                {/*    <span className="chatMsgBox__time">15:05</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

              </>

            </div>


            <form onSubmit={onSendMessage} className="chatDisplay__form">
              <div className="chatDisplay__formWrapper">
                <input name="message" placeholder="Input message" className="chatDisplay__input" type="text"/>
                {/*<input className="chatDisplay__file" type="file" multiple/>*/}
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
