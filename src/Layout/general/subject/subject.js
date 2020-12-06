import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import './subject.scss'
import SubjectWrapper from './subjectWrapper'
import Loader from '../component/loader/loader'
import {isEmpty} from '../../../scripts/isEmpty/isEmpty'
import LoaderContainer from '../container/loaderContainer/loaderContainer'
import {getDetailCourse} from '../../../request/apiRequests'


const Subject = ({container, match}) => {
  const [response, setResponse] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState({bool: false, msg: ''})
  const id = match.params.id

  useEffect(() => {

    if (id) {
      try {
        getDetailCourse(id)
          .then(res => {
            setResponse(res.data)
            setIsLoaded(true)
          })
          .catch(err => {
            setIsLoaded(true)
            setError({bool: true, msg: `${err.message}, server did not response with course id: ${id}`})
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      setIsLoaded(true)
      setError({bool: true, msg: 'Wrong id in url request'})
    }

  }, [id])

  const cls = ['subject__container']

  container && cls.push('_container')


  return (
    <section className="subject">

      <div
        className={['subject__container', container ? '_container' : null].join(' ')}
      >


        {
          isLoaded && !isEmpty(response)
            ? <SubjectWrapper response={response} isLoaded={isLoaded} />

            : error.bool
              ? <LoaderContainer>
                  <h3 className="error__big text-center">{error.msg}</h3>
                </LoaderContainer>
              : <Loader container/>
        }

      </div>

    </section>
  )
}

export default withRouter(Subject)