import React from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, reduxDevTools)}>
    <App/>
  </Provider>, document.getElementById('root')
)

registerServiceWorker()
