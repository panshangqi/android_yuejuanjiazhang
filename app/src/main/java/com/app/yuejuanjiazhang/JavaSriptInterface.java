package com.app.yuejuanjiazhang;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class JavaSriptInterface {
    Context context;
    public JavaSriptInterface(Context c) {
        context= c;
    }

    /**
     * 与js交互时用到的方法，在js里直接调用的
     */
    @JavascriptInterface
    public void showToast(String ssss) {

        Toast.makeText(context, ssss, Toast.LENGTH_LONG).show();
    }
/*
    @JavascriptInterface
    public void setCookies(String cookies){
        MyCookies.setCookies(context, "http://localhost_cookies" , cookies);
    }

    @JavascriptInterface
    public String getCookies(){
        return MyCookies.getCookie(context, "http://localhost_cookies");
    }

    @JavascriptInterface
    public void clearCookies(String cookies){
        MyCookies.removeCookie(context);
    }

    @JavascriptInterface
    public String getENV(){
        return Public.ENV;
    }

    @JavascriptInterface
    public void flushWebview(){

    }
    */
}
