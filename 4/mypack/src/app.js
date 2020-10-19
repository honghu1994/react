// 从react模块中直接导入Component类
// 使用rcc快捷键
import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            iNum:10
        }
    }

    fnAdd=()=>{
        this.setState(state=>({iNum:state.iNum+1}))
    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <p>{ this.state.iNum }</p>
                <input type="button" value="递增" onClick={ this.fnAdd }  />
            </div>
        );
    }
}

export default App;