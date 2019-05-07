
import React, { Component } from 'react';
import {Button, Input } from 'antd'
import './style.less';
import qishi from '@components/qishi'
import login_bg from '@imgs/login_bg.jpg'

class Login extends Component {
    constructor(props) {
        super(props);
        var userid = qishi.cookies.get_cookies('yuejuan_userid')
        var ip = qishi.cookies.get_cookies('yuejuan_ip')
        console.log('init')
        qishi.util.log('userid='+userid+',ip='+ip)
        console.log(userid, ip)
        this.state = {
            username: userid ? userid : "",
            password: "0",
            ip: ip ? ip: "49.4.48.115"
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
        qishi.cookies.set_cookies({
            yuejuan_ip: this.state.ip
        })
        console.log(">>>>>>>>>>>>>>>>Login>>>>>>>>>>>>>>")
        var self = this
        qishi.http.get('ParentLogin',[this.state.username, this.state.password, this.state.ip] ,function(data){

            console.log(data)
            if(data.codeid == qishi.config.responseOK){
                console.log('登陆成功')
                qishi.cookies.set_cookies({
                    yuejuan_userid: self.state.username,
                    yuejuan_ip: self.state.ip,
                    yuejuan_token: data.authtoken
                })
                self.props.history.push('/home')
            }else{
                console.log(data.message)
                qishi.util.alert(data.message)
            }
        })
    }
    render() {
        return (
            <div className="login_html">

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
        );
    }
}

export default Login;
