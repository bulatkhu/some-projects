import React, {useState} from 'react'
import {Translate, Translator} from 'react-translated'
import {ApiCreateCommentParts} from '../../../../../request/apiQuizzes'
import {requestErrorsHandler} from '../../../../../helpers/requestErrorHandler'
import './addTestComment.scss'



const AddTestComment = ({id}) => {
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)


  const onAddComment = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    setSuccess(null)
    setError(null)
    event.target.comment.value = ''


    ApiCreateCommentParts({comment, partId: id})
      .then(res => {
        setSuccess(res.data.msg)
        setTimeout(() => {
          setSuccess(null)
        },3000)
      })
      .catch(err => {
        const error = requestErrorsHandler(err)
        setError(error)
      })
  }


  return (
    <form onSubmit={onAddComment} className="courseQuestion__form courseQuestFrom">
      {
        success ? <p className="success">{success}</p> : null
      }

      {
        error ? <p className="error__middle">{error}</p> : null
      }

      <Translator>
        {({translate}) => (
          <textarea
            name="comment"
            required
            className="courseQuestFrom__input"
            placeholder={translate({text: 'Сұрағыңызды жазыңыз...'})}
          />
        )}
      </Translator>

      <div className="courseQuestFrom__wrapper">

        <label htmlFor="attachFile">
          <input name="file" id="attachFile" className="courseQuestFrom__file" multiple type="file"/>
          <span className="courseQuestFrom__button">
                              <Translate text="Foto or File"/>
                            </span>
        </label>

        <button type="submit" className="btn__shadowFromNull courseQuestFrom__button"><Translate text="Send"/></button>

      </div>

    </form>
  )
}

export default AddTestComment