import React, { Component } from 'react';
import './question.css';

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            oQuiz:{},
            aAnswerList:[],
            sClass:'answer_form',
            sContent:''
        }
    }

    componentWillMount(){
        let quiz_id = this.props.match.params.quiz_id;
        let oP01 = this.axios.get('/question',{params:{'quiz_id':quiz_id}});
        let oP02 = this.axios.get('/answer',{params:{'quiz_id':quiz_id}});
        
        Promise.all([oP01,oP02]).then(result=>{ 
            this.setState({
                oQuiz:result[0].data.data,
                aAnswerList:result[1].data.data.reverse()
              
            })

         });
    }

    fnRefreshAnswer=()=>{
        this.axios.get('/answer').then(dat=>{
            this.setState({
                aAnswerList:dat.data.data.reverse(),
                sContent:''
            })
        })
    }


    fnSwitch=()=>{
        let token = sessionStorage.getItem('haoke_token');
        if(token){
            if(this.state.sClass=='answer_form'){
                this.setState({
                    sClass:'answer_form answer_form_show'
                })
            }else{
                this.setState({
                    sClass:'answer_form'
                })
            }

        }else{
            alert('请登录之后再回复！')
        }
    }

    fnChange=(ev)=>{
        this.setState({
            sContent:ev.target.value
        })
    }

    fnSubmit=()=>{
        // 判断输入框是否为空
        if(this.state.sContent==''){
            alert('请输入内容！');
            return;
        }
        this.axios.post('/reply',{
            sReply:this.state.sContent
        }).then(dat=>{
           if(dat.data.code==200){
               this.fnRefreshAnswer();
           }else{
               alert('回复失败！')
           }
        })
    }

    
    render() {
        let { oQuiz, aAnswerList, sClass, sContent} = this.state;
        return (
            <div>
                <div className="question_con">
                    <h3>{oQuiz.quiz_title}</h3>
                    <div className="author_about">
                        <span className="q_info">{oQuiz.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({oQuiz.read})&nbsp;&nbsp;|&nbsp;&nbsp;{oQuiz.time}</span>
                        <span className="answer_btn" onClick={ this.fnSwitch }>我来回答</span>
                    </div>
                    <div className={ sClass }>
                        <textarea value={ sContent } onChange = { this.fnChange }></textarea>
                        <a href="javascript:;" onClick={ this.fnSubmit }>提交</a>
                    </div>    
                </div>

                <div className="answer_con">
                <h3>已有回复：</h3>
                {
                    aAnswerList.map((item,i)=>(
                        <div className="answer_list" key={i}>
                            <img src={item.url} alt="" />
                            <div className="answer_detail">
                                <div className="author"><span>{item.answer_author}</span><em>{item.time}</em></div>
                                <p>{item.content}</p>
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