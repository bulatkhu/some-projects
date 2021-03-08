import React, { useState, useEffect } from 'react'
import { Translate, Translator } from 'react-translated'
import Stars from '../../../general/stars/stars'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import { ApiCreateCommentParts } from '../../../../request/apiQuizzes'
import { requestErrorsHandler } from '../../../../helpers/requestErrorHandler'
import { getFromUserMeta } from '../../../../scripts/dataHandler/dataHandler'
import { SITE_BASE_URL } from '../../../../app.config'
import {apiCreateCommentCourse} from '../../../../request/apiComments'
import './comments.scss'
// import AddComment from '../addComment/addComment'


const Comments = ({ comments, noStars, id }) => {
  const [reply, setReply] = useState([]);
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let arr = [];
    console.log(comments)
    for (let com of comments) {
      arr.push({
        id: com.id,
        parent: com.parent,
        show: false
      })
    }
    setReply(arr)
  }, [comments])


  useEffect(() => {
    console.log(reply)
  }, [reply])

  const showReply = (i) => {
    let arr = reply.map(r => ({ ...r }))
    arr[i].show = !arr[i].show;
    setReply(arr);
  }

  const onAddCommentParent = (event, i) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    setSuccess(null);
    setError(null);
    event.target.comment.value = '';

    if(id){
    ApiCreateCommentParts({ comment, partId: id, parent: reply[i].id })
      .then(res => {
        setSuccess(res.data.msg);
        console.log(res.data, 'haofuihasiufhauhfasui');
        setTimeout(() => {
          setSuccess(null)
        }, 3000);
      })
      .catch(err => {
        const error = requestErrorsHandler(err);
        setError(error);
      });
    }
    else {
      apiCreateCommentCourse({
        content_id: comments[0].content_id, 
        comment,
        parent: reply[i].id
      })
      .then(res => {
        setSuccess(res.data.msg);
        console.log(res.data, 'haofuihasiufhauhfasui');
        setTimeout(() => {
          setSuccess(null)
        }, 3000);
      })
      .catch(err => {
        const error = requestErrorsHandler(err);
        setError(error);
      });
    }
  }
  

  return (
    <div className="teacherPage__bottom bottomTeachPage">

      <div className="bottomTeachPage__content">

        {
          comments.length && reply.length
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

              const childs = comment.myComments && comment.myComments.map((comment, index) => {

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

                    <div key={index} className="bottomTeachPage__column"
                    style={{
                      margin:'0px 0px 10px 40px'
                    }}
                    >
                      <div className="bottomTeachPage__comment">
                        <div className="bottomTeachPage__img">
                          {
                            img
                              ? <img src={img} alt="student" />
                              : <NoPhoto />
                          }
                        </div>

                        <div className="bottomTeachPage__about">
                          <h4 className="bottomTeachPage__name">{comment.name}</h4>
                          {!noStars
                            ?
                            <Stars
                              className="bottomTeachPage__stars"
                              rating={comment.user.rate_count}
                              classNameOfValue="bottomTeachPage__starsValue"
                            />
                            :
                            null
                          }

                          <p className="bottomTeachPage__text">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                        })


              return (
                <>
                  <div key={index} className="bottomTeachPage__column">
                    <div className="bottomTeachPage__comment">
                      <div className="bottomTeachPage__img">
                        {
                          img
                            ? <img src={img} alt="student" />
                            : <NoPhoto />
                        }
                      </div>

                      <div className="bottomTeachPage__about">
                        <h4 className="bottomTeachPage__name">{comment.name}</h4>
                        {!noStars
                          ?
                          <Stars
                            className="bottomTeachPage__stars"
                            rating={comment.user.rate_count}
                            classNameOfValue="bottomTeachPage__starsValue"
                          />
                          :
                          null
                        }

                        <p className="bottomTeachPage__text">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn__shadowFromNull courseQuestFrom__button"
                      onClick={() => { showReply(index) }}
                      style={{
                        margin: '10px 0px 0px 0px',
                        minWidth:'84px'
                      }}
                    >Ответить
                    </button>
                  </div>

                  {reply[index].show ?

                    <form onSubmit={(e) => onAddCommentParent(e, index)} className="courseQuestion__form courseQuestFrom">
                      {
                        success ? <p className="success">{success}</p> : null
                      }

                      {
                        error ? <p className="error__middle">{error}</p> : null
                      }
                      <Translator>
                        {({ translate }) => (
                          <textarea
                            name="comment"
                            required
                            className="courseQuestFrom__input"
                            placeholder={translate({ text: 'Сұрағыңызды жазыңыз...' })}
                          />
                        )}
                      </Translator>

                      <div className="courseQuestFrom__wrapper">

                        <label htmlFor="attachFile">
                          <input name="file" id="attachFile" className="courseQuestFrom__file" multiple type="file" />
                          <span className="courseQuestFrom__button">
                            <Translate text="Foto or File" />
                          </span>
                        </label>

                        <button type="submit" className="btn__shadowFromNull courseQuestFrom__button"><Translate text="Send" /></button>

                      </div>

                    </form>
                    :
                    null
                  }
                  {childs ? childs : null}
                </>
              )

            })
            : <p className="text-center">Nobody did not leave a comment</p>
        }

      </div>

    </div>
  )
}

export default Comments