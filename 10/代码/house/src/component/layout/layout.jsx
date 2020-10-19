import React, { Component } from 'react';
import './layout.css';
import { Route,Link } from 'react-router-dom';
import Home from '../home/home.jsx';
import Search from '../search/search.jsx';
import User from '../user/user.jsx';
import Newhouselist from '../newhouselist/newhouselist.jsx';
import Detail from '../detail/detail.jsx';
import Login from '../login/login.jsx';
import Quiz from '../quizlist/quizlist.jsx';
import Question from '../question/question.jsx';
import Chart from '../chart/chart.jsx';


class Layout extends Component {
    render() {
        return (
            <div>
                <Route exact path="/layout" component={ Home }  />
                <Route path="/layout/search" component={ Search }  />
                {/* 通过是否有token来动态加载组件
                    如果有token，那么这个路由会加载User组件，
                    如果没有，就会加载Login组件
                */}
                <Route path="/layout/user" render={()=>{
                    let sToken = sessionStorage.getItem('haoke_token');
                    if(sToken){
                        return <User />
                    }else{
                        // 做路由判断的组件，不能继承父组件props上面的history
                        // 需要我们手动传入
                        return <Login history={ this.props.history } />
                    }
                }} />

                <Route path="/layout/newhouselist" component={ Newhouselist }  />
                <Route path="/layout/quiz" component={ Quiz }  />
                <Route path="/layout/detail/:house_id" component={ Detail }  />
                <Route path="/layout/question/:quiz_id" component={ Question }  />
                <Route path="/layout/chart" component={ Chart }  />

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