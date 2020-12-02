import axios from 'axios'
import {APP_BASE_URL} from '../app.config'
import {getToken} from './apiRequests'


export async function createPayment(data) {
  const token = getToken()

  if (!token) {
    return 'invalid token'
  }

  return axios.post(`${APP_BASE_URL}/payment/create`, { ...data, token })
}