package com.app.yuejuanjiazhang;

import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    WebSettings webSettings;
    WebViewClient webViewClient;
    Button f5Btn;
    boolean isLoadUrl  = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            //设置修改状态栏
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            //设置状态栏的颜色，和你的app主题或者标题栏颜色设置一致就ok了
            window.setStatusBarColor(getResources().getColor(R.color.theme_color));
        }

        webView = (WebView) findViewById(R.id.webView);
        f5Btn = (Button)findViewById(R.id.f5_btn);
        //webView.loadUrl("http://baidu.com");

        webSettings = webView.getSettings();
        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);

        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAppCacheMaxSize(1024 * 1024 * 8);// 实现8倍缓存
        webSettings.setAllowFileAccess(true);
        webSettings.setAppCacheEnabled(true);
        String appCachePath = getApplication().getCacheDir().getAbsolutePath();
        Log.v("YJX appCachePath",appCachePath);
        webSettings.setAppCachePath(appCachePath);
        webSettings.setDatabaseEnabled(true);

        Log.v("YJX",String.valueOf(Build.VERSION.SDK_INT));
        if (Build.VERSION.SDK_INT >= 19){
            WebView.setWebContentsDebuggingEnabled(true);
        }
        Log.v("YJ JELLY_BEAN", String.valueOf(Build.VERSION_CODES.JELLY_BEAN));

        if (Build.VERSION.SDK_INT >= 16) {
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            //是否允许file:// 协议下的js跨域加载http或者https的地址。
        }else{
            try{
                Class<?> clazz = webSettings.getClass();
                Method method = clazz.getMethod("setAllowUniversalAccessFromFileURLs", boolean.class);
                if (method != null) {
                    method.invoke(webSettings, true);
                }
            }catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        if(Build.VERSION.SDK_INT >= 17){
            webView.addJavascriptInterface(new JavaSriptInterface(this), "android");
        }
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if(!isLoadUrl){
                    isLoadUrl = true;
                    view.loadUrl(url);
                    Log.v("YJ first",url);
                }
                Log.v("YJ",url);
                super.onPageStarted(view, url, favicon);
            }
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                Log.v("YJ","proceed Ssl");
                handler.proceed(); // 接受所有证书
            }

        });
        if(Public.ENV.equals("development")){
            webView.loadUrl("http://10.200.6.66:10032/templates/index.html#/menu_nav");
            //webView.loadUrl("http://www.baidu.com");
        }else{
            f5Btn.setVisibility(View.GONE);
            webView.loadUrl("file:///android_asset/build/templates/index.html");
        }


    }
    public void onClick (View view){
        webView.reload();
        Toast.makeText(MainActivity.this,"正在刷新F5.",Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
            if (webView.canGoBack()) {
                webView.goBack();
                return true;
            } else {
                Log.v("YJ","KEYCODE_BACK finish");
                finish();
                return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

}