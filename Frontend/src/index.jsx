
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { connectRouter, ConnectedRouter } from 'connected-react-router'

import promise from 'redux-promise'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

import reducers from './componentes/reducers'
import { belizeMiddleware } from './componentes/websocket/websocket'

import App from './componentes/App'

const history = createBrowserHistory()
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    connectRouter(history)(reducers),
    devTools,
    applyMiddleware(thunk, multi, promise, belizeMiddleware)
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'))