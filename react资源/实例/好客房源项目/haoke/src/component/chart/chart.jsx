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
                },
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
                        center:['50%', '40%'],
                        // 跳转环状图内半径和外半径的大小，相对于整体宽度
                        radius: ['40%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '14',
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

    componentWillMount(){
        this.axios.get('/chart').then(dat=>{
            //console.log(dat.data.data);
            this.setState(state=>{
                let oP01 = JSON.parse( JSON.stringify( state.option ) )
                oP01.series[0].data = dat.data.data.graph;

                let oP02 = JSON.parse( JSON.stringify( state.option2 ) )
                oP02.series[0].data = dat.data.data.pie;

                return {
                    option:oP01,
                    option2:oP02
                }

            })
        })

    }

    render() {
        return (
            <div>
                 <div className="header_bar">
                    <span className="back"  onClick={ ()=>{ this.props.history.goBack() } }></span>
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