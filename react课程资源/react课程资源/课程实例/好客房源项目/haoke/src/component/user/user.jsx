import React, { Component } from 'react';
import person from '../../static/images/person.jpg';
import './user.css';

class User extends Component {
    render() {
        return (
            <div>
                 <div className="user_header">
                    <img src={person} alt="person" className="user_pic" />
                    <h3>Hi 张大山</h3>
                    <p>关注：2&nbsp;&nbsp;&nbsp;提问：10&nbsp;&nbsp;&nbsp;积分：66</p>
                </div>
                <ul className="set_list">
                    <li>
                        <span></span>
                        <a href="#">评论设置</a>
                    </li>
                    <li>
                        <span></span>
                        <a href="#">收藏设置</a>
                    </li>
                    <li>
                        <span></span>
                        <a href="#">消息推送设置</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default User;