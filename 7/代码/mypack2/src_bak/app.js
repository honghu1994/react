import React, { Component } from 'react';
import { Button,Badge } from 'element-react';
import 'element-theme-default';
import './index.css';
import { HashRouter, Route } from 'react-router-dom';
import List from './list.js';
import Cart from './cart.js';
import store from './store';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 定义属性，存储商品的总数量
            iTotal:this.fnCountTotalNum()
        }
        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    fnStoreChange=()=>{
        this.setState({
            iTotal:this.fnCountTotalNum()
        })
    }

    // 定义方法，计算商品的总数量
    fnCountTotalNum=()=>{
        // 获取数据中心商品列表数组
        let aList = store.getState();
        let iTotal = 0;
        // 遍历数组，累加num的值
        aList.map(item=>{
            iTotal += item.num;
        })

        return iTotal;
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        return (
            <div className="main_wrap">
                <img src="./static/images/banner.png" />
                <div className="menu">
                    {/* 定义路由的链接 */}
                    <a href="#/">
                        <Button type="success">商品列表</Button>
                    </a>

                    {/* 定义显示购物车商品数量的组件 */}
                    <Badge value={ this.state.iTotal }>
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
}

export default App;