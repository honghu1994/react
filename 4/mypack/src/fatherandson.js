import React, { Component } from 'react';

class Father extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'tom',
            iNum:0
        }
    }

    fnGetData=(n)=>{
        this.setState({
            iNum:n
        })
    }

    render() {
        return (
            <div>
                <h1>这是父组件</h1>
                <p>父组件的一个数据，通过子组件传递进来后，改变值：{ this.state.iNum }</p>
                {/* 父组件传值给子组件 */}
                <Son 
                    name={ this.state.name }
                    fnSet = { this.fnGetData }
                />
            </div>
        );
    }
}


class Son extends Component {
    render() {
        return (
            <div>
                <p>这里是子组件，得到父组件传递的值：{ this.props.name }</p>
                <input type="button" value="传值给父组件" onClick={()=>{ this.props.fnSet(10) }  } />
            </div>
        );
    }
}





export default Father;