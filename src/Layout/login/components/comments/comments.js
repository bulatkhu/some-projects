import React, {useRef} from 'react'
import './comments.scss'
import Stars from '../../../general/stars/stars'


const Comments = ({info}) => {

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

  const removeAllActiveStars = target => {
    const $stars = target.querySelectorAll('span')
    $stars.forEach(item => item.classList.remove('active'))
  }

  return (
    <div className="teacherPage__bottom bottomTeachPage">

      <h3 className="bottomTeachPage__title">Курс туралы пікірлер</h3>

      <div className="bottomTeachPage__content">

        {info.comments.map((comment, index) => {

          return (
            <div key={index} className="bottomTeachPage__column">
              <div className="bottomTeachPage__comment">
                <div className="bottomTeachPage__img">
                  <img src={comment.icon} alt="student"/>
                </div>

                <div className="bottomTeachPage__about">
                  <h4 className="bottomTeachPage__name">{comment.name}</h4>
                  <Stars
                    className="bottomTeachPage__stars"
                    rating={comment.stars}
                    classNameOfValue="bottomTeachPage__starsValue"
                  />

                  <p className="bottomTeachPage__text">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          )

        })}

      </div>

      <form className="bottomTeachPage__addComment addComment">

        <div className="addComment__image">
          <img src={info.ownProfile.icon} alt="your profile"/>
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

            <button className="addComment__btn">Send</button>

          </div>

        </div>

      </form>

    </div>
  )
}

export default Comments