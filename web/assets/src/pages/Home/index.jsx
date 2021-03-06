
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import TitleBar from '@components/TitleBar'
import PageFooter from '@components/PageFooter'
import left_img from '@imgs/home_cut_001.png'
import right_img from '@imgs/home_cut_002.png'
import './style.less'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class_rank: 0,
            grand_rank: 0,
            exam_date: '--/--',
            exam_name: '--/--',
            stu_score: 0,
            total_score: 0,
            exam_list: [],
            exam_id: null
        }
    }
    componentDidMount(){
        var token = qishi.cookies.get_token();
        var userid = qishi.cookies.get_userid();
        console.log(token, userid)
        var self = this;
        qishi.http.get('GetTestscorelist',[userid, token],function (data) {
            console.log('GetTestscorelist')
            console.log(data)
            if(data.codeid == qishi.config.responseOK){

                if(data.message && data.message.length > 0){
                    var exam_info = data.message[0]
                    self.setState({
                        stu_score: exam_info.studentscore,
                        total_score: exam_info.fullscore,
                        exam_name: exam_info.examname,
                        exam_date: exam_info.examdate,
                        exam_id: exam_info.examprojectid
                    })
                    console.log(exam_info.studentscore, exam_info.fullscore)
                }else{
                    console.log('data.message.length == 0')
                }

                self.setState({
                    exam_list: data.message
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
    resultReportClick(){
        this.props.history.push({
            pathname:"/result_report",
            query: { exam_id : this.state.exam_id }
        })
    }
    examAnalysisClick(){
        this.props.history.push({
            pathname:"/exam_analysis",
            query: { exam_id : this.state.exam_id }
        })
    }
    render() {
        return (
            <div className="home_html">
                <TitleBar
                    title="首 页"
                    back_ico={false}
                />
                <div className="content">
                    <div className="review_panel">
                        <div className="main_title"><span>{this.state.stu_score}</span>/{this.state.total_score}</div>
                        <div className="sub_title">{this.state.exam_name} {this.state.exam_date}</div>
                        <div className="button_box">
                            <div><button onClick={this.resultReportClick.bind(this)}>成绩报告</button></div>
                            <div><button onClick={this.examAnalysisClick.bind(this)}>试题分析</button></div>
                        </div>
                    </div>
                    <div className="cut_line001">
                        <img className="left" src={left_img}/>
                        <span className="mid">历次考试</span>
                        <img className="right" src={right_img}/>
                    </div>
                </div>
                <PageFooter route="/home" history={this.props.history}/>
            </div>
        );
    }
}

export default Home;
