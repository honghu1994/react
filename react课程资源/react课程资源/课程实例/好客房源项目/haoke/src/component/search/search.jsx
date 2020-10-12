import React, { Component } from 'react';
import './search.css';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            aOption:[0,1,2],
            aOptionName:{0:'新房',1:'二手房',2:'租房'},
            iSec:1,
            sKey:'',
            aHouseList:[]
        }
    }

    fnChange=(ev)=>{
        this.setState({
            [ev.target.name]:ev.target.value
        })
    }

    fnSearch=()=>{
        this.axios.get('/newhouse_list',{params:
            {'type':this.state.iSec,'key':this.state.sKey}
        }).then(dat=>{
            this.setState({
                aHouseList:dat.data.data
            })
        })
    }


    render() {
        let { aOption,aOptionName,iSec,sKey,aHouseList } = this.state;
        return (
            <div>
                <div className="search_bar">
                    <select className="search" name="iSec" value={ iSec } onChange={ this.fnChange }>
                        {
                            aOption.map((item,i)=>(
                                <option value={item} key={i}>{aOptionName[item]}</option>
                            ))
                        }
                    </select>
                    <input type="text" name="sKey" onChange = { this.fnChange } value={ sKey } className="search_input" />
                    <input type="button" value="搜索" className="search_btn" onClick={ this.fnSearch } />
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

export default Search;