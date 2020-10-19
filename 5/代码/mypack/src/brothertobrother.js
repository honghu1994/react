// 从react模块中直接导入Component类
// 使用rcc快捷键
import React, { Component } from 'react';
// 从event模块导入EventEmitter类，它的对象可以帮我们在组件之间传递数据
import { EventEmitter } from 'events';

// 实例化一个EventEmitter的对象
let bus = new EventEmitter();

class Father extends Component {
    constructor(props){
        super(props);
   
    }
   
    render() {
        return (
            <div>
                <h1>我是父组件</h1>
                <Son01 />
                <Son02 />
            </div>
        );
    }
}


class Son01 extends Component {
    fnSend=()=>{
        bus.emit('go',{msg:'我来自组件01'})
    }

    render(){
        return(
            <div>
                <p>我是组件01，发送数据的子组件</p>
                <input type="button" value="发送数据" onClick={ this.fnSend } />
            </div>
        )
    }

}


class Son02 extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg:''
        }
    }

    componentDidMount(){
        bus.on('go',dat=>{
            this.setState({
                msg:dat.msg
            })
        })
    }
    
    render(){
        return(
            <div>
                <p>我是组件02，接收组件01发送过来的数据：{ this.state.msg }</p>              
            </div>
        )
    }

}



export default Father;