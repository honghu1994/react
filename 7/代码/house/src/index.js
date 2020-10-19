import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 导入全局的样式重置
import './static/css/reset.css';

// 导入set_root.js,它可以帮我们设置html标签的文字大小，让我们可以在样式中使用rem单位
import './static/js/set_root.js'


ReactDOM.render(<App />, document.getElementById('root'));


