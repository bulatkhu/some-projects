import axios from 'axios'
import {APP_BASE_URL} from '../app.config'

export function getQuizById(id = 4) {
  return axios.get(`${APP_BASE_URL}/getQuiz`, {
    params: {
          token: 'cy1iRmzPLIuBDzO',
          quizId: id
        }
      }
    )
    .then(res => ({...res}))
}

export function takeQuizById({id = 4, results}) {
  const token = 'cy1iRmzPLIuBDzO'

  return axios.post(`${APP_BASE_URL}/takeQuiz?token=${token}&quizId=${id}`, results)
    .then(res => ({...res}))
}