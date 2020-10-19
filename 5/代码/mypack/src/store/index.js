// 从redux中导入creactStore
import { createStore } from 'redux'

// 导入reducer
import reducer from './reducer.js'

// 创建一个store对象，并且关联reducer
let store = createStore(reducer);

// 导出store
export default store;