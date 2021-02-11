// import {getQuizById} from '../../../request/apiQuizzes'
// // import axios from "axios";
// // import {APP_BASE_URL} from "../../../app.config";
//
// export const SET_TESTS = 'SET_TESTS'
// export const SET_TEST_VIDEO = 'SET_TEST_VIDEO'
// export const SET_TESTS_PARTS = 'SET_TESTS_PARTS'
// export const SET_CURRENT_LESSON = 'SET_CURRENT_LESSON'
// export const ERROR_TESTS = 'ERROR_TESTS'
//
// function partsToSideParts(parts) {
//   if (!parts) return []
//
//   return Object.keys(parts).map(part => {
//     return {
//       title: part,
//       players: parts[part]
//         .map(part => ({
//           link: `/login/student/detail-course/${part.content_id}/${part.id}`,
//           ...part
//         }))
//     }
//   })
// }
//
//
//
// export const getTestsData = ({contentId, id}) => {
//
//   return dispatch => {
//
//     getQuizById({contentId})
//       .then(res => {
//         const {parts} = res.data
//         const lessons = Object.keys(parts).map(key => parts[key])
//         const mergedLessons = [].concat.apply([], lessons)
//         const lesson = mergedLessons.find(item => item.id === +id)
//         if (res.status === 200) {
//           return {
//             error: false,
//             quiz: lesson.quiz,
//             currentLesson: lesson,
//             parts
//           }
//         } else {
//           return {
//             error: true,
//             message: {...res.data},
//             quiz: lesson.quiz,
//             currentLesson: lesson,
//             parts
//           }
//         }
//       })
//       .then(res => {
//
//         console.log('res', res)
//
//         dispatch({
//           type: SET_TEST_VIDEO,
//           payload: res.currentLesson.upload_video
//         })
//         dispatch({
//           type: SET_TESTS_PARTS,
//           payload: partsToSideParts(res.parts)
//         })
//
//         // setLinkToVideo(res.currentLesson.upload_video)
//         // setSideParts(partsToSideParts(res.parts))
//
//         if (!res.error) {
//           if (!res.quiz) {
//
//             dispatch({
//               type: ERROR_TESTS,
//               payload: 'Error, this course does\'t have any quizzes'
//             })
//             // setError(`Error, this course does't have any quizzes`)
//             // setTestItems(null)
//             // setIsTestItemsFetching(false)
//             return null
//           }
//           dispatch({
//             type: SET_CURRENT_LESSON,
//             payload: res.currentLesson
//           })
//           // setCurrentLesson(res.currentLesson)
//           // setIsTestItemsFetching(false)
//
//           const {questions, duration} = res.quiz
//           const newTestItems = questions.map(item => {
//             return {
//               options: item.options,
//               video: item.video,
//               multiple: !!item.is_multiple,
//               text: item.question,
//               questionId: item.id,
//               questions: item.options.map(option => {
//                 return option.option_text
//               }),
//               answer: [],
//               rightAnswers: item.options
//                 .map((option, index) => {
//                   if (!!option.correct) {
//                     return index
//                   }
//                   return null
//                 })
//                 .filter(answer => {
//                   return !!(answer || answer === 0)
//                 })
//             }
//           })
//           dispatch({
//             type: SET_TESTS,
//             payload: newTestItems,
//             duration
//           })
//           // setTestItems(newTestItems)
//           // setTestAnswersItems(newTestItems)
//           // changeTestState(prev => ({...prev, time: +duration || 14}))
//         } else {
//           dispatch({
//             type: ERROR_TESTS,
//             payload: `Request error:, ${res.message}`
//           })
//           // setError(`Request error:, ${res.message}`)
//           // setIsTestItemsFetching(false)
//         }
//       })
//       .catch(err => {
//         dispatch({
//           type: ERROR_TESTS,
//           payload: `Error: ${err.message}`
//         })
//
//         // console.log('error', JSON.parse(JSON.stringify(err)))
//         // setError(`Error: ${err.message}`)
//         // setIsTestItemsFetching(false)
//       })
//
//   }
// }
