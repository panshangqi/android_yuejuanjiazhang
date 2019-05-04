
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import TitleBar from '@components/TitleBar'
import './style.less'

class GeneralQuestion extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount(){

        this.setState = (state,callback)=>{
            return;
        };
    }
    render() {
        return (
            <div className="general_ques_html">
                <TitleBar
                    title="常见问题"
                    backgroundColor={qishi.config.theme_color}
                    history={this.props.history}
                    to_route="/personal"
                />
            </div>
        );
    }
}

export default GeneralQuestion;
