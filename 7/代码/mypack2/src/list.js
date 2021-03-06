import React from 'react';
import { Breadcrumb,Layout,Card,Button } from 'element-react';
import './index.css';
import { connect } from 'react-redux';


let List = props=>{
        return (
            <div>
                 <Breadcrumb separator="/" className="mp10">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                </Breadcrumb>

                <Layout.Row gutter="20" className="mp10 mb30">
                    {
                        props.aGoods_list.map(item=>(
                            <Layout.Col span="6" key={ item.id }>
                                <Card bodyStyle={{ padding: 0 }}>
                                    <img src={item.url} className="goods_pic" />
                                    <div style={{ padding: 14 }}>
                                        <h3 className="goods_name">{item.goods_name}</h3>
                                        <div className="price">￥ <em>{item.price}</em></div>
                                        <Button type="danger" className="button" size="small" onClick={()=>{ props.fnAdd(item) }  }>加入购物车</Button>
                                    </div>
                                </Card>
                            </Layout.Col>
                        ))
                    }                   
                  
                </Layout.Row>

            </div>
        );
}

let mapStateToProps = state =>{
    return {
        aGoods_list:[
            {
                "id":1001,
                "goods_name":"男式黑白格子衬衫",
                "url":"./static/images/clothes01.jpg",
                "price":169,
                "num":1
            },
            {
                "id":1002,
                "goods_name":"纯棉印花宽松长袖T恤",
                "url":"./static/images/clothes02.jpg",
                "price":69,
                "num":1
            },
            {
                "id":1003,
                "goods_name":"男士连帽夹克2019春季新款",
                "url":"./static/images/clothes03.jpg",
                "price":249,
                "num":1
            },
            {
                "id":1004,
                "goods_name":"2019夏装新品时尚百搭",
                "url":"./static/images/clothes04.jpg",
                "price":49,
                "num":1
            }
        ]
    }
}


let mapDispatchToProps = dispatch =>{
    return {
        fnAdd(obj){
            dispatch({
                type:'add_cart',
                value:obj
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);