import fnH1 from './mod01.js';
import './main.css';
import './sub.less';
import pic from './person05.png';

window.onload = function(){
    document.body.style.backgroundColor = 'pink';
    fnH1();


    let oP = document.createElement('p');
    oP.innerHTML = '创建的p标签';
    
    document.body.append(oP);

    let oImg = new Image();
    oImg.src = pic;
    document.body.append(oImg);


}



