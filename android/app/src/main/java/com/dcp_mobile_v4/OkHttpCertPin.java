package com.dcp_mobile_v4;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import java.util.concurrent.TimeUnit;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;
public class OkHttpCertPin implements OkHttpClientFactory {
private static String hostname = "*.adlsandbox.com";
@Override
public OkHttpClient createNewNetworkModuleClient() {
CertificatePinner certificatePinner = new CertificatePinner.Builder()
.add(hostname, "sha256/GR14DBuqqPUsBx6/T+aAy0eBowtpGwHc7utgmBFzFsQ=")
.build();
OkHttpClient.Builder client = new OkHttpClient.Builder()
.connectTimeout(0, TimeUnit.MILLISECONDS)
.readTimeout(0, TimeUnit.MILLISECONDS)
.writeTimeout(0, TimeUnit.MILLISECONDS)
.cookieJar(new ReactCookieJarContainer())
.certificatePinner(certificatePinner);
return OkHttpClientProvider.enableTls12OnPreLollipop(client).build();
}
}
