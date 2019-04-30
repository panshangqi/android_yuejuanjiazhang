
import React, { Component } from 'react';
import {Button, Input, Checkbox, Icon, Alert, Spin, Menu, Dropdown } from 'antd'
import './style.less';
import qishi from '@components/qishi'
import login_bg from '@imgs/login_bg.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "16031620018",
            password: "0",
            ip: "49.4.48.115"
        };
    }
    componentDidMount(){


    }

    componentWillUnmount(){
        document.removeEventListener("keydown",this.handleEnterKey);
        this.setState = (state,callback)=>{
            return;
        };
    }
    onChangeUsername(event){
        this.setState({
            username: event.target.value
        })
    }
    onChangePassword(event){
        this.setState({
            password: event.target.value
        })
    }
    onChangeIpPort(event){
        this.setState({
            ip: event.target.value
        })
    }
    loginButtonClick(){
        console.log(this.state.username, this.state.password, this.state.ip)
        qishi.soap.get('ParentLogin',{
            username: this.state.username,
            password: this.state.password,
            ip: this.state.ip
        },function(data){

            console.log(data)
            if(data.codeid == qishi.config.responseOK){
                console.log('登陆成功')
            }else{
                console.log(data.message)
            }
        })
    }
    render() {
        return (
            <div className="login_html">
                <img className="backgroundimage" src={login_bg}></img>
                <div className="content">
                    <div className="title">登 录</div>
                    <Input className="input_style" placeholder="输入手机号" onChange={this.onChangeUsername.bind(this)} value={this.state.username}/>
                    <Input className="input_style" placeholder="输入密码" onChange={this.onChangePassword.bind(this)} value={this.state.password} type="password"/>
                    <Input className="input_style" placeholder="输入学校IP地址和端口" onChange={this.onChangeIpPort.bind(this)} value={this.state.ip}/>
                    <Button
                        className="button_style"
                        onClick={this.loginButtonClick.bind(this)}
                        style={{width: '100%',color:'#FC766A'}}
                    >登 录</Button>
                    <div className="forget_passwd"><span>忘记密码？</span></div>
                </div>
            </div>
        );
    }
}

export default Login;
