import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxStore from './redux/reduxStore'
import App from './App'
import './Index.scss'
import {checkIsAuth} from './redux/actions/auth/authActionsFuncs'

reduxStore.dispatch(checkIsAuth())



ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)