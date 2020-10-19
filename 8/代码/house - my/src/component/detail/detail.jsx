import React, { Component } from 'react';
import './detail.css'
 class Detail extends Component {
   constructor(props){
    super(props);
    this.state={
      oDetailData:{
        //给空为了方便对对象使用map方法,第一次需要空才能不报错.
        tags:''
      },
      iHouse_id:this.props.match.params.house_id
    }
   }
  componentDidMount(){
    this.axios.get('/detail',{
      params:{house_id:this.state.iHouse_id}
    }).then(dat=>{
      
      this.setState({
        oDetailData:dat.data.data
      })
    })
  }
  render() {
    let {oDetailData}=this.state
    return (
      <div> 
        <div className="header_wrap">
        <img src={oDetailData.url} />
        <span  className="back" onClick={()=>{this.props.history.goBack()}}></span>
        <div className="has_read">
            <em>{oDetailData.viewed}</em>
            <span>浏览</span>
        </div>
    </div>
    <div className="center_wrap">
        <h3 className="detail_name">{oDetailData.house_name}</h3>
        <div className="tags">
          {oDetailData.tags.split(',').map((item,i)=>(
            <span key={i}>{item}</span>
          ))
          }
         
        </div>
        <ul className="info_list">
            <li>均价：<em>{oDetailData.aprice}元/㎡</em></li>
            <li>总价：<em>{oDetailData.tprice}</em></li>
            <li>用途：<em>{oDetailData.purpose}</em></li>
            <li>开盘：<em>{oDetailData.start}</em></li>
            <li>户型：<em>{oDetailData.type}</em></li>
            <li>建面：<em>{oDetailData.area}</em></li>
        </ul>
    </div>

    <div className="map_wrap">
        <h3 className="map_title">位置信息</h3>
        <p className="position">位置：{oDetailData.pos}</p>
        <div className="map_show">
            <img src="../../static/images/map.jpg" alt="" />
        </div>       
    </div>

    <footer>
        <ul>
            <li className="active">
                <a href="#"></a>
                <h4>首页</h4>
            </li>
            <li>
                <a href="#"></a>
                <h4>搜索</h4>
            </li>
            <li>
                <a href="#"></a>
                <h4>我的</h4>
            </li>
        </ul>
    </footer>
      </div>
    );
  }
}
export default Detail
