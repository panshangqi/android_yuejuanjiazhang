
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import TitleBar from '@components/TitleBar'
import servicelogo from '@imgs/service_logo.jpg'
import './style.less'

class ServicePhone extends Component {
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
            <div className="service_phone_html">
                <TitleBar
                    title="客服电话"
                    backgroundColor={qishi.config.theme_color}
                    history={this.props.history}
                    to_route="/personal"
                />
                <div className="bg_box">
                    <img src={servicelogo} style={{width: '40%'}}/>
                </div>
                <div className="telephone">
                    0373-80088208200
                </div>
            </div>
        );
    }
}

export default ServicePhone;
