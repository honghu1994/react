import React, { Component } from 'react';
import './detail.css';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            oData:{
                tags:''
            }
        }
    }
    componentWillMount(){
       let house_id = this.props.match.params.house_id;
       this.axios.get('/detail',{params:{'house_id':house_id}}).then(dat=>{
           // console.log(dat.data.data);
           this.setState({
                oData:dat.data.data
           },()=>{
                //获取地图的定位坐标点
                let oPos = this.state.oData.map_pos;

                // 下面这句非常重要，告诉系统BMap这个对象在哪里，否则会报错找不到BMap
                let BMap = window.BMap;
                var map = new BMap.Map("baidu_map");
                // 创建地图实例  
                var point = new BMap.Point(oPos[0],oPos[1]);
                // 创建点坐标  
                map.centerAndZoom(point, 15);

                // 在地图上添加指示地址的红色标记
                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);  
           })
       })
    }

    render() {
        let { oData} = this.state;
        return (
            <div>
                <div className="header_wrap">
                <img src={oData.url} />
                <a href="javascript:;" className="back" onClick={ ()=>{ this.props.history.goBack() } }></a>
                <div className="has_read">
                    <em>{ oData.viewed }</em>
                    <span>浏览</span>
                </div>
            </div>
            <div className="center_wrap">
                <h3 className="detail_name">{oData.house_name}</h3>
                <div className="tags">
                   {
                       oData.tags.split(',').map((item,i)=>(
                           <span key={i}>{ item }</span>
                       ))
                   }
                </div>
                <ul className="info_list">
                    <li>均价：<em>{oData.aprice}元/㎡</em></li>
                    <li>总价：<em>{oData.tprice}</em></li>
                    <li>用途：<em>{oData.purpose}</em></li>
                    <li>开盘：<em>{oData.start}</em></li>
                    <li>户型：<em>{oData.type}</em></li>
                    <li>建面：<em>{oData.area}㎡</em></li>
                </ul>
            </div>

            <div className="map_wrap">
                <h3 className="map_title">位置信息</h3>
                <p className="position">位置：{ oData.pos }</p>
                <div className="map_show" id="baidu_map">
                  
                </div>       
            </div>
            </div>
        );
    }
}

export default Detail;