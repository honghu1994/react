import React, { Component } from 'react';
import './main.css';
import axios from 'axios';
// 导入action中type对应的几个常量
import {CHANGE_VAL, ADD_LIST, DEL_LIST, INIT_DATA} from './store/actiontype.js'

// 导入文件夹的名称，相当于导入文件夹里面的index.js
import store from './store'

class Todolist extends Component {
    constructor(props){
        super(props);
        // 从数据中心获取初始的数据
        this.state = store.getState();

        // 订阅数据中心的数据修改
        // 数据发生改变会触发fnStoreChange方法
        // 订阅的方法会返回一个方法，这个方法可以取消订阅
        this.unsubscribe = store.subscribe(this.fnStoreChange);
    }

    // 在组件初始化时去请求数据
    // 数据返回后提交修改数据的工单，将数据更新到数据中心
    componentDidMount(){
        axios.get('./data.json').then(dat=>{
            //console.log(dat.data);
            store.dispatch({
                type:INIT_DATA,
                value:dat.data
            })
        })
    }

    // 在组件销毁之前需要取消数据中心的订阅
    // 取消订阅，组件不会再切换时出现内存溢出的错误
    componentWillUnmount(){
        this.unsubscribe();
    }


    // 定义数据中心发生改变时，自动调用的方法
    // 此方法再去获取一次store里面的数据
    fnStoreChange=()=>{
        this.setState( store.getState() )
    }
    fnChange=(ev)=>{
        // 创建一个修改store的工单，它是一个对象
        // 对象的type值是告诉数据中心，要改哪个值
        // 对象的value值是告诉数据中心，将这个值改成什么
        let action ={
            type:CHANGE_VAL,
            value:ev.target.value
        }
        // 通过store.dispatch来提交工单
        store.dispatch( action );
    }
    fnAdd=()=>{
        // 提交一个工单，在数组后面增加一个成员，成员的值是sTodo
        // sTodo的值在数据中心里面有，所以不用传递
        store.dispatch({
            type:ADD_LIST
        })
    }

    fnDel=(i)=>{
        store.dispatch({
            type:DEL_LIST,
            value:i
        })
    }

    render() {
        let { aTodolist,sTodo } = this.state;
        return (
            <div className="list_con">
                <h2>To do list</h2>
                <input type="text" className="inputtxt" value={ sTodo } onChange={ this.fnChange } />
                <input type="button" value="增加" className="inputbtn" onClick={ this.fnAdd } />
                
                <ul id="list" className="list">
                    {
                        aTodolist.map((item,i)=>(
                             <li key={i}><span>{item}</span><a href="javascript:;" className="del" onClick={ ()=>{ this.fnDel(i) } }>删除</a></li>
                        ))
                    }            

                </ul>

            </div>
        );
    }
}

export default Todolist;