import React, {useRef, useState} from 'react'
import {connect} from 'react-redux'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import {apiCreateCommentCourse} from '../../../../request/apiComments'


const removeAllActiveStars = target => {
  const $stars = target.querySelectorAll('span')
  $stars.forEach(item => item.classList.remove('active'))
}


const AddComment = ({user, isAuth, id}) => {
  const starsInput = useRef(null)
  const [commentInfo, setCommentInfo] = useState({ show: false, success: false, text: null })

  const onAddComment = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment.trim()) {
      event.target.comment.value = ''

      apiCreateCommentCourse({
        content_id: id, comment
      })
        .then(res => {
          if (res.data.success === 1) {
            setCommentInfo({
              show: true,
              success: true,
              text: 'Comment added'
            })
          } else {
            setCommentInfo({
              show: true,
              success: false,
              text: res.data.msg
            })
          }
        })
        .catch(err => {

          setCommentInfo({
            show: true,
            success: false,
            text: err.message
          })

          console.log('err', err)
        })

      // console.log('id', id)
      // console.log('comment', event.target.comment.value)

    }
  }

  const ratingHandler = event => {
    if (event.target.dataset.value) {

      if (event.target.classList.contains('active')) {
        removeAllActiveStars(event.currentTarget)
        event.target.classList.remove('active')
        starsInput.current.value = 'null'
      } else {
        removeAllActiveStars(event.currentTarget)
        event.target.classList.add('active')
        starsInput.current.value = event.target.dataset.value
      }
    }
  }

  if (!isAuth) {
    return (
      <div className="text-center">You should be logged in to leave a comment</div>
    )
  }

  return (
    <>
      {
        commentInfo.show
          ? (
            <p className="success">{commentInfo.text}</p>
          )
          : (
            <p className="error">{commentInfo.text}</p>
          )
      }
      <form onSubmit={onAddComment} className="bottomTeachPage__addComment addComment">

        <div className="addComment__image">
          {
            user && user.localAvatar
              ? <img src={`${user.localAvatar}`} alt="your profile"/>
              : <NoPhoto/>
          }
        </div>

        <div className="addComment__inputWrapper">


          <textarea name="comment" className="addComment__input" placeholder="Make Comment..."/>

          <div className="addComment__buttons">

            <div className="rating__stars" onClick={ratingHandler}>
              <input ref={starsInput} name="stars" type="text" defaultValue="null"/>

              <span data-value="5">☆</span>
              <span data-value="4">☆</span>
              <span data-value="3">☆</span>
              <span data-value="2">☆</span>
              <span data-value="1">☆</span>
            </div>

            <button className="btn__shadowFromNull addComment__btn">Send</button>

          </div>

        </div>

      </form>
    </>
  )
}


function mapStateToProps(state) {
  return {
    user: state.user.user,
    isAuth: state.auth.isAuthenticated
  }
}


export default connect(mapStateToProps)(AddComment)