import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import * as actions from './actions'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)
export default store
export { reducer, actions }

