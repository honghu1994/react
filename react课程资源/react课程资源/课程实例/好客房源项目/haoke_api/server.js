const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const moment = require('moment');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// 设置模板引擎为ejs
app.set('view engine','ejs');

// 设置模板引擎文件夹
app.set('views',__dirname+'/static/template');


// 设置静态资源文件夹
app.use(express.static('static'));


// 设置跨域
app.use(cors());


app.get('/',(req,res)=>{
    res.render('api');
})


// 轮播图数据接口
app.get('/slide',(req,res)=>{
    fs.readFile('./data/slide.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 城市数据接口
app.get('/citys',(req,res)=>{
    fs.readFile('./data/citys.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 首页新房推荐数据接口
app.get('/newhouse',(req,res)=>{
    let sNowCity = req.query.city;
    fs.readFile('./data/newhouse.json', (err, data) => {
        if (err) throw err;
        let oCity = JSON.parse(data.toString());
        let aDataList = oCity.data;
        let aFindList = aDataList.filter(item=>(
            item.city == sNowCity
        ));
        let resObj = {
            "data":aFindList,
            "code":oCity.code,
            "msg":oCity.msg
        };        
        res.append('content-type', 'application/json');
        let sTr = JSON.stringify(resObj);
        res.send(sTr);
    });
})

// 首页租房推荐数据接口
app.get('/renthouse',(req,res)=>{
    let sNowCity = req.query.city;
    fs.readFile('./data/renthouse.json', (err, data) => {
        if (err) throw err;
        let oCity = JSON.parse(data.toString());
        let aDataList = oCity.data;
        let aFindList = aDataList.filter(item=>(
            item.city == sNowCity
        ));
        let resObj = {
            "data":aFindList,
            "code":oCity.code,
            "msg":oCity.msg
        };
        let sTr = JSON.stringify(resObj); 
        res.append('content-type', 'application/json');       
        res.send(sTr);
        
    });
})


// 首页问答数据接口
app.get('/quiz',(req,res)=>{
    fs.readFile('./data/quiz.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})


// 新房数据列表接口
app.get('/newhouse_list',(req,res)=>{
    let sNowcity = req.query.city;
    let sDataUrl = '';
    if(sNowcity=='北京'){
        sDataUrl = './data/bj_new_house_list.json'
    }else{
        sDataUrl = './data/sz_new_house_list.json' 
    }
    fs.readFile(sDataUrl, (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 租房数据列表接口
app.get('/renthouse_list',(req,res)=>{
    let sNowcity = req.query.city;
    let sDataUrl = '';
    if(sNowcity=='北京'){
        sDataUrl = './data/bj_rent_house_list.json'
    }else{
        sDataUrl = './data/sz_rent_house_list.json' 
    }
    fs.readFile(sDataUrl, (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 房屋详细信息接口
app.get('/detail',(req,res)=>{
    fs.readFile('./data/house_detail.json', (err, data) => {
        if (err) throw err;
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 用户登录接口
app.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    if(username=='tom'&&password=='123456'){
        let content ={name:username}; 
        let secretOrPrivateKey="jwt";
        let token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60*60*3  // 3小时过期
        });
        res.append('content-type', 'application/json');
        res.send('{"code":200,"msg":"登录成功","token":"'+ token +'"}');
    }else{
        res.append('content-type', 'application/json');
        res.send('{"code":401,"msg":"用户名或密码有误！"}');
    }        
})

// 问答列表数据接口
app.get('/quiz_list',(req,res)=>{
    let page = req.query.page;
    if(page){
        if(page>5){
            page=5
        }else if(page<=1){
            page=2
        }
        fs.readFile('./data/pages/quiz_list'+ page +'.json', (err, data) => {
            if (err) throw err;
            //console.log(data.toString());
            res.append('content-type', 'application/json');
            res.send(data.toString());
        });  
    }else{
        fs.readFile('./data/quiz_list.json', (err, data) => {
            if (err) throw err;
            //console.log(data.toString());
            res.append('content-type', 'application/json');
            res.send(data.toString());
        });  
    }    
})


// 问答详情数据接口
app.get('/question',(req,res)=>{
    fs.readFile('./data/question.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 回答列表数据接口
app.get('/answer',(req,res)=>{
    fs.readFile('./data/answer_list.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 用户问答回复接口
app.post('/reply',(req,res)=>{
    // console.log(req.headers);
    let jwt = req.headers.authorization;
    if(jwt){
        let sReply = req.body.sReply;
        let sNow = moment().format('YYYY-MM-DD hh:mm:ss');
        fs.readFile('./data/answer_list.json', (err, data) => {
            if (err) throw err;
            let oNowData = JSON.parse(data.toString());
            let iLen = oNowData.data.length;
            let oNewReply = {
                "answer_id":iLen+1,
                "url": "http://127.0.0.1:7890/img/person06.png",
                "answer_author":"Tom" ,
                "time":sNow,
                "content":sReply
            }
            oNowData.data.push(oNewReply);
            let sTr = JSON.stringify(oNowData);
            fs.writeFileSync('./data/answer_list.json',sTr);

            res.append('content-type', 'application/json');
            res.send('{"code":200,"msg":"回复成功！"}');
        });   

    }else{
        res.append('content-type', 'application/json');
        res.send('{"code":401,"msg":"回复失败，请登录！"}')
    }        
})

// 图表数据接口
app.get('/chart',(req,res)=>{
    fs.readFile('./data/chart.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})


// ejs模板引擎使用示例
app.get('/ejs',function(req,res){
    let sTr=req.query;
    // 解除xss攻击保护
    res.set('X-XSS-Protection',0);
    res.render('index',{
         sTr:sTr.aa
     })
})

app.listen('7890',()=>{
    console.log('API server start at port 7890');
})