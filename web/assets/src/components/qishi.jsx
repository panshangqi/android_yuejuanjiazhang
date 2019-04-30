import React from 'react';
import 'whatwg-fetch';
import $ from 'jquery';


const Qishi = {};
Qishi.config = {
    host: '49.4.48.115'
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
    get:function (params, fn) {
        var xmlhttp = new XMLHttpRequest();

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
            '<AppdatacenterImpService:UserLogin>' +
            '<arg0>1001</arg0>' +
            '<arg1>888888</arg1>' +
            '</AppdatacenterImpService:UserLogin>' +
            '</soap:Body>' +
            '</soap:Envelope>';

        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');

        //FOR TESTING: display results in an alert box once the response is received
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if(typeof fn == 'function'){
                    fn(xmlhttp.responseText);
                }
            }
        };

        //send the SOAP request
        xmlhttp.send(strRequest);
    }
};


export default Qishi;
