import React, { Component } from 'react';
import '../../static/css/reset.css';
import '../../static/js/set_root.js'
import './layout.css';
import { Route,Link } from 'react-router-dom';
import Home from '../home/home';
import Search from '../search/search';
import User from '../user/user';
import List from '../list/list';
import Detail from '../detail/detail';
import Login from '../login/login';
import Quiz_list from '../quiz_list/quiz_list';
import Question from '../question/question';
import Chart from '../chart/chart';
import List2 from '../list2/list2';

class layout extends Component {
    render() {
        return (
            <div>
                 <Route exact path="/layout" component = { Home } />
                 <Route path="/layout/search" component = { Search } />                 
                 <Route path="/layout/list" component = { List } />
                 <Route path="/layout/list2" component = { List2 } />
                 <Route path="/layout/quiz" component = { Quiz_list } />
                 <Route path="/layout/chart" component = { Chart } />
                 <Route path="/layout/question/:quiz_id" component = { Question } />
                 <Route path="/layout/detail/:house_id" component = { Detail } />
                 <Route path="/layout/user" render={()=>{
                     let token = sessionStorage.getItem('haoke_token');
                     if(token){
                         // 这里做路由的拦截，路由的组件中就没有history对象
                         // 在这里通过props属性的方式将history传入到子组件中
                         return <User history = { this.props.history } />
                     }else{
                        return <Login  history = { this.props.history }  />
                     }
                 }} />

                 <footer>
                    <ul>
                        <CustomLink label="首页" to="/layout" exact={ true } />
                        <CustomLink label="搜索" to="/layout/search"  />
                        <CustomLink label="我的" to="/layout/user" />
                
                    </ul>
                </footer>
            </div>
        );
    }
}
// 定义自定义路由的组件
const CustomLink = ({label,to,exact})=>{
    return (
        <Route 
            path = { to }
            exact = { exact }
            children = {({match})=>(
                <li className={ match?'active':'' }>
                    <Link to={ to }></Link>
                    <h4>{ label }</h4>
                </li>
            )}        
        />
    )
}

export default layout;