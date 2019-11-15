
import React, { Component } from 'react';
import {Button, Input } from 'antd'
import './style.less';
import qishi from '@components/qishi'
import login_bg from '@imgs/login_bg.jpg'
import TitleBar from '@components/TitleBar'
import PageFooter from '@components/PageFooter'
function getNameFirst(name){
    if(typeof name != 'string')
        return "NO"
    if(name.length == 0)
        return "NOO"
    return name.substring(0, 1)
}
class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject_list: []
        };

    }
    componentDidMount(){
        qishi.http.get_ajax(qishi.util.mark_http_url('/ctb/ctb/app/student/getallsubjectlist'),{}, (data) => {
            console.log(data)
            if(data.codeid == qishi.config.responseOK){

                this.setState({
                    subject_list: data.data  //[0: {errorquestioncount: 10, subjectcode: "B964E4FACF962CBD493D1D89DC4044CB", subjectname: "数学"}]
                })
            }
        })
    }
    subjectClick(item){
        console.log(item)
        this.props.history.push({
            pathname: "/error_book_list",
            state: {
                subjectcode: item.subjectcode
            }
        })
    }
    subjectListRender(){
        let arr = []
        let key = 0
        for(let sub of this.state.subject_list){
            arr.push(
                <div className="item" key={'subject'+key} onClick={this.subjectClick.bind(this, sub)}>
                    <div className="icon">
                        <div className="name">{getNameFirst(sub.subjectname)}</div>
                    </div>
                    <div className="info">
                        <div className="name">{sub.subjectname}</div>
                        <div className="tip">{sub.errorquestioncount}道错题</div>
                    </div>
                </div>
            )
            key++
        }
        return arr
    }

    componentWillUnmount(){

        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        return (
            <div className="book_html">
                <TitleBar
                    title="错题本"
                    back_ico={false}
                />
                <div className="content">
                    <div className="subject_list">
                        {this.subjectListRender()}
                    </div>
                </div>
                <PageFooter route="/book" history={this.props.history}/>
            </div>
        );
    }
}

export default Book;
