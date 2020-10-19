import React, { Component } from 'react';
import './newhouselist.css'
import store from '../store'
 class Newhouselist extends Component {
   constructor(props){
     super(props);
     this.state={
       sCityName:store.getState().sCityName,
       aHouseList:[]
     }
   }
   componentDidMount(){
     this.axios.get('/newhouse_list',{
       params:{city:this.state.sCityName}
     }).then(dat=>{
     
       this.setState({
        aHouseList:dat.data.data
       })
     })
   }
  render() {
    let {aHouseList} =this.state
    return (
      <div> 
         <div className="header_bar">
        <span className="back" onClick={()=>{this.props.history.goBack()}}></span>
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
                <div className="price">{item.price}元/平</div>
                <div className="tags">
                {
                                        item.tags.split(',').map((subitem,index)=>(
                                            <span key={index}>{ subitem } </span>
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
export default Newhouselist
