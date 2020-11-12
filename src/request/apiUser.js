import axios from 'axios'
import {getToken} from './apiRequests'
import {APP_BASE_URL} from '../app.config'



export async function getUserData() {
  const token = getToken()
  if (!token) return {error: 'invalid token'}

  return axios.get(`${APP_BASE_URL}/getUserByToken`, {params: { token }})
    .then(res => ({...res, error: false}))
    .catch(error => ({...error, error: true}))
}
