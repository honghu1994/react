import React, {Component} from 'react';
import './list.css';
import store from '../../store';

class List extends Component{
    constructor(props){
        super(props)
        this.state = {
            aHouseList:[],
            sCname:store.getState().sCityName
        }
        this.unsubscribe = store.subscribe(this.fnStoreChange);
    }

    fnStoreChange=()=>{
        this.setState({
            sCname:store.getState().sCityName 
        })
    }    

    componentWillMount(){
        this.axios.get('/renthouse_list',{params:{ city: this.state.sCname }}).then(dat=>{
            this.setState({
                aHouseList:dat.data.data
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
            return (
                <>
                    <div className="header_bar">
                        <span className="back"  onClick={()=>{this.props.history.goBack()}} ></span>
                        <h3>租房房源列表</h3>
                    </div>
                    <ul className="list">
                        {
                            this.state.aHouseList.map((item,i)=>(
                                <li key={i}>
                                    <a href={"#/layout/detail/"+ item.house_id }><img src={ item.url } alt="" /></a>
                                    <div className="detail_list">
                                        <h4>{ item.house_name }</h4>
                                        <div className="detail">{ item.house_info }</div>
                                        <div className="price">￥ { item.price }/月</div>
                                        <div className="tags">
                                            {
                                                item.tags.split(',').map((item,i)=>(
                                                    <span key={i}>{ item }</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }                       
                    </ul>
                </>
            )
    }
  
}

export default List;