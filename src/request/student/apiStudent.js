import axios from 'axios'
import {APP_BASE_URL} from '../../app.config'
import {getToken} from '../apiRequests'


export const apiGetStudentsCourses = async () => {
  return axios.get(APP_BASE_URL + `/user/purchased`, { params: { token: getToken() } })
}