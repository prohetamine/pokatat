import React                   from 'react'
import ReactDOM                from 'react-dom'
import { BrowserRouter }       from 'react-router-dom'
import { Provider }            from 'react-redux'
import { createStore
       , combineReducers
       , applyMiddleware
       , compose }             from 'redux'
import thunkMiddleware         from 'redux-thunk';

import './index.css';
import App        from './App';

import auth       from './reducers/auth'
import lang       from './reducers/lang'
import global     from './reducers/global'
import notify     from './reducers/notify'
import profile    from './reducers/profile'
import users      from './reducers/users'
import requests   from './reducers/requests'

const reducer = combineReducers({
  profile, users, requests, lang, notify, global, auth
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

store.subscribe(() => {
  const state = store.getState()

  localStorage.authState      = JSON.stringify(state.auth)
  localStorage.globalState    = JSON.stringify(state.global)
  localStorage.langState      = JSON.stringify(state.lang)
  localStorage.notifyState    = JSON.stringify(state.notify)
  localStorage.profileState   = JSON.stringify(state.profile)
  localStorage.requestsState  = JSON.stringify(state.requests)
  localStorage.usersState     = JSON.stringify(state.users)
})

setTimeout(() => {
  store.dispatch({
    type: 'NOTIFY_ADDED_FRIEND'
  })
}, 5000)

setTimeout(() => {
  store.dispatch({
    type: 'NOTIFY_ADDED_FRIEND_SKIP'
  })
}, 10000)



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
