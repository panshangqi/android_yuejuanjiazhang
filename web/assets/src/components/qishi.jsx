import React from 'react';
import 'whatwg-fetch';
import $ from 'jquery';


const Qishi = {};
Qishi.config = {
    host: '49.4.48.115',
    responseOK: '0001'
}
Qishi.util = {
    wsdl_url: function(){
        return `http://${Qishi.config.host}/exam/AppdatacenterImpPort?wsdl`
    },
    make_url:function (host) {

    }
}
Qishi.soap = {
    /*
    params = {
        username: '111'
        password: '222'
    }

     */
    get:function (url, params, fn) {
        var xmlhttp = new XMLHttpRequest();
        var route = url //such as ParentLogin
        //replace second argument with the path to your Secret Server webservices
        xmlhttp.open('POST', 'http://49.4.48.115/exam/AppdatacenterImpPort?wsdl', true);

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
        for(var key in params){
            strRequest += `<arg${count}>${params[key]}</arg${count}>`
            count ++;
        }
        strRequest += '</AppdatacenterImpService:'+route+'>' +
            '</soap:Body>' +
            '</soap:Envelope>';
        console.log(strRequest)
        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');

        //FOR TESTING: display results in an alert box once the response is received
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                var result = xmlhttp.responseText
                if(typeof fn == 'function'){
                    var xml = $.parseXML(result)
                    var data = xml.firstChild.firstChild.firstChild.firstChild.firstChild
                    data = data.textContent
                    console.log(typeof data)
                    console.log(data)
                    var jsonData = $.parseJSON(data);

                    fn(jsonData[0]);
                }
            }
        };

        //send the SOAP request
        xmlhttp.send(strRequest);
    }
};


export default Qishi;
