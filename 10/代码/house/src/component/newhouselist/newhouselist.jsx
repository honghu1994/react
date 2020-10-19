import React, { Component } from 'react';
import './newhouselist.css';
import store from '../store';

class Newhouselist extends Component {
    constructor(props){
        super(props);
        this.state = {
            sCityName:store.getState().sCityName,
            aHouseList:[]
        }
    }
    componentDidMount(){
        this.axios.get('/newhouse_list',{params:{city:this.state.sCityName}}).then(dat=>{
            this.setState({
                aHouseList:dat.data.data
            })
        })
    }
    render() {
        let { aHouseList } = this.state;
        return (
            <>
                <div className="header_bar">
                    {/* 通过history上的goBack方法可以返回到这个页面的上一个路由 */}
                    <span className="back" onClick={()=>{ this.props.history.goBack() } }></span>
                    <h3>新房列表</h3>
                </div>
                <ul className="list">
                    {
                        aHouseList.map(item=>(
                            <li key={ item.house_id }>
                                <a href={"#/layout/detail/"+item.house_id} className=""><img src={item.url} alt="" /></a>
                                <div className="detail_list">
                                    <h4>{item.house_name}</h4>
                                    <div className="detail">{item.sites_info}</div>
                                    <div className="price">{item.price} 元/平</div>
                                    <div className="tags">
                                        {
                                            item.tags.split(',').map((subitem,i)=>(
                                                <span key={i}>{ subitem } </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }                   
                </ul>
            </>
        );
    }
}

export default Newhouselist;