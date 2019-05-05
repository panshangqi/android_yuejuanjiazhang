package com.app.yuejuanjiazhang;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.Toast;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    WebSettings webSettings;
    WebViewClient webViewClient;
    LinearLayout statusBar;
    Button f5Btn;
    boolean isLoadUrl  = false;
    private long time =0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        statusBar = (LinearLayout) findViewById(R.id.status_bar);
        if (Build.VERSION.SDK_INT >= 21) {
            statusBar.setVisibility(View.GONE);
            Window window = getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            //设置修改状态栏
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            //设置状态栏的颜色，和你的app主题或者标题栏颜色设置一致就ok了
            window.setStatusBarColor(getResources().getColor(R.color.theme_color));

        }else{
            statusBar.setVisibility(View.VISIBLE);
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

            int statusBarHeight = getStatusBarHeight(window.getContext());

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, statusBarHeight);
            statusBar.setLayoutParams(params);
            statusBar.setBackgroundColor(getResources().getColor(R.color.theme_color));

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
            webView.loadUrl("http://192.168.2.56:10032/templates/index.html#/menu_nav");
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
//            if (webView.canGoBack()) {
//                //webView.goBack();
//                //finish();
//
//            } else {
//                Log.v("YJ","KEYCODE_BACK finish");
//                finish();
//                return true;
//            }
            if ((System.currentTimeMillis() - time > 1000)) {
                Toast.makeText(this, "再按一次返回桌面", Toast.LENGTH_SHORT).show();
                time = System.currentTimeMillis();
            }else{
                Intent intent = new Intent();
                intent.setAction("android.intent.action.MAIN");
                intent.addCategory("android.intent.category.HOME");
                startActivity(intent);
            }

            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
    private static int getStatusBarHeight(Context context) {
        int statusBarHeight = 0;
        Resources res = context.getResources();
        int resourceId = res.getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            statusBarHeight = res.getDimensionPixelSize(resourceId);
        }
        return statusBarHeight;
    }

}