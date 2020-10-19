import React, { Component } from 'react';
import './list.css';
import store from '../../store';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            aHouseList:[],
            sCity_name:store.getState().sCity_name
        }
    }

    componentWillMount(){
        this.axios.get('/newhouse_list',{params:{'city':this.state.sCity_name}}).then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                aHouseList:dat.data.data
            })
        })
    }

    render() {
        let { aHouseList } = this.state;
        return (
            <div>
                <div className="header_bar">
                    <span className="back" onClick={ ()=>{ this.props.history.goBack() }}></span>
                    <h3>新房列表</h3>
                </div>
                <ul className="list">
                    {
                        aHouseList.map((item,i)=>(
                            <li key={i}>
                                <a href={"#/layout/detail/"+item.house_id} className=""><img src={item.url} alt="" /></a>
                                <div className="detail_list">
                                    <h4>{item.house_name}</h4>
                                    <div className="detail">{item.sites_info}</div>
                                    <div className="price">{item.price} 元/平</div>
                                    <div className="tags">
                                        {
                                            item.tags.split(',').map((v,j)=>(
                                                <span key={j}>{v}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                   
                </ul>
            </div>
        );
    }
}

export default List;