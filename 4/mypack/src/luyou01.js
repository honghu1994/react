import React, { Component } from 'react';
import { HashRouter,Link,Route,Switch, Redirect} from 'react-router-dom';
import './main.css';

// 定义组件01
function Page01(){
    return <p>页面组件一</p>
}

// 定义组件02
function Page02(){
    return <p>页面组件二</p>
}

// 定义组件03
function Page03(){
    return (
        <ul>
            {/* 可以用a标签代替link表示，但是连接的路由地址前需要加上“#” */}
            <li><Link to="/page03/detail/1001">新闻标题一</Link></li>
            <li><a href="#/page03/detail/1002">新闻标题二</a></li>
            <li><a href="#/page03/detail/1003">新闻标题三</a></li>
        </ul>
    )
}
// 定义404组件
function NotFound(){
    return <p>你要的页面未找到！</p>
}
// 定义新闻详情页组件
function Detail(props){
    // 组件中通过 props.match.params.newsid 来得到路由传递的参数
    return <div><p>这个新闻详情页,新闻的id是：{ props.match.params.newsid }</p></div>
}

// 定义自定义路由组件
function CustomLink({label,to,exact}){
    return (
        <Route
            path = { to }
            exact = { exact }
            children={({match})=>(
                <Link className={ match?'active':''} to={ to } >{ label }</Link>
            )}
        
        />
    )
}

// 定义包含路由的组件
class Luyou01 extends Component {
    render() {
        return (
            <HashRouter>

                {/* 
                <Link className="active" to="/">页面一</Link>&nbsp;&nbsp;&nbsp;
                <Link to="/page02">页面二</Link>&nbsp;&nbsp;&nbsp;
                <Link to="/page03">页面三</Link>&nbsp;&nbsp;&nbsp; 
                */}
                
                <CustomLink label="页面一" to="/page01" />&nbsp;&nbsp;&nbsp;
                <CustomLink label="页面二" to="/page02" />&nbsp;&nbsp;&nbsp;
                <CustomLink label="页面三" to="/page03" exact={ true } />

                <hr />
                {/* 加上switch 404才能正常匹配，否则404页面还会匹配根目录 */}
                <Switch>
                    {/* 路由默认是模糊匹配，加上exact可以实现精确匹配  */}
                    <Route exact path="/page01" component={ Page01 } />
                    <Route path="/page02" component={ Page02 } />
                    <Route exact path="/page03" component={ Page03 } />
                    {/* 路由传参的写法，通过newsid接收路由的参数 */}
                    <Route path="/page03/detail/:newsid" component={ Detail } />

                    {/* 定义重定向 */}
                    <Redirect exact from="/" to="/page01" />

                    {/* 定义404对应的路由组件 */}
                    <Route component={ NotFound } />
                </Switch>

            </HashRouter>
        );
    }
}
export default Luyou01;