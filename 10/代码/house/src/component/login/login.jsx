import React, { Component } from 'react';
import logo from '../../static/images/login_title.png';
import './login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
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
            // 如果登录成功
            if(dat.data.code==200){
                // 将返回的token写入sessionstorege中
                sessionStorage.setItem('haoke_token',dat.data.token);
                // 重新跳转到当前路由，让当前路由做判断，加载对应的组件
                this.props.history.push('/layout/user');
            }else{
                // 如果登录失败，直接弹出提示信息
                alert(dat.data.msg);
            }
        })
    }

    render() {
        let {username,password} = this.state;
        return (
            <div>
                 <div className="login_wrap">
                    <span className="back"  onClick={()=>{ this.props.history.goBack() } }></span>
                    <div className="login_title">
                        <img src={ logo } alt="login" />
                    </div>
                    <form className="login_form">
                        <div className="form_group">
                            <input type="text" name="username" value={ username } onChange={ this.fnChange } placeholder="用户名" />
                            <input type="password" name="password" value={ password } onChange={ this.fnChange } placeholder="密码" />
                        </div>
                        <input type="button" value="登 录" className="input_sub" onClick={ this.fnSubmit } />
                    </form>
                    <div className="register">新用户注册</div>
                    <div className="findpass">忘记密码</div>
                </div>
            </div>
        );
    }
}

export default Login;