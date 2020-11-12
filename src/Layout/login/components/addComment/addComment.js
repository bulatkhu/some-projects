import React, {useRef} from 'react'
import {connect} from 'react-redux'
import {SITE_BASE_URL} from '../../../../app.config'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'


const removeAllActiveStars = target => {
  const $stars = target.querySelectorAll('span')
  $stars.forEach(item => item.classList.remove('active'))
}


const AddComment = ({user, isAuth}) => {
  const starsInput = useRef(null)

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
    <form className="bottomTeachPage__addComment addComment">

      <div className="addComment__image">
        {
          user && user.localAvatar
            ? <img src={`${SITE_BASE_URL + user.localAvatar}`} alt="your profile"/>
            : <NoPhoto/>
        }
      </div>

      <div className="addComment__inputWrapper">


        <textarea className="addComment__input" placeholder="Make Comment..."/>

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
  )
}


function mapStateToProps(state) {
  return {
    user: state.user.user,
    isAuth: state.auth.isAuthenticated
  }
}


export default connect(mapStateToProps)(AddComment)