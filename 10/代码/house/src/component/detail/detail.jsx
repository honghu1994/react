import React, { Component } from 'react';
import './detail.css';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            oDetailData:{
                tags:''
            },
            iHouse_id:this.props.match.params.house_id
        }
    }

    componentDidMount(){
        //console.log( this.state.iHouse_id );
        this.axios.get('/detail',{params:{house_id:this.state.iHouse_id}}).then(dat=>{
            this.setState({
                oDetailData:dat.data.data
            },()=>{
                //获取楼盘的坐标
                let aPos = this.state.oDetailData.map_pos;
                // 需要指定BMap这个对象是全局的对象，否则组件中找不到这个对象
                var BMap = window.BMap;
                // 创建地图实例  
                var map = new BMap.Map("baidu_map");
                // 创建点坐标  
                var point = new BMap.Point(aPos[0],aPos[1]);
                // 初始化地图，设置中心点坐标和地图级别  
                map.centerAndZoom(point, 15);

                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker); 
    

            })
        })
    }    
    render() {
        let { oDetailData } = this.state;
        return (
            <div>
                <div className="header_wrap">
                    <img src={oDetailData.url} />
                    <span className="back" onClick={()=>{ this.props.history.goBack() } } ></span>
                    <div className="has_read">
                        <em>{ oDetailData.viewed }</em>
                        <span>浏览</span>
                    </div>
                </div>
                <div className="center_wrap">
                    <h3 className="detail_name">{ oDetailData.house_name }</h3>
                    <div className="tags">
                        {
                            oDetailData.tags.split(',').map((item,i)=>(
                                <span key={i}>{ item }</span>
                            ))
                        }
                    </div>
                    <ul className="info_list">
                        <li>均价：<em>{ oDetailData.aprice }元/㎡</em></li>
                        <li>总价：<em>{ oDetailData.tprice }</em></li>
                        <li>用途：<em>{ oDetailData.purpose }</em></li>
                        <li>开盘：<em>{ oDetailData.start }</em></li>
                        <li>户型：<em>{ oDetailData.type }</em></li>
                        <li>建面：<em>{ oDetailData.area }㎡</em></li>
                    </ul>
                </div>

                <div className="map_wrap">
                    <h3 className="map_title">位置信息</h3>
                    <p className="position">位置：{ oDetailData.pos }</p>
                    <div className="map_show" id="baidu_map">
                       
                    </div>       
                </div>
            </div>
        );
    }
}

export default Detail;