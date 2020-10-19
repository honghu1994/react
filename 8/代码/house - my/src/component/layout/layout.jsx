import React, { Component } from 'react';
import './layout.css';
import { Route,Link } from 'react-router-dom';
import Home from '../home/home.jsx';
import Search from '../search/search.jsx';
import User from '../user/user.jsx';
import Newhouselist from '../newhouselist/newhouselist.jsx'
import Detail from '../detail/detail.jsx'
import Login from '../login/login.jsx'
class Layout extends Component {
    render() {
        return (
            <div>
                <Route exact path="/layout" component={ Home }  />
                <Route path="/layout/search" component={ Search }  />
             
                <Route path="/layout/newhouselist" component={ Newhouselist }  />
                <Route path="/layout/detail/:house_id" component={ Detail }  />

                
                <Route path="/layout/user" render={()=>{
                    let sToken =sessionStorage.getItem('haoke_token')
                    if(sToken){
                        return <User  />
                    }else{
                        return <Login history={this.props.history}  />
                    }
                }} />

                <footer>
                    <ul>
                        {/* 
                        <li className="active">
                            <a href="#/layout"></a>
                            <h4>首页</h4>
                        </li>
                        <li>
                            <a href="#/layout/search"></a>
                            <h4>搜索</h4>
                        </li>
                        <li>
                            <a href="#/layout/user"></a>
                            <h4>我的</h4>
                        </li> 
                        */}

                        <CustomLink label="首页" to="/layout" exact={ true } />
                        <CustomLink label="搜索" to="/layout/search" />
                        <CustomLink label="我的" to="/layout/user" />

                    </ul>
                </footer>
            </div>
        );
    }
}


// 定义自定义路由组件
function CustomLink({label,to,exact}){
    return(
        <Route 
            path = { to }
            exact = { exact }
            children={({match})=>(
                <li className={match?"active":""}>
                    <Link to={ to }></Link>
                    <h4>{ label }</h4>
                </li>
            )}    
        />
    )
}



export default Layout;