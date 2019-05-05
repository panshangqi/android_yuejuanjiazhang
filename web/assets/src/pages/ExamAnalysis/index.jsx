
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import TitleBar from '@components/TitleBar'
import { List } from 'react-virtualized';
import MenuNav from '@components/MenuNav'
import $ from 'jquery'
import './style.less'
var LIST = []
for(var i=0;i<1000;i++)
{
    LIST.push('+'+i)
}
class ExamAnalysis extends Component {
    constructor(props) {
        super(props);
        console.log('ExamAnalysis')
        console.log(props)
        var _subjectid = props.location.query ? props.location.query.subject_id : null
        this.state = {
            subject_list: [],
            question_list: [],
            paper_img_list: [],
            exam_id: props.location.query ? props.location.query.exam_id : '10001',
            select_subject_id: _subjectid,
            tableListHeight: 0,
            tableListWidth: 0,
            imageListHeight:0
        }
        this.navItemClick = this.navItemClick.bind(this)
    }
    componentDidMount(){
        //考试科目列表

        var token = qishi.cookies.get_token();
        var userid = qishi.cookies.get_userid();
        console.log('token = ' +token, userid, this.state.exam_id)
        var self = this
        qishi.http.get('GetOneTestscore',[userid, token, this.state.exam_id],function (data) {
            console.log('GetOneTestscore')
            console.log(data)
            if(data.codeid == qishi.config.responseOK){
                if(data.message.length>0){
                    var exam_info = data.message[0]
                    var templist = exam_info.paperscore
                    // templist = templist.concat(templist)
                    // templist = templist.concat(templist)
                    // templist = templist.concat(templist)
                    for(var item of templist){
                        item.id = item.subjectid
                        item.name = item.subjectname
                    }
                    self.setState({
                        subject_list: templist
                    })
                    if(self.state.select_subject_id){
                        self.getSubjectQuesScore(self.state.select_subject_id)
                    }else{
                        if(templist.length>0){
                            self.setState({
                                select_subject_id: templist[0].subjectid
                            })
                            self.getSubjectQuesScore(templist[0].subjectid)
                        }
                    }

                }

            }else{
                qishi.util.alert(data.message)
            }
        })

        var tableListHeight = $(window).height() - $('#wrap_info').outerHeight() - 2*($('#sub_title').outerHeight());
        console.log('tableListHeight: ' + tableListHeight,$(window).height());
        var imageListHeight = tableListHeight * 0.33;
        tableListHeight = tableListHeight * 0.66;
        this.setState({
            tableListWidth: $(window).width(),
            tableListHeight: tableListHeight,
            imageListHeight: imageListHeight
        })

        $('#question_list').on('click','.que_row',function () {
            var index = $(this).attr('index')
            var item  = self.state.question_list[index]
            console.log(item)
            self.props.history.push({
                pathname: '/question_detail',
                query: item
            })
        })
    }
    componentWillUnmount(){

        this.setState = (state,callback)=>{
            return;
        };
    }
    getSubjectQuesScore(subjectid){
        var token = qishi.cookies.get_token();
        var userid = qishi.cookies.get_userid();
        console.log('token = ' +token, userid, subjectid)
        var self = this
        qishi.http.get('GetOneTestSubjectscore',[userid, token, subjectid],function (data) {
            console.log('GetOneTestSubjectscore')
            console.log(data)
            if(data.codeid == qishi.config.responseOK){
                var questionList = data.message[0].questionscore
                for(var i=0;i<questionList.length;i++){
                    questionList['key_id'] = 'que_' + i;
                }
                self.setState({
                    question_list: questionList,
                    paper_img_list: data.message[0].paperimage.split(',')
                })
            }else{
                qishi.util.alert(data.message)
            }
        })
    }

    renderStudentPaper(){
        var arr = []
        var keyid = 0;
        for(var img of this.state.paper_img_list){
            console.log(qishi.util.make_image_url(img), img);
            arr.push(
                <img
                    src={qishi.util.make_image_url(img)}
                    key={'key_'+keyid}
                />
            )
            keyid++;
        }
        return arr;
    }
    navItemClick(item){
        console.log(item)
        var selectSubjectID = item.id
        console.log(selectSubjectID)
        this.setState({
            select_subject_id: selectSubjectID
        })
        this.getSubjectQuesScore(selectSubjectID)
    }
    render() {
        var self = this
        return (
            <div className="exam_analysis_html">

                <div id="wrap_info" style={{height: 'auto'}}>
                    <TitleBar
                        title="试题分析"
                        backgroundColor={qishi.config.theme_color}
                        history={this.props.history}
                        to_route="/home"
                        id="title_bar"
                    />
                    <MenuNav
                        DataList = {this.state.subject_list}
                        SelectID = {this.state.select_subject_id}
                        ItemClick = {this.navItemClick}
                    />
                </div>

                <div className="content">
                    <div>
                        <div className="sub_title" id="sub_title">考试概况</div>
                        <div className="student_paper_image" style={{height:this.state.imageListHeight}}>
                            {
                                this.renderStudentPaper()
                            }
                        </div>
                        <div className="sub_title">全部试题</div>
                    </div>
                    <div className="question_list" id="question_list" style={{height:this.state.tableListHeight}}>
                    {
                        this.state.question_list.length > 0 ? (
                            <List
                                width={this.state.tableListWidth}
                                height={this.state.tableListHeight}
                                rowHeight={40}
                                rowCount={this.state.question_list.length}
                                rowRenderer={function({key, index, style}) {
                                    var rowData = self.state.question_list[index]
                                    return (
                                        <div className="que_row" style={style} key={key} index={index}>
                                            <div className="que_name">{rowData.questionname}</div>
                                            <div className="que_score">
                                                {rowData.questionstudentscore}分/{rowData.questionfullscore}分
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        ):(
                            <div className="no_data_tip">
                                暂无数据
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default ExamAnalysis;
