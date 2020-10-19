import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
// 导入数据中心
import store from './store';

// 导入react-redux 的 Provider
import { Provider } from 'react-redux';

// 用Provider将根组件包裹，同时将store注入
// 那么，App里面的组件就可以直接使用store了，不用导入store
ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.getElementById('root')
);