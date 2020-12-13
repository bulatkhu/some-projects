import React from 'react'
import Stars from '../../../general/stars/stars'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import {getFromUserMeta} from '../../../../scripts/dataHandler/dataHandler'
import {SITE_BASE_URL} from '../../../../app.config'
import './comments.scss'
// import AddComment from '../addComment/addComment'


const Comments = ({comments}) => {

  return (
    <div className="teacherPage__bottom bottomTeachPage">

      <div className="bottomTeachPage__content">

        {
          comments.length
            ? comments.map((comment, index) => {

              const avatar = getFromUserMeta(comment.user, 'avatar') ||
                getFromUserMeta(comment.user, 'profile_photo') || null
              let img
              if (!avatar) {
                img = null
              } else {

                if (avatar.includes('http')) {
                  img = avatar
                } else {
                  img = `${SITE_BASE_URL}/${avatar}`
                }

              }


              return (
                <div key={index} className="bottomTeachPage__column">
                  <div className="bottomTeachPage__comment">
                    <div className="bottomTeachPage__img">
                      {
                        img
                          ? <img src={img} alt="student"/>
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

    </div>
  )
}

export default Comments