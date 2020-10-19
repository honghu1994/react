import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

// 导入全局的样式重置
import './static/css/reset.css';

// 导入set_root.js,它可以帮我们设置html标签的文字大小，让我们可以在样式中使用rem单位
import './static/js/set_root.js'


// 设置axios的基地址：
axios.defaults.baseURL = 'http://localhost:7890';


// 设置axios的请求拦截器
axios.interceptors.request.use(function (config) {
    let sToken = sessionStorage.getItem('haoke_token');
    // 如果有token信息
    if(sToken){
        // 就将token信息加入到请求头信息中
        config.headers['Authorization'] = sToken;
    }
    return config;
  }, function (error) {
    // 对请求失败做处理
    return Promise.reject(error);
});


// 将axios绑定到组件类的原型上，这样，所有的组件就会自动拥有axios这个方法
// 组件中就不用导入axios
Component.prototype.axios = axios;


ReactDOM.render(<App />, document.getElementById('root'));


