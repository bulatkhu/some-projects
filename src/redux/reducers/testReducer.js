import {ERROR_TESTS, SET_CURRENT_LESSON, SET_TEST_VIDEO, SET_TESTS, SET_TESTS_PARTS} from '../actions/test/test'

const initialState = {
  tests: null,
  isLoaded: false,
  currentVideo: null,
  sideParts: [],
  testsError: null,
  currentLesson: null,
  answerTests: null,
  showTest: false,
  startTest: false,
  time: 14,
  showResults: false,
}





export default function TestReducer(state = initialState, action) {

  switch (action.type) {
    case SET_TESTS_PARTS:
      return {...state, sideParts: action.payload}
    case SET_TEST_VIDEO:
      return {...state, currentVideo: action.payload}
    case SET_TESTS:
      return {...state, tests: action.payload, answerTests: action.payload, time: action.duration}
    case SET_CURRENT_LESSON:
      return {...state, currentLesson: action.payload, isLoaded: true}
    case ERROR_TESTS:
      return {...state, testsError: action.payload, isLoaded: true, tests: null}
    default:
      return state
  }
}
