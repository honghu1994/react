import React, { Component } from 'react';
import { Breadcrumb, Button, Table,InputNumber } from 'element-react';
import './index.css';
import { connect } from 'react-redux';

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
                            <InputNumber size="small" defaultValue={data.num} value={ data.num } min="1" onChange={(value)=>{ this.props.fnChange( value, data.id )  } }></InputNumber>
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
                            <Button type="danger" className="button" size="small" onClick={()=>{ this.props.fnDel( data.id ) }  }>删除</Button>
                        )
                    }
                }
            ]
        }   
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
                    data={this.props.data}
                    highlightCurrentRow={true}
                />
                <div className="total_price"> 总价：￥ <em>{this.props.iTotalPrice}</em> </div>

            </div>
        );
    }
}


let mapStateToProps = state =>{
    let fnCountTotalPrice=()=>{      
        let iTotalPrice = 0;       
        state.map(item=>{
            iTotalPrice += item.price*item.num
        });
        return iTotalPrice;
    }
    return {
        data:state,
        iTotalPrice:fnCountTotalPrice()
    }
}

let mapDispatchToProps = dispatch =>{
    return {
        fnChange(val,id){
            dispatch({
                type:'change_goods_num',
                value:val,
                id:id
            })
        },    
        fnDel(id){
            dispatch({
                type:'delete_goods',
                id
            })
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Cart);