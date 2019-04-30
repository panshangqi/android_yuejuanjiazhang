package com.app.yuejuanjiazhang;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.os.Build;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    String ENV = "development1";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = (WebView) findViewById(R.id.webView);
        //webView.loadUrl("http://baidu.com");

        WebSettings webSettings = webView.getSettings();
        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webView.addJavascriptInterface(new JavaSriptInterface(this), "android");
        //webView.setWebContentsDebuggingEnabled(true);
        Log.v("YJX",String.valueOf(Build.VERSION.SDK_INT));
        if (Build.VERSION.SDK_INT >= 16) {
            try{
                Class<?> clazz = webView.getSettings().getClass();
                Method method = clazz.getMethod("setAllowUniversalAccessFromFileURLs", boolean.class);
                if (method != null) {
                    method.invoke(webView.getSettings(), true);
                }
            }catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        if(ENV.equals("development")){
            webView.loadUrl("http://192.168.2.56:10032/templates/index.html");
        }else{
            webView.loadUrl("file:///android_asset/build/templates/index.html");
        }

        //chrome://inspect/#devices
        webView.setOnKeyListener(new View.OnKeyListener(){
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (event.getAction() == KeyEvent.ACTION_DOWN) {
                    if (keyCode == KeyEvent.KEYCODE_F5) { //表示按返回键 时的操作
                        webView.reload(); //后退
                        //webview.goForward();//前进
                        Toast.makeText(MainActivity.this, "F5", Toast.LENGTH_LONG).show();
                        return true; //已处理
                    }
                }
                return false;
            }
        });
    }


}