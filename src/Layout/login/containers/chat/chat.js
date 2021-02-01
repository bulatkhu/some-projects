import React, {useEffect, useState} from 'react'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import {getChatMentors, getMessagesByUserId, sendMessageById} from '../../../../request/apiRequests'
import {Translate} from 'react-translated'
import {connect} from 'react-redux'
import './chat.scss'




const noPhotoStyles = {
  background: '#696969',
  color: '#fff',
  fontSize: '12px',
  width: '100%',
  height: '100%',
  textAlign: 'center'
}

const Chat = ({user}) => {
  const [candidates, setCandidates] = useState([])
  const [dialogueId, setDialogueId] = useState(null)
  const [filterUser, setFilterUser] = useState(null)
  const [diaMessage, setDiaMessage] = useState(null)
  const [dialogueList, setDialogueList] = useState([])
  const [particsName, setParticsName] = useState('')
  const [showBigImage, setShowBigImage] = useState(null)
  const [isCandidatesFetched, setIsCandidatesFetched] = useState(false)


  useEffect(() => {

    if (!candidates.length && user && !isCandidatesFetched) {
      getChatMentors(user.type)
        .then(res => {
          setIsCandidatesFetched(true)
          const {mentors, teachers, students} = res.data
          const candidates = mentors || students || teachers
          if (candidates && candidates.length) {
            setCandidates(candidates || [])
            setDialogueId(candidates[0].id)
            setParticsName(candidates[0].user.name)
          } else {
            setDiaMessage('No teachers, mentors or students was found')
          }
        })
    }

    if (candidates.length && dialogueId) {
      setParticsName(candidates.find(item => item.id === dialogueId).name)
    }

    if (dialogueId) {
      getMessagesByUserId(dialogueId)
        .then(res => {
          if (res.error) return setDiaMessage(res.data.message)
          setDiaMessage(null)
          setDialogueList(res.data.data)
        })
    }

  },[dialogueId, candidates, user, isCandidatesFetched])

  const onSendMessage = event => {
    event.preventDefault()
    const value = event.target.message.value
    const img = event.target.media.files[0]

    if (!value.trim() && !img.name) return
    event.target.message.value = ''

    const formData = new FormData()
    img && formData.append('media', img, img.name)
    formData.append('id', dialogueId)
    formData.append('message', value)


    sendMessageById(formData)
      .then(res => {
        if (res.error) return setDiaMessage(res.data.message)

        if (res.status === 200) {
          setDialogueList(prevState => ([...prevState, {...res.data, isOwn: true}]))
          setDiaMessage(null)
        }
      })

  }

  const selectCurDia = id => setDialogueId(+id)


  return (
    <section className="chat">
      {showBigImage && (
        <div
          onClick={() => setShowBigImage(null)}
          className="chatBigImg__wrapper">
          <img src={showBigImage} alt="big " className="chatBigImg__img"/>
        </div>
      )}
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

              {candidates
                .filter(item => {
                  if (filterUser) {

                    if (item.user.name.toLowerCase().includes(filterUser)) {
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
                  const avatar = item.user.usermetas.find(item => item.option === 'avatar') || false


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
                            <div className="chatPeople__name">{item.user.name}</div>
                            <div className="chatPeople__subject">{item.user.username || item.user.subject}</div>
                          </div>

                          {!!item.is_seen ? <div className="chatPeople__viewed"/> : null}
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
                    const isOwner = item.isOwn || +item.sender.id !== dialogueId ? 'chatMsgBox__ownMessage' : null


                    return (
                      <div className={['chatMsgBox__message', isOwner].join(' ')} key={index}>
                        <div className="chatMsgBox__wrapper">
                          <span className="chatMsgBox__text">
                            <span style={{display: 'block'}} className={[item.media && 'margin__button1'].join(' ')}>{item.body}</span>
                            {item.media && (
                              <span className="chatMsgBox__img">
                                <img
                                  onClick={() => setShowBigImage(`https://api.ustaz.xyz/${item.media}`)}
                                  src={'https://api.ustaz.xyz/' + item.media}
                                  alt="images"
                                />
                              </span>
                            )}
                          </span>
                          <span className="chatMsgBox__time">{item.created_at.substr(11, 5)}</span>
                        </div>
                      </div>
                    )
                  })}

            </div>


            <form onSubmit={onSendMessage} className="chatDisplay__form">
              <div className="chatDisplay__formWrapper">
                <input name="message" placeholder="Input message" className="chatDisplay__input" type="text"/>
                <input
                   name="media"
                   className="chatDisplay__file"
                   type="file"
                />
                <button className="chatDisplay__button" type="submit">
                  <Translate text="send"/>
                </button>
              </div>
            </form>

            {/*</div>*/}

          </div>
        </div>

      </div>
    </section>
  )
}


function mapStateToProps(state) {

  return {
    user: state.user.user
  }
}


export default connect(mapStateToProps)(Chat)
