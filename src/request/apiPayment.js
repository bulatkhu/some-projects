import axios from 'axios'
import {APP_BASE_URL} from '../app.config'
import {getToken} from './apiRequests'


export async function createPayment(data) {
  const token = getToken()

  if (!token) {
    return {
      data: {
        status: 401,
        error: 'Курс сатып алу үшін тіркеліп сайтқа кіріңіз'
      }
    }
  }

  return axios.post(`${APP_BASE_URL}/payment/create`, { ...data, token })
}


export async function checkPayment(id) {

  return axios.get(`${APP_BASE_URL}/getTransaction/${ id }`)
}