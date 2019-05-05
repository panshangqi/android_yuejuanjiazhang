import React from 'react';
import $ from 'jquery';
import { message } from 'antd'
console.log("environment: " + process.env.NODE_ENV)
const Qishi = {};
Qishi.config = {
    ENV: process.env.NODE_ENV,
    cookiestr: "userid=16031620018;ip=49.4.48.115;token=4419604AF61EFE64FFFA9D91620102F7", //网页测试123015001
    responseOK: '0001',
    theme_color: '#FF9647',
    theme_red: '#FF796B'
}
if(window.localStorage){
    Qishi.config.supportStorage = true
    console.log('This browser supports localStorage');
}else{
    Qishi.config.supportStorage = false
    console.log('This browser does NOT support localStorage');
}
console.log(Qishi.config)
Qishi.cookies = {

    get_cookies:function (key) {
        var obj = null
        if(Qishi.config.supportStorage){
            obj = localStorage.getItem(key)
        }
        return obj;
    },
    get_token: function () {
        return Qishi.cookies.get_cookies("yuejuan_token")
    },
    get_userid: function () {
        return Qishi.cookies.get_cookies("yuejuan_userid")
    },
    set_cookies:function (obj) {
        for(var key in obj){
            if(Qishi.config.supportStorage){
                localStorage.setItem(key, obj[key]);
            }
        }
    }
}
Qishi.util = {

    alert:function(msg){
        message.config({
            top: $(window).height() - 100
        })
        message.warning(msg);
    },
    wsdl_url: function(){
        var ip = Qishi.cookies.get_cookies('yuejuan_ip');
        console.log(ip)
        if(Qishi.config.ENV == "development"){
            return "/exam/AppdatacenterImpPort?wsdl";
        }

        if(ip){
            return `http://${ip}/exam/AppdatacenterImpPort?wsdl`
        }else{
            Qishi.util.alert("访问错误")
            return "";
        }
    },
    make_image_url(image_name){
        var ip = Qishi.cookies.get_cookies('yuejuan_ip');
        if(Qishi.config.ENV == "development"){
            return "/exam/appshowimage?path="+image_name;
        }

        if(ip){
            return `http://${ip}/exam/appshowimage?path=${image_name}`
        }else{
            Qishi.util.alert("访问错误")
            return "";
        }
    }
}

Qishi.http = {
    /*
    params = {
        username: '111'
        password: '222'
    }
http://49.4.48.115
     */
    get:function (url, params, fn, errfn) {
        var xmlhttp = new XMLHttpRequest();
        var route = url //such as ParentLogin
        //replace second argument with the path to your Secret Server webservices
        try{
            xmlhttp.open('POST', Qishi.util.wsdl_url(), true);

            //create the SOAP request
            //replace username, password (and org + domain, if necessary) with the appropriate info
            var strRequest =
                '<?xml version="1.0"?>' +
                '<soap:Envelope '+
                'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
                'xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ' +
                'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
                'xmlns:AppdatacenterImpService="http://webservice.app.com/" '+
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xsl:version="1.0">' +
                '<soap:Body>' +
                '<AppdatacenterImpService:' + route +'>';
            var count = 0;
            for(var param of params){
                strRequest += `<arg${count}>${param}</arg${count}>`
                count ++;
            }
            strRequest += '</AppdatacenterImpService:'+route+'>' +
                '</soap:Body>' +
                '</soap:Envelope>';
            //console.log(strRequest)
            //specify request headers
            xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
            xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');

            //FOR TESTING: display results in an alert box once the response is received
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    var result = xmlhttp.responseText
                    if(typeof fn === 'function'){
                        var xml = $.parseXML(result)
                        var data = xml.firstChild.firstChild.firstChild.firstChild.firstChild
                        data = data.textContent
                        console.log(typeof data)
                        //console.log(data)
                        var jsonData = $.parseJSON(data);

                        fn(jsonData[0]);
                    }
                }else{
                    if(typeof errfn === 'function'){
                        console.log(xmlhttp.responseText)
                    }
                }
            };

            //send the SOAP request
            xmlhttp.send(strRequest);
        }catch (err){
            Qishi.util.alert("访问错误")
            console.log(err)
        }

    }
};


export default Qishi;
