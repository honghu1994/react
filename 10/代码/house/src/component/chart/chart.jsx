import React, { Component } from 'react';
import './chart.css';
import ReactEcharts from 'echarts-for-react';

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            option:{
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line',
                    smooth: true
                }],
                grid: {// 调整曲线图上下左右的间距
                    show: true,             
                    x:60,
                    x2:30,
                    y:20,
                    height:150
                }
            },
            option2:{
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    data:['新房','二手房','租房']
                },
                series: [
                    {
                        name:'成交量',
                        type:'pie',
                        // 设置圆环的内外半径，相对整个页面的宽度
                        radius: ['40%', '55%'],
                        center:['50%', '40%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '15',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]
                    }
                ]
            }
                        
        }
    }
    componentDidMount(){
        this.axios.get('/chart').then(dat=>{
            //console.log(dat.data.data);
            let oData = dat.data.data;

            this.setState(state=>{
                let oGraphData = JSON.parse( JSON.stringify( state.option ) )
                let oPieData = JSON.parse( JSON.stringify( state.option2 ) )
                oGraphData.series[0].data = oData.graph;
                oPieData.series[0].data = oData.pie;

                return {
                    option:oGraphData,
                    option2:oPieData
                }
            })
        })
    }

    render() {
        return (
            <div>
                <div className="header_bar">
                    <span className="back" onClick={()=>{ this.props.history.goBack() } } ></span>
                    <h3>房屋统计</h3>
                </div>
                <div className="chart_wrap">
                    <h3 className="chart_title">新房日成交量</h3>
                    <div className="chart_con">
                        <ReactEcharts
                            option={this.state.option}
                            lazyUpdate={true}
                        />
                    </div>        
                </div>
                <div className="chart_wrap">
                    <h3 className="chart_title">房屋成交量对比</h3>
                    <div className="chart_con">
                        <ReactEcharts
                            option={this.state.option2}
                            lazyUpdate={true}
                        />
                    </div>        
                </div>
            </div>
        );
    }
}

export default Chart;