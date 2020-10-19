import React, { Component } from 'react';
import './quizlist.css';

class Quizlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            aQuziList:[]
        }
    }

    componentDidMount(){
        this.axios.get('/quiz_list').then(dat=>{
            this.setState({
                aQuziList:dat.data.data
            })
        })
    }

    render() {
        let { aQuziList } = this.state;
        return (
            <div>
                <div className="header_bar">
                    <span className="back" onClick={()=>{ this.props.history.goBack() }}></span>
                    <h3>房屋问答列表</h3>
                </div>
                <ul className="question_list quiz_list">
                    {
                        aQuziList.map(item=>(
                            <li key={ item.quiz_id }>
                                <div className="q_title"><a href="#">{item.quiz_title}</a></div>
                                <div className="q_info">{item.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({item.read})&nbsp;&nbsp;|&nbsp;&nbsp;{item.time}</div>
                                <div className="a_count">{item.answer}</div>
                            </li>
                        ))
                    }
                   
                </ul>
            </div>
        );
    }
}

export default Quizlist;