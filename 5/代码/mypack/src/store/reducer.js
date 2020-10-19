import {CHANGE_VAL, ADD_LIST, DEL_LIST, INIT_DATA} from './actiontype.js';

// 定义一个对象，对象中存放state的初始数据
let oDefaultData = {
    aTodolist:[],
    sTodo:''
}

// 定义一个函数reducer
// reducer接收两个参数，一个参数是state的值
// 一个参数是组件传递过来的action对象
let reducer = (state=oDefaultData,action)=>{
    // 通过type判断需要改state里面的哪个值
    if(action.type==CHANGE_VAL){
        // 将state复制一份
        let oNewState = JSON.parse( JSON.stringify(state) );
        // 修改新的state里面的sTodo的值
        oNewState.sTodo = action.value;
        // 将新的state的值返回，这个值将代替state，作为state最新的值
        return oNewState;
    }
    if(action.type==ADD_LIST){
        let oNewState = JSON.parse( JSON.stringify(state) );
        // 将输入框里面的值增加到数组中
        oNewState.aTodolist.push( oNewState.sTodo );
        // 清空输入框里面的值
        oNewState.sTodo = '';        
        return oNewState;
    }
    if(action.type==DEL_LIST){
        let oNewState = JSON.parse( JSON.stringify(state) );
        oNewState.aTodolist.splice(action.value,1)     
        return oNewState;
    }
    if(action.type==INIT_DATA){ 
        return action.value;
    }
    return state;
}

export default reducer;