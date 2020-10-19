import React, { Component } from 'react';
import './question.css';

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            iQuiz_id:this.props.match.params.quiz_id,
            oQuizDetail:{},
            aAnswerList:[],
            sClass:'answer_form',
            sReply:''

        }
    }
    componentDidMount(){
        // 请求问题的详细信息
        //console.log(this.state.iQuiz_id);
        this.axios.get('/question',{params:{quiz_id:this.state.iQuiz_id}}).then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                oQuizDetail:dat.data.data
            })
        });

        // 请求回答的列表数据
        this.fnGetAnswerList();

    }
    fnGetAnswerList=()=>{
        this.axios.get('/answer',{params:{quiz_id:this.state.iQuiz_id}}).then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                aAnswerList:dat.data.data.reverse()
            })
        })
    }
    fnSwitch=()=>{
        let sToken = sessionStorage.getItem('haoke_token');
        if(sToken){
            this.setState({sClass:'answer_form answer_form_show'})
        }else{
            alert('请登录后再回答问题！');
        }
    }
    fnChange=(ev)=>{
        this.setState({
            sReply:ev.target.value
        })
    }

    fnSubmit=()=>{
        if(this.state.sReply==''){
            alert('请输入回答内容！');
            return;
        }

        this.axios.post('/reply',{ sReply:this.state.sReply }).then(dat=>{
            //console.log(dat.data);
            if(dat.data.code==200){
                this.setState({
                    sReply:''
                })
            }
            this.fnGetAnswerList();
        })
    }

    render() {
        let { oQuizDetail,aAnswerList,sClass,sReply} = this.state;
        return (
            <div>
                <div className="question_con">
                    <h3>{oQuizDetail.quiz_title}</h3>
                    <div className="author_about">
                        <span className="q_info">{oQuizDetail.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({oQuizDetail.read})&nbsp;&nbsp;|&nbsp;&nbsp;{oQuizDetail.time}</span>
                        <span className="answer_btn" onClick={ this.fnSwitch }>我来回答</span>
                    </div>
                    <div className={sClass}>
                        <textarea value={ sReply } onChange={ this.fnChange }></textarea>
                        <span onClick={ this.fnSubmit }>提交</span>
                    </div>    
                </div>

                <div className="answer_con">
                    <h3>已有回复：</h3>
                    {
                        aAnswerList.map(item=>(
                            <div className="answer_list" key={ item.answer_id }>
                                <img src={ item.url } alt="" />
                                <div className="answer_detail">
                                    <div className="author"><span>{ item.answer_author }</span><em>{ item.time }</em></div>
                                    <p>{ item.content }</p>
                                </div>
                            </div>
                        ))
                    }
                   
                </div>
            </div>
        );
    }
}

export default Question;