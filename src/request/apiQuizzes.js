import axios from 'axios'
import {APP_BASE_URL} from '../app.config'
import {getToken} from './apiRequests'

export function getQuizById(id = 4) {

  return axios.get(`${APP_BASE_URL}/getQuiz`, {
    params: {
          token: getToken(),
          quizId: id
        }
      }
    )
}

export function takeQuizById({id = 4, results}) {
  const token = getToken()

  return axios.post(`${APP_BASE_URL}/takeQuiz?token=${token}&quizId=${id}`, results)
}