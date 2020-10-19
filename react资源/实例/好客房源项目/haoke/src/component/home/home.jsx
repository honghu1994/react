import React, { Component } from 'react';
import 'swiper/dist/css/swiper.min.css';
import './home.css';
import Swiper from 'swiper/dist/js/swiper.min.js';
import store from '../../store';

class Slide extends Component {
    constructor(props){
        super(props);
        this.state = {
            aPicList:[]
        }
    }

    componentWillMount(){
        this.axios.get('/slide').then(dat=>{
            //console.log(dat.data.data);
            // setState是异步的，它结束之后，会调用一个回调函数
            this.setState({
                aPicList:dat.data.data
            },()=>{
                new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
        
                    // 设置自动播放
                    autoplay: {
                        // 设置鼠标滑动图片之后，鼠标移开，图片是否继续自动播放
                        // 默认值是true，就是图片不会自动播放，改为false就会自动播放
                        disableOnInteraction: false
                    },
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }           
                
                  })      
            })
        })
    }

    render(){
        let { aPicList } = this.state;
        return(
            <div className="slide_con">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            aPicList.map((item,i)=>(
                                <div className="swiper-slide" key={i}><a href={'#/layout/detail/'+ item.house_id }><img src={ item.url } alt="" /></a></div>
                            ))
                        }
                    </div>     
                    <div className="swiper-pagination"></div>       
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                
                </div>
            </div>
        )
    }
}

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            sClass:'city_wrap',
            aCityList:[],
            sCity_name:store.getState().sCity_name
        }
        this.unsubscribe = store.subscribe( this.fnStateChange )
    }

    fnChangeCity=(v)=>{
        this.fnCityShow();
        store.dispatch({
            type:'change_city',
            value:v
        })
    }
    fnStateChange=()=>{
        this.setState({
            sCity_name:store.getState().sCity_name 
        })
    }
    componentWillMount(){
        this.axios.get('/citys').then(dat=>{
            // console.log(dat.data.data);
            this.setState({
                aCityList:dat.data.data
            })

        })
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    // 切换样式，来切换城市列表的展开和关闭
    fnCityShow=()=>{
        if( this.state.sClass=='city_wrap' ){
            this.setState({
                sClass:'city_wrap slideUp'
            })
        }else{
            this.setState({
                sClass:'city_wrap'
            }) 
        }
    }

    render(){
        let { sClass, aCityList, sCity_name } = this.state;
        return (
            // 使用空标签作为容器标签
            <>
            <div className="search_con">
                <a href="javascript:;" className="city" onClick={ this.fnCityShow }>{ sCity_name }</a>
                <a href="#/layout/search" className="village">请输入小区名</a>
            </div>
            <div className={ sClass }>
            <div className="city_title">
                <a href="javascript:;" className="shutoff"  onClick={ this.fnCityShow }></a>
                <h3>选择城市</h3>
            </div>
            <div className="group_con">
                <div className="city_group">
                    <h4>当前定位</h4>
                    <ul>
                        <li>{ sCity_name }</li>
                    </ul>
                </div>
                {
                    aCityList.map((item,index)=>(
                        <div className="city_group" key={index}>
                        <h4>{ item.title }</h4>
                        <ul>
                            {
                                item.lists.map((v,j)=>(
                                    <li key={j} onClick={()=>{ this.fnChangeCity(v) }  } >{ v }</li>
                                ))
                            }
                        </ul>
                    </div>  
                    ))
                } 
            </div>
            </div>
            </>
        )
    }

}

class Menu extends Component {
    render(){
        return (
            <ul className="menu_con">
                <li>
                    <a href="#/layout/list"></a>
                    <h4>新房</h4>
                </li>
                <li>
                    <a href="#/layout/list"></a>
                    <h4>二手房</h4>
                </li>
                <li>
                    <a href="#/layout/list2"></a>
                    <h4>租房</h4>
                </li>
                <li>
                    <a href="#/layout/chart"></a>
                    <h4>房屋统计</h4>
                </li>
                <li>
                    <a href="#/layout/quiz"></a>
                    <h4>问答</h4>
                </li>
            </ul>
        )
    }

}

