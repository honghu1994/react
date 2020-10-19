import React from 'react';
import { Button,Badge } from 'element-react';
import 'element-theme-default';
import './index.css';
import { HashRouter, Route } from 'react-router-dom';
import List from './list.js';
import Cart from './cart.js';


// 导入connent，它可以帮我们连接store
import { connect } from 'react-redux';

// function App(props){
// let App = function(props){    
let App = props=>{
        return (
            <div className="main_wrap">
                <img src="./static/images/banner.png" />
                <div className="menu">
                    {/* 定义路由的链接 */}
                    <a href="#/">
                        <Button type="success">商品列表</Button>
                    </a>
                    {/* 定义显示购物车商品数量的组件 */}
                    <Badge value={ props.iTotal }>
                        {/* 定义路由的链接 */}
                        <a href="#/cart">
                            <Button type="success">购物车</Button>
                        </a>
                    </Badge>
                </div>
                <HashRouter>
                    {/* 定义路由对应的组件 */}
                    <Route exact path="/" component={ List } />
                    <Route path="/cart" component={ Cart } />
                </HashRouter>
            </div>
        );
    }

// 定义一个函数，将组件中的state属性映射到props属性上
// state的值就是数据中心里面最新的数据
let mapStateToProps = state =>{
    let fnCountTotalNum=()=>{
        let iTotal = 0;
        // 遍历数组，累加num的值
        state.map(item=>{
            iTotal += item.num;
        })
        return iTotal;
    }
    return {
        iTotal:fnCountTotalNum()
    }
}


// 通过connect来改写导出
// connect第一层参数：第一个参数是mapStateToProps，它是一个函数，作用是将state中的属性映射到props属性上
// 第二个参数是mapDispatchToProps,作用是将dispatch相关的方法映射到props属性上
// 没有dispatch相关的方法，那么第二个参数可以写成一个null
export default connect(mapStateToProps,null)(App);