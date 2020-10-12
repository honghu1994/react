import React, { Component } from 'react';
import './quiz_list.css';
import ReactPullLoad, { STATS } from "react-pullload";
import 'react-pullload/dist/ReactPullLoad.css';

class Quiz_list extends Component {
    constructor(props){
        super(props);
        this.state = {
            aQuizList:[],
            // 定义是否加载更多
            hasMore: true,
            // 操作常量，固定写法
            action: STATS.init,
            // 可以上拉加载多少次，等于总页数减一
            index: 0,
            // 此变量存储当前是第几页
            page:1
        }
    }

    // 总操作函数，做下拉刷新和上拉加载更多的判断，不用改里面的代码
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


    // 下拉刷新执行的方法，本质上是去请求第一页的数据
    handRefreshing = () => {
        if (STATS.refreshing === this.state.action) {
          return false;
        }
     
        setTimeout(() => {
          //refreshing complete
          this.axios.get('/quiz_list').then(dat=>{
            this.setState({
                aQuizList:dat.data.data,
                hasMore: true,
                action: STATS.refreshed,
                index: dat.data.page-1,
                page:1
            })
            })


        }, 1000);
     
        this.setState({
          action: STATS.refreshing
        });
    };


    // 在上拉的时候去请求其他页的数据，每上拉一次加一页
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
               return {
                 page:state.page + 1
               }
            },()=>{
                //console.log(this.state.page);
                this.axios.get('/quiz_list',{params:{'page':this.state.page}}).then(dat=>{
                    this.setState(state=>{
                       var oNewArr = [...state.aQuizList,...dat.data.data]
                       return {
                        aQuizList: oNewArr,
                        action: STATS.reset,
                        index: this.state.index - 1
                       }
                    })
                })
            })
          }
        }, 1000);
     
        this.setState({
          action: STATS.loading
        });
      };


    componentWillMount(){
        this.axios.get('/quiz_list').then(dat=>{
            this.setState({
                aQuizList:dat.data.data,
                hasMore: true,
                action: STATS.refreshed,
                index: dat.data.page-1,
            })
        })
    }

    render() {
        let { aQuizList } = this.state;
        return (
            <div style={ {'marginBottom':'100px'} }>
                <div className="header_bar">
                    <span className="back"  onClick={ ()=>{ this.props.history.goBack() }}></span>
                    <h3>房屋问答列表</h3>
                </div>

                <ReactPullLoad
                    downEnough={30}
                    action={this.state.action}
                    handleAction={this.handleAction}
                    hasMore={this.state.hasMore}
                >

                <ul className="question_list quiz_list">
                    {
                        aQuizList.map((item,i)=>(
                            <li key={i}>
                                <div className="q_title"><a href={"#/layout/question/"+ item.quiz_id }>{item.quiz_title}</a></div>
                                <div className="q_info">{item.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({item.read})&nbsp;&nbsp;|&nbsp;&nbsp;{item.time}</div>
                                <div className="a_count">{ item.answer }</div>
                            </li>
                        ))
                    }                   
                </ul>
                </ReactPullLoad>
            </div>
        );
    }
}

export default Quiz_list;