
import React, { Component } from 'react';

import qishi from '@components/qishi.jsx';
import $ from 'jquery'
import './style.less'

class MenuNav extends Component {
    constructor(props) {
        super(props);
        var navlist = props.DataList ? props.DataList : []
        var selectid = props.SelectID ? props.SelectID: null
        this.state = {
            select_id: selectid,
            nav_list: navlist
        }
        this.ItemClick = props.ItemClick
        /*
        nav_list = [{
            name: name,
            id: id
        }]
         */

    }
    componentDidMount(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isAndroid){		/*注释5*/
            // $('.nav_box').on('touchstart',function(){
            //     $(document).on('touchmove',function(e){
            //         e.preventDefault();
            //     });
            //     $(document).on('touchend',function(){
            //         $(document).unbind();
            //     });
            // });
        }
        var self = this
        $('#nav_box').on('click','li',function () {
            var id = $(this).attr('id')
            var name = $(this).attr('name')

            // self.setState({
            //     select_id: id
            // })
            if(typeof self.ItemClick === 'function'){
                self.ItemClick({
                    id, name
                })
            }
        })
    }
    componentWillReceiveProps(props){
        console.log("componentWillReceiveProps",this.state.nav_list, props.DataList)
        this.setState({
            select_id: props.SelectID ? props.SelectID: null
        })
        var update = false
        if(this.state.nav_list.length != props.DataList.length){
            update = true;
        }else{
            for(var i=0;i<props.DataList.length;i++){
                if(props.DataList[i].id != this.state.nav_list[i].id){
                    update = true;
                    break;
                }
            }
        }
        if(update){
            this.setState({
                nav_list: props.DataList
            })
        }

    }
    componentWillUnmount(){

        this.setState = (state,callback)=>{
            return;
        };
    }
    renderItemLi(){
        console.log('>>>>>>>>>>>>>')
        console.log( this.state.nav_list)
        var arr = []
        var keyid = 0;
        for(var item of this.state.nav_list){
            arr.push(
                <li
                    id={item.id}
                    name={item.name}
                    key={'navli_'+keyid}
                    style={{
                        color: this.state.select_id == item.id ? qishi.config.theme_color: '#444',
                        fontSize: this.state.select_id == item.id ? '1.0rem': '0.9rem'
                    }}
                >
                    {item.name}
                </li>
            )
            keyid++
        }
        return arr;
    }
    render() {
        return (
            <div className="menu_nav_html">
                    <ul className="nav_box" id="nav_box">
                        {
                            this.renderItemLi()
                        }
                    </ul>

            </div>
        );
    }
}

export default MenuNav;
