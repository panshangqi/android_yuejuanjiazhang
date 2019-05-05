
import React, { Component } from 'react';
import PageFooter from '@components/PageFooter'
import qishi from '@components/qishi.jsx';

import './style.less';
import headbg from '@imgs/personal_header_bg.png'
import arrow_right from "@imgs/arrow_right.png"
import modify_password from "@imgs/modify_password.png"
import general_question from "@imgs/general_question.png"
import service_phone from "@imgs/service_phone.png"
class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stu_name: '-/-',
            school_name: '-/-'
        }
        console.log(qishi.config.window_width)
    }
    componentDidMount(){
        var token = qishi.cookies.get_token();
        var userid = qishi.cookies.get_userid();
        console.log(token, userid)
        var self = this;
        qishi.http.get('Getstudentinfo',[userid, token],function (data) {
            console.log('Getstudentinfo')
            console.log(data)
            if(data.codeid == qishi.config.responseOK){
                self.setState({
                    stu_name: data.message[0].username,
                    school_name: data.message[0].stuschool
                })
            }else{
                qishi.util.alert(data.message)
            }
        })
    }
    componentWillUnmount(){

        this.setState = (state,callback)=>{
            return;
        };
    }
    exitLoginClick(){
        this.props.history.push('/login')
    }
    modifyPwdClick(){
        this.props.history.push('/modify_password')
    }
    generalQuesClick(){
        this.props.history.push('/general_question')
    }
    servicePhoneClick(){
        this.props.history.push('/service_phone')
    }
    render() {
        return (
            <div className="personal_center_html">
                <div className="background_image">
                    <img className="headbg_img" src={headbg}/>
                    <div className="headbg"></div>
                </div>

                <div className="content">
                    <div className="title">我 的</div>
                    <div className="user_info_panel"
                         style={{
                             width:this.panelWidth,
                             height: this.panelHeight,
                             marginTop: this.panelMarginTop
                         }}
                    >
                        <div className="panel_left">
                            <div className={'user_name'}>{this.state.stu_name}的家长</div>
                            <div className={'stu_name'}>学校：{this.state.school_name}</div>
                        </div>
                        <div className="panel_right">
                            <div className="ele1"></div>
                            <img className="ele2" src={arrow_right}/>
                            <div className="ele3"></div>
                        </div>
                    </div>
                    <div className="function_panel">
                        <table>
                            <tbody>
                            <tr onClick={this.modifyPwdClick.bind(this)}>
                                <td style={{width: '10%'}}><img src={modify_password} style={{width: '1.5rem'}}/></td>
                                <td style={{width: '85%'}}>修改密码</td>
                                <td style={{width: '5%'}}><img src={arrow_right}  style={{width: '0.7rem'}}/></td>
                            </tr>
                            <tr onClick={this.generalQuesClick.bind(this)}>
                                <td><img src={general_question} style={{width: '1.5rem'}}/></td>
                                <td>常见问题</td>
                                <td><img src={arrow_right}  style={{width: '0.7rem'}}/></td>
                            </tr>
                            <tr onClick={this.servicePhoneClick.bind(this)}>
                                <td><img src={service_phone}  style={{width: '1.5rem'}}/></td>
                                <td>客服电话</td>
                                <td><img src={arrow_right}  style={{width: '0.7rem'}}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <button style={{
                            width: '80%',
                            borderRadius: 100,
                            backgroundColor: '#ff8181',
                            color: '#fff',
                            height: 45,
                            marginTop: '2rem',
                            border: '0'
                        }}
                                onClick={this.exitLoginClick.bind(this)}
                        >
                            退出登录
                        </button>
                    </div>

                </div>
                <PageFooter route="/personal" history={this.props.history}/>
            </div>
        );
    }
}

export default PersonalCenter;
