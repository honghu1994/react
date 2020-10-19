import React, { Component } from 'react';
import './quizlist.css';
import ReactPullLoad, { STATS } from "react-pullload";
import "react-pullload/dist/ReactPullLoad.css";


class Quizlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasMore: true,
            action: STATS.init,
            aQuziList:[],
            // 还可以下拉几次
            index:0,
            // 存储当前是第几页
            iPage:1            
        }
    }

    // 动态调用下拉刷新和上拉加载更多的方法：
    handleAction = action => {
        if (action === this.state.action) {
          return false;
        }     
        if (action === STATS.refreshing) {
          this.handRefreshing();
        } else if (action === STATS.loading) {
          this.handLoadMore();
        } else {
          //DO NOT modify below code
          this.setState({
            action: action
          });
        }
    };

    // 下拉刷新的方法
    handRefreshing = () => {
        if (STATS.refreshing === this.state.action) {
          return false;
        }
     
        setTimeout(() => {
            this.axios.get('/quiz_list').then(dat=>{
                this.setState({
                    aQuziList:dat.data.data,
                    hasMore: true,
                    action: STATS.refreshed,
                    // 还可以下拉几次
                    index:dat.data.page-1     
                })
            })
        }, 1000);
     
        this.setState({
          action: STATS.refreshing
        });

    };


    // 上拉加载更多的方法：
    handLoadMore = () => {
        if (STATS.loading === this.state.action) {
          return false;
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) {
          return;
        }
     
        setTimeout(() => {
          if (this.state.index === 0) {
            this.setState({
              action: STATS.reset,
              hasMore: false
            });
          } else {

            this.setState(state=>{
                return {iPage:state.iPage+1}
            },()=>{
                this.axios.get('/quiz_list',{params:{page:this.state.iPage}}).then(dat=>{
                    let aList = JSON.parse(JSON.stringify(this.state.aQuziList));
                    let aNewList = [...aList,...dat.data.data];
                    this.setState({
                        aQuziList:aNewList,
                        action: STATS.reset,
                        index: this.state.index - 1
                    })
                })
            })

          }
        }, 1000);
     
        this.setState({
          action: STATS.loading
        });
    };


    componentDidMount(){
        this.axios.get('/quiz_list').then(dat=>{
            this.setState({
                aQuziList:dat.data.data,
                hasMore: true,
                action: STATS.init,
                // 还可以下拉几次
                index:dat.data.page-1     
            })
        })
    }

    render() {
        let { aQuziList } = this.state;
        return (
            <div style={{'marginBottom':'50px'}}>
                <div className="header_bar">
                    <span className="back" onClick={()=>{ this.props.history.goBack() }}></span>
                    <h3>房屋问答列表</h3>
                </div>
                <ReactPullLoad
                    downEnough={50}
                    action={this.state.action}
                    handleAction={this.handleAction}
                    hasMore={this.state.hasMore}
                >
                <ul className="question_list quiz_list">
                    {
                        aQuziList.map((item,i)=>(
                            <li key={i}>
                                <div className="q_title"><a href={"#/layout/question/"+ item.quiz_id }>{item.quiz_title}</a></div>
                                <div className="q_info">{item.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({item.read})&nbsp;&nbsp;|&nbsp;&nbsp;{item.time}</div>
                                <div className="a_count">{item.answer}</div>
                            </li>
                        ))
                    }                   
                </ul>
                </ReactPullLoad>
            </div>
        );
    }
}

export default Quizlist;