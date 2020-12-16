import axios from 'axios'
import {APP_BASE_URL} from '../app.config'
import {getToken} from './apiRequests'

export function getQuizById({contentId, id}) {

  return axios
    .get(`${APP_BASE_URL}/userDetailCourse/${contentId}`)
    .then(res => {
      const {parts} = res.data
      const lessons = Object.keys(parts).map(key => parts[key])
      const mergedLessons = [].concat.apply([], lessons)
      const lesson = mergedLessons.find(item => item.id === +id)
      if (res.status === 200) {
        return {
          error: false,
          quiz: lesson.quiz,
          currentLesson: lesson,
          parts
        }
      } else {
        return {
          error: true,
          message: {...res.data},
          quiz: lesson.quiz,
          currentLesson: lesson,
          parts
        }
      }
    })
}

export function takeQuizById({id = 4, results}) {
  const token = getToken()

  return axios.post(`${APP_BASE_URL}/takeQuiz?token=${token}&quizId=${id}`, results)
}

export function getStudentQuizzes() {
  const token = getToken()

  return axios.get(`${APP_BASE_URL}/getStudentQuizzs`, { params: { token } })
}