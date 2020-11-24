import axios from 'axios'
import {APP_BASE_URL} from '../app.config'

export function getCoursesForPrices() {
  return axios.get(`${APP_BASE_URL}/getContentGroupped`)
    .then(res => ({...res, error: false}))
    .catch(err => ({...err, error: true}))
}