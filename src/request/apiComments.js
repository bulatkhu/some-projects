import axios from 'axios'
import {getToken} from './apiRequests'
import {APP_BASE_URL} from '../app.config'


export const apiCreateCommentCourse = ({content_id, comment, parent}) => {
  const token = getToken()
  return axios.post(`${APP_BASE_URL}/content/CreateComment`,{ token, content_id, comment, parent })
}