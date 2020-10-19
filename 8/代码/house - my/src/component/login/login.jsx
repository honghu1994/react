import React, { Component } from 'react';
import './login.css'
import logo from '../../static/images/login_title.png'
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
      //console.log(dat);
      if(dat.data.code==200){
        sessionStorage.setItem('haoke_token',dat.data.token)
        this.props.history.push('/layout/user')
      }else{
        alert(dat.data.msg)
      }
    })
  }
  render() {
let {username,password}=this.state
    return (
      <div>
        <div className="login_wrap">
          <span className="back" onClick={()=>{this.props.history.goBack()}}></span>
          <div className="login_title">
            <img src={logo} alt="login" />
        </div>
            <form className="login_form">
              <div className="form_group">
                <input type="text" placeholder="用户名" name="username" value={username} onChange={this.fnChange} />
                  <input type="password" placeholder="密码" name="password" value={password} onChange={this.fnChange} />
            </div>
                  <input type="button" value="登 录" className="input_sub" onClick={this.fnSubmit} />
        </form>
                  <div className="register">新用户注册</div>
                  <div className="findpass">忘记密码</div>
    </div>
              </div>
              );
            }
          }
          export default Login


          