class NewHouse extends Component {
    constructor(props){
        super(props);
        this.state = {
            aHouseList:[],
            sCity_name:store.getState().sCity_name
        }

        this.unsubscribe = store.subscribe( this.fnStateChange )
    }

    fnStateChange=()=>{
        this.setState({
            sCity_name:store.getState().sCity_name 
        },()=>{// 在更新城市名称数据后，再调用获取城市列表数据的方法，更新城市列表数据
            this.fnGetList( this.state.sCity_name );
        })
    }

    componentWillMount(){
       this.fnGetList( this.state.sCity_name );
    }

    fnGetList=(sCity)=>{
        this.axios.get('/newhouse',{params:{'city':sCity}}).then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                aHouseList:dat.data.data 
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        let { aHouseList } = this.state;
        return (
                <div className="model">
                <div className="title_con">
                    <h3>新房推荐</h3>
                    <a href="#/layout/list"></a>
                </div>
                <ul className="house_list">
                    {
                        aHouseList.map((item,i)=>(
                            <li key={i}>
                                <a href={"#/layout/detail/" + item.house_id }><img src={ item.url } alt="pic" /></a>
                                <h4>{ item.house_name }</h4>
                                <div className="detail">{ item.sites_info }</div>
                                <div className="price">{item.price} 元/平</div>
                                <div className="tags">
                                    {
                                        item.tags.split(',').map((v,j)=>(
                                            <span key={j}>{ v }</span>
                                        ))
                                        }
                                    </div>
                            </li>
                        ))
                    }    
                    
                </ul>
            </div>
        );
    }

}

class Quiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            aQuiz_list:[]
        }
    }

    componentWillMount(){
        this.axios.get('/quiz').then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                aQuiz_list:dat.data.data
            })
        })
    }

    render(){
        let { aQuiz_list } = this.state;
        return (
            <div className="model">
                <div className="title_con">
                    <h3>好客问答</h3>
                    <a href="#/layout/quiz"></a>
                </div>
                <ul className="question_list">
                    {
                       aQuiz_list.map((item,i)=>(
                        <li key={i}>
                            <div className="q_title"><a href={"#/layout/question/"+ item.quiz_id}>{ item.quiz_title }</a></div>
                            <div className="q_info">{item.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({ item.read })&nbsp;&nbsp;|&nbsp;&nbsp;{ item.time }</div>
                            <div className="a_count">{ item.answer }</div>
                        </li>
                       )) 
                    }
                   
                </ul>
            </div>
        )
    }
}


class RentHouse extends Component {
    constructor(props){
        super(props);
        this.state = {
            aHouseList:[],
            sCity_name:store.getState().sCity_name
        }
        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    fnStoreChange=()=>{
        this.setState({
            sCity_name:store.getState().sCity_name
        },()=>{
            this.fnGetList( this.state.sCity_name )
        })
    }

    componentWillMount(){
        this.fnGetList( this.state.sCity_name )
    }

    componentWillUnmount(){
        this.unsubscribe();
    }


    fnGetList=(sCity)=>{
        this.axios.get('/renthouse',{params:{'city':sCity}}).then(dat=>{
            // console.log(dat.data.data);
            this.setState({
                aHouseList:dat.data.data
            })
        })
    }

    render(){
        let { aHouseList } = this.state;
        return(
            <div className="model mb120">
                <div className="title_con">
                    <h3>合租推荐</h3>
                    <a href="#/layout/list2"></a>
                </div>
                <ul className="house_list">
                    {
                        aHouseList.map((item,i)=>(
                            <li key={i}>
                                <a href={"#/layout/detail/" + item.house_id }><img src={ item.url } alt="pic" /></a>
                                <h4>{ item.house_name }</h4>
                                <div className="detail">{ item.house_info }</div>
                                <div className="price">￥ {item.price}/月</div>
                                <div className="tags">
                                    {
                                        item.tags.split(',').map((v,j)=>(
                                            <span key={j}>{ v }</span>
                                        ))
                                    }
        
                                </div>
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
        )
    }

}



class Home extends Component {
    render() {
        return (
            <div>
                <Slide />
                <SearchBar />
                <Menu />
                <NewHouse />
                <Quiz />
                <RentHouse />
            </div>
        );
    }
}

export default Home;