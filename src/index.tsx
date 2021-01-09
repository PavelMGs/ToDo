import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.css';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import rootReducers from './redux/redusers';
import { listReducer } from './redux/redusers/redusers';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

// @ts-ignore
const store = new createStore(rootReducers, applyMiddleware(logger));

// store.subscribe(() => {
//     console.log('### store', store.getState());
// });

export type storeType = typeof store;



ReactDom.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));