
import React, { Component } from 'react';
import './style.less';
import ico_home from "@imgs/home.png"
import ico_home_active from "@imgs/home_active.png"
import ico_book from "@imgs/book.png"
import ico_book_active from "@imgs/book_active.png"
import ico_personal from "@imgs/personal.png"
import ico_personal_active from "@imgs/personal_active.png"
class PageFooter extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.route = props.route

    }
    homeClick(){
        if(this.route != '/home')
        this.props.history.push('/home')
    }
    personalClick(){
        if(this.route != '/personal')
        this.props.history.push('/personal')
    }
    render() {
        return (
            <div className="page_footer">
                <table className="foot_table">
                    <thead>
                    <tr>
                        <td>
                            <div onClick={this.homeClick.bind(this)}>
                                <div><img src={this.route == '/home' ? ico_home_active : ico_home} className="icon"/></div>
                                <div className={this.route == '/home' ? 'text_active': ''}>首 页</div>
                            </div>

                        </td>
                        <td>
                            <div>
                                <div><img src={this.route == '/book' ? ico_book_active :ico_book } className="icon"/></div>
                                <div className={this.route == '/book' ? 'text_active': ''}>错题本</div>
                            </div>
                        </td>
                        <td>
                            <div onClick={this.personalClick.bind(this)}>
                                <div><img src={this.route == '/personal' ? ico_personal_active : ico_personal} className="icon3"/></div>
                                <div className={this.route == '/personal' ? 'text_active': ''}>我 的</div>
                            </div>
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default PageFooter;