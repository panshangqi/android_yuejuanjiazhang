
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import './style.less';

class Header extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="page_base_html">
                <div className="environment" style={{display: qishi.config.ENV == 'development' ? 'block': 'none'}}>
                    {qishi.config.ENV}
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Header;
