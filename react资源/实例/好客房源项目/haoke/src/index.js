import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

// 设置请求的baseurl
axios.defaults.baseURL = 'http://localhost:7890';


// 添加请求的拦截器
axios.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('haoke_token');
    if(token){
        // 将token信息放入请求头中
        config.headers['Authorization'] = token;
    }
    // 在发起请求请做一些业务处理
    return config;
  }, function (error) {
    // 对请求失败做处理
    return Promise.reject(error);
});


// 将axios绑定到组件类的原型上，这样，所有的组件上都会有axios这个方法可以直接使用
Component.prototype.axios = axios;

ReactDOM.render(<App />, document.getElementById('root'));