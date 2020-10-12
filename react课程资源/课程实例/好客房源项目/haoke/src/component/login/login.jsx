import React, { Component } from 'react';
import './login.css';
import logo from '../../static/images/login_title.png';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }

    fnChange=(ev)=>{
        this.setState({
            [ev.target.name]:ev.target.value
        })
    }

    fnSubmit=()=>{
        this.axios.post('/login',{
            username:this.state.username,
            password:this.state.password
        }).then(dat=>{
            //console.log(dat.data);
            let oRs = dat.data;
            if(oRs.code==200){
                sessionStorage.setItem('haoke_token',oRs.token);
                // 重新跳转到当前页面，做路由判断，如果有token，就跳到用户页面
                // 如果没有token，就跳到登录页
                this.props.history.push('/layout/user');
            }else{
                alert(oRs.msg);
            }
        })
    }

    render() {
        let { username,password } = this.state;
        return (
            <>
            <div className="login_wrap">
                <a href="javascript:;" className="back" onClick={ ()=>{ this.props.history.goBack() }}></a>
                <div className="login_title">
                    <img src={ logo } alt="login" />
                </div>
                <form className="login_form">
                    <div className="form_group">
                        <input name="username" type="text" onChange = { this.fnChange } value={ username } placeholder="用户名" />
                        <input name="password" type="password" onChange = { this.fnChange }  value={ password } placeholder="密码" />
                    </div>
                    <input type="button" value="登 录" className="input_sub" onClick={this.fnSubmit } />
                </form>
                <div className="register">新用户注册</div>
                <div className="findpass">忘记密码</div>
            </div>
            </>
        );
    }
}

export default Login;