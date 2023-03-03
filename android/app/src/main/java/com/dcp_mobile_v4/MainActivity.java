package com.dcp_mobile_v4;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here
// import com.dcp_mobile_v4.OkHttpCertPin;
import com.facebook.react.modules.network.OkHttpClientProvider;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this,true);  // here
    super.onCreate(savedInstanceState);
  //  OkHttpClientProvider.setOkHttpClientFactory(new OkHttpCertPin());
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "dcp_mobile_v4";
  }
}
