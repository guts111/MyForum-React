import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/reset.css'
import './assets/bootstrap.css'
import './assets/main.css'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
