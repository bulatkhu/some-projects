import axios from 'axios'
import {APP_BASE_URL} from "../app.config";


export async function apiGetTeachers() {
  return axios.get(`${APP_BASE_URL}/teacher/lists`)
    .then(res => ({...res, error: false}))
    .catch(res => ({...res, error: true}))
}

export async function apiGetTeacherById(id) {
  return axios.get(`${APP_BASE_URL}/teacher/getById`, {params: { id }})
    .then(res => ({...res, error: false}))
    .catch(res => ({...res, error: true}))
}
