import React, { Component } from 'react';
import {HashRouter,Link,Route} from 'react-router-dom';
import './main.css';


class Login extends Component {

    fnLogin=()=>{
        this.props.history.push('/layout');
    }

    render() {
        return (
            <from>
                <h2>用户登录</h2>
                <p>
                    <label>用户名：</label>
                    <input type="text" />
                </p>
                <p>
                    <label>密&nbsp;&nbsp;&nbsp;码：</label>
                    <input type="text" />
                </p>
                <p><input type="button" value="登录" onClick={ this.fnLogin } /></p>
            </from>
        );
    }
}


class Layout extends Component {
    render() {
        return (
            <div>
                <div className="menu">
                    <p>
                    <Link to="/layout/page01">菜单一</Link></p>
                    <p>
                    <Link to="/layout/page02">菜单二</Link></p>
                    <p>
                    <Link to="/layout/page03">菜单三</Link></p>
                </div>
                <div className="content">
                    <Route exact path="/layout" component={ Page01 } />
                    <Route path="/layout/page01" component={ Page01 } />
                    <Route path="/layout/page02" component={ Page02 } />
                    <Route path="/layout/page03" component={ Page03 } />
                </div>
            </div>
        );
    }
}


function Page01(){
    return <h1>主页面内容一</h1>
}

function Page02(){
    return <h1>主页面内容二</h1>
}

function Page03(){
    return <h1>主页面内容三</h1>
}


class Luyou02 extends Component {
    render() {
        return (
            <HashRouter>
                <Route exact path="/" component={ Login } />
                <Route path="/layout" component={ Layout } />
            </HashRouter>
        );
    }
}

export default Luyou02;