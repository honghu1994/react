import React, { Component } from 'react';
import './search.css';


class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            aHouseList:[],
            type:'1',
            key:''
        }
    }

    fnChange=(ev)=>{
        this.setState({
            [ev.target.name]:ev.target.value
        })
    }

    fnSearch=()=>{
        if(this.state.key==''){
            alert('请输入关键词');
            return;
        }

        this.axios.get('/newhouse_list',{params:{
            type:this.state.type,
            key:this.state.key
        }}).then(dat=>{
            this.setState({
                aHouseList:dat.data.data
            })
        })
    }

    render() {
        let { aHouseList,type,key } = this.state;
        return (
            <div>
                <div className="search_bar">
                    <select name="type" className="search" value={ type } onChange={ this.fnChange }>
                        <option value="0">新房</option>
                        <option value="1">二手房</option>
                        <option value="2">租房</option>
                    </select>
                    <input name="key" type="text" className="search_input" value={ key } onChange={ this.fnChange } />
                    <input type="button" value="搜索" className="search_btn" onClick={ this.fnSearch } />
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
            </div>
        );
    }
}

export default Search;