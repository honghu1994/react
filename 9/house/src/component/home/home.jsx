import React, { Component } from 'react';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper/js/swiper.min.js';
import './home.css';
import store from '../store';

// 定义首页轮播图组件
class Slide extends Component {
    constructor(props){
        super(props);
        this.state = {
            aPicList:[]
        }
    }
    componentDidMount(){
        this.axios.get('/slide').then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                aPicList:dat.data.data
            },()=>{//在setState的回调函数中再创建swiper对象                 
                new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项        
                    // 设置自动播放，而且用户在操作之后，也不会禁止自动播放
                    autoplay: {
                        disableOnInteraction: false,
                    },                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    },                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                  })
             })
        })       
    }
    render() {
        let { aPicList } = this.state;
        return (
            <div className="slide_con">
                <div className="swiper-container">
                    {/* 轮播的内容 */}
                    <div className="swiper-wrapper">
                        {
                            aPicList.map(item=>(
                                <div className="swiper-slide" key={ item.house_id }><img src={ item.url } /></div>
                            ))
                        }
                    </div>

                    {/* 轮播图的下面的小圆点 */}
                    <div className="swiper-pagination"></div>

                    {/* 轮播图左右的箭头 */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>                    
                </div>
            </div>
        );
    }
}

// 定义切换城市及搜索框组件
class City extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 定义变量来存储样式名
            sClass:'city_wrap',
            aCityList:[],
            sCurrentCity:store.getState().sCityName
        };

        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    fnStoreChange=()=>{
        this.setState({
            sCurrentCity:store.getState().sCityName
        })
    }


    componentWillUnmount(){
        this.unsubscribe();
    }

    componentDidMount(){
        this.axios.get('/citys').then(dat=>{
            //console.log(dat.data.data);
            this.setState({
                aCityList:dat.data.data
            })
        })
    }

    // 定义设置城市名的方法
    fnChangeCity=(val)=>{
        store.dispatch({
            type:'change_city_name',
            value:val
        });
        // 关闭城市列表页面
        this.fnSwitch();
    }

    // 定义方法来切换样式名
    // 城市列表的样式如果是city_wrap，它的高度就是0，也就是不显示
    // 城市列表的样式如果是city_wrap slideUp，它的高度就是100%，就可以显示出来
    fnSwitch=()=>{
        this.setState(state=>{
            if(state.sClass=='city_wrap'){
                return { sClass:'city_wrap slideUp' }
            }else{
                return { sClass:'city_wrap' }
            }
        })
    }
    render(){
        let { sClass,aCityList,sCurrentCity } = this.state;
        return(
            // 组件中可以用空标签作为容器标签
            <>
            <div className="search_con">
                <span className="city" onClick={ this.fnSwitch }>{sCurrentCity}</span>
                <span className="village">请输入小区名</span>
            </div>
            <div className={ sClass }>
            <div className="city_title">
                <span className="shutoff" onClick={ this.fnSwitch }></span>
                <h3>选择城市</h3>
            </div>
            <div className="group_con">
                <div className="city_group">
                    <h4>当前定位</h4>
                    <ul>
                        <li>{sCurrentCity}</li>
                    </ul>
                </div>
                {
                    aCityList.map(item=>(
                        <div className="city_group" key={ item.title }>
                            <h4>{item.title}</h4>
                            <ul>
                                {
                                    item.lists.map(val=>(
                                        <li key={ val } onClick={()=>{ this.fnChangeCity(val) }  }>{ val }</li>
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


// 创建菜单组件
class Menu extends Component {
    render(){
        return(
            <ul className="menu_con">
                <li>
                    <a href="#/layout/newhouselist"></a>
                    <h4>新房</h4>
                </li>
                <li>
                    <a href="#"></a>
                    <h4>二手房</h4>
                </li>
                <li>
                    <a href="#"></a>
                    <h4>租房</h4>
                </li>
                <li>
                    <a href="#"></a>
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

class Newhouse extends Component {
    constructor(props){
        super(props);
        this.state = {
            sCityname:store.getState().sCityName,
            aNewHouseList:[]
        }
        this.unsubscribe = store.subscribe( this.fnStoreChange );
    }

    // 在数据中心的城市名称发生改变的时候，重新获取这个城市名
    // 然后将这个城市名称设置到state中，设置完成后
    // 再用这个名称发请求去获取这个城市对应的数据
    fnStoreChange=()=>{
        this.setState({
            sCityname:store.getState().sCityName
        },()=>{ 
            this.fnGetCityData( this.state.sCityname );        
        })
    }

    // 组件起始的时候用数据中心获取的城市名称去请求数据
    componentDidMount(){
        this.fnGetCityData( this.state.sCityname );
    }

    // 定义一个方法，接收一个城市名称作为参数
    // 这个方法通过这名称去请求新的数据，然后将返回的数据设置到state中
    fnGetCityData=(sName)=>{
        this.axios.get('/newhouse',{params:{city:sName}}).then(dat=>{
            this.setState({
                aNewHouseList:dat.data.data
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        let { aNewHouseList } = this.state;
        return(
            <div className="model">
                <div className="title_con">
                    <h3>新房推荐</h3>
                    <a href="#/layout/newhouselist"></a>
                </div>
                <ul className="house_list">
                    {
                        aNewHouseList.map(item=>(
                            <li key={ item.house_id }>
                                <a href="#"><img src={item.url} alt="pic" /></a>
                                <h4>{item.house_name}</h4>
                                <div className="detail">{item.sites_info}</div>
                                <div className="price">{item.price} 元/平</div>
                                <div className="tags">
                                    {
                                        item.tags.split(',').map((subitem,i)=>(
                                            <span key={i}>{ subitem } </span>
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

class Quiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            aQuizList:[]
        }
    }
    componentDidMount(){
        this.axios.get('/quiz').then(dat=>{
            this.setState({
                aQuizList:dat.data.data
            })
        })
    }
    render(){
        let { aQuizList } = this.state;
        return(
            <div className="model">
            <div className="title_con">
                <h3>好客问答</h3>
                <a href="#/layout/quiz"></a>
            </div>
            <ul className="question_list">
                {
                    aQuizList.map(item=>(
                        <li key={ item.quiz_id }>
                            <div className="q_title"><a href="#">{item.quiz_title}</a></div>
                            <div className="q_info">{item.quiz_author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读({ item.read })&nbsp;&nbsp;|&nbsp;&nbsp;{item.time}</div>
                            <div className="a_count">{ item.answer }</div>
                        </li>
                    ))
                }
               
            </ul>
        </div>
        )
    }
}


class Renthouse extends Component {
    constructor(props){
        super(props);
        this.state = {
            sCityname:store.getState().sCityName,
            aNewHouseList:[]
        }
        this.unsubscribe = store.subscribe( this.fnStoreChange );
    }

    // 在数据中心的城市名称发生改变的时候，重新获取这个城市名
    // 然后将这个城市名称设置到state中，设置完成后
    // 再用这个名称发请求去获取这个城市对应的数据
    fnStoreChange=()=>{
        this.setState({
            sCityname:store.getState().sCityName
        },()=>{ 
            this.fnGetCityData( this.state.sCityname );        
        })
    }

    // 组件起始的时候用数据中心获取的城市名称去请求数据
    componentDidMount(){
        this.fnGetCityData( this.state.sCityname );
    }

    // 定义一个方法，接收一个城市名称作为参数
    // 这个方法通过这名称去请求新的数据，然后将返回的数据设置到state中
    fnGetCityData=(sName)=>{
        this.axios.get('/renthouse',{params:{city:sName}}).then(dat=>{
            this.setState({
                aNewHouseList:dat.data.data
            })
        })
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        let { aNewHouseList } = this.state;
        return(
            <div className="model mb120">
                <div className="title_con">
                    <h3>合租推荐</h3>
                    <a href="#"></a>
                </div>
                <ul className="house_list">
                    {
                        aNewHouseList.map(item=>(
                            <li key={ item.house_id }>
                                <a href="#"><img src={item.url} alt="pic" /></a>
                                <h4>{item.house_name}</h4>
                                <div className="detail">{item.sites_info}</div>
                                <div className="price">{item.price} 元/平</div>
                                <div className="tags">
                                    {
                                        item.tags.split(',').map((subitem,i)=>(
                                            <span key={i}>{ subitem } </span>
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
                <City />
                <Menu />
                <Newhouse />
                <Quiz />
                <Renthouse />
            </div>
        );
    }
}

export default Home;