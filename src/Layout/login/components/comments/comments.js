import React from 'react'
import './comments.scss'
import Stars from '../../../general/stars/stars'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import AddComment from '../addComment/addComment'


const Comments = ({comments}) => {

  return (
    <div className="teacherPage__bottom bottomTeachPage">

      <h3 className="bottomTeachPage__title">Курс туралы пікірлер</h3>

      <div className="bottomTeachPage__content">

        {
          comments.length
            ? comments.map((comment, index) => {

            console.log(comment)

            return (
              <div key={index} className="bottomTeachPage__column">
                <div className="bottomTeachPage__comment">
                  <div className="bottomTeachPage__img">
                    {
                      comment.icon
                        ? <img src={comment.icon} alt="student"/>
                        : <NoPhoto/>
                    }
                  </div>

                  <div className="bottomTeachPage__about">
                    <h4 className="bottomTeachPage__name">{comment.name}</h4>
                    <Stars
                      className="bottomTeachPage__stars"
                      rating={comment.user.rate_count}
                      classNameOfValue="bottomTeachPage__starsValue"
                    />

                    <p className="bottomTeachPage__text">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            )

          })
            : <p className="text-center">Nobody did not leave a comment</p>
        }

      </div>

      <AddComment/>

    </div>
  )
}

export default Comments