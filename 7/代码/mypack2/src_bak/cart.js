import React, { Component } from 'react';
import { Breadcrumb, Button, Table,InputNumber } from 'element-react';
import './index.css';
import store from './store';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: "名称",
                    prop: "goods_name"
                },
                {
                    label: "图片",
                    prop: "url",
                    render:data=>{
                        return (
                            <img src={ data.url } style={ {'width':'100%','padding':'10px 0px'} } />
                        )
                    }
                },
                {
                    label: "数量",
                    prop: "num",
                    render:data=>{
                        return (
                            <InputNumber size="small" defaultValue={data.num} value={ data.num } min="1" onChange={(value)=>{ this.fnChange( value, data.id )  } }></InputNumber>
                        )
                    }
                },
                {
                    label: "单价",
                    prop: "price"
                },
                {
                    label: "总价",
                    render:data=>{
                        return (
                            <span>{ data.num * data.price }</span>
                        )
                    }
                },
                {
                    label: "操作",
                    render:data=>{
                        return (
                            <Button type="danger" className="button" size="small" onClick={()=>{ this.fnDel( data.id ) }  }>删除</Button>
                        )
                    }
                }
            ],
            // 组件起始时去数据中心拿数据
            data:store.getState(),
            iTotalPrice:this.fnCountTotalPrice()
        }

        // 订阅数据中心的改变，触发fnStoreChange方法去数据中心再拿一次数据
        this.unsubscribe = store.subscribe( this.fnStoreChange );

    }

    // 定义方法来计算商品的总价
    fnCountTotalPrice=()=>{
        let aList = store.getState();
        let iTotalPrice = 0;
        aList.map(item=>{
            iTotalPrice += item.price*item.num
        });
        return iTotalPrice;

    }

    // 定义订阅数据中心改变触发的方法
    fnStoreChange=()=>{
        this.setState({
            data:store.getState(),
            iTotalPrice:this.fnCountTotalPrice()
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    fnChange=(val,id)=>{
        store.dispatch({
            type:'change_goods_num',
            value:val,
            id:id
        })
    }

    fnDel=(id)=>{
        store.dispatch({
            type:'delete_goods',
            id
        })
    }

    render() {
        return (
            <div>
                <Breadcrumb separator="/" className="mp10">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>购物车</Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    className="mp10"
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    highlightCurrentRow={true}
                />
                <div className="total_price"> 总价：￥ <em>{this.state.iTotalPrice}</em> </div>

            </div>
        );
    }
}
export default Cart;