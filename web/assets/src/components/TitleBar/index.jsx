
import React, { Component } from 'react';
import qishi from '@components/qishi.jsx';
import toback from '@imgs/toback.png'
import './style.less'

class TitleBar extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.title = props.title ? props.title : '--/--'
        this.to_route = props.to_route ? props.to_route: null
        this.back_ico = (props.back_ico == true || props.back_ico == null) ? true: false;
        this.to_query = props.to_query
        this.style = {}
        if(props.backgroundColor){
            this.style.backgroundColor = props.backgroundColor;
        }
        console.log(this.back_ico)
    }
    componentWillUnmount(){

        this.setState = (state,callback)=>{
            return;
        };
    }
    backClick(){
        console.log('back to url: ' + this.back_route)
        if(this.to_route && this.props.history){
            this.props.history.push({
                pathname: this.to_route,
                query: this.to_query
            })
        }
    }
    render() {
        return (
            <div className="titlebar_html" style={this.style}>
                <img className="titlebar_title_back_img"
                     src={toback}
                     onClick={this.backClick.bind(this)}
                     style={{display: this.back_ico ? 'block': 'none'}}
                />
                <div className="titlebar_title">{this.title}</div>
            </div>
        );
    }
}

export default TitleBar;
