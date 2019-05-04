
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import TitleBar from '@components/TitleBar'
import PageFooter from '@components/PageFooter'
import history_exam from '@imgs/history_exam.png'
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
                    backgroundColor={qishi.config.theme_color}
                    history={this.props.history}
                    to_route="/personal"
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
                    <div>
                        <img className="history_image" src={history_exam}/>
                    </div>
                </div>
                <PageFooter route="/home" history={this.props.history}/>
            </div>
        );
    }
}

export default Home;
