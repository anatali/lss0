package it.unibo.rest.clienthttp;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import it.unibo.qactors.QActorContext;
import it.unibo.qactors.QActorUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;

public class RestClientHttp {

private static QActorContext ctx = null;

	public static void setCtx(QActorContext curctx) {
		ctx = curctx;
	}
	public static void sendGet( int port) {
		 try {
	 		CloseableHttpClient httpclient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet("http://localhost:"+port);		
			CloseableHttpResponse response = httpclient.execute(httpGet);
//			System.out.println("RestClientHttp response=" + response);
			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
				   + response.getStatusLine().getStatusCode());
			}
			BufferedReader br = new BufferedReader(
	                         new InputStreamReader((response.getEntity().getContent())));
			String output;
			String info = "";
			while ((output = br.readLine()) != null) {
				info = info + output;
			}
				String msg =  "httpinfo('"+info+"')";
//				System.out.println("raise event" + msg);
				QActorUtils.raiseEvent( ctx, "clienthttp", "httpinfo",msg);
	 	  } catch ( Exception e) {
			e.printStackTrace();
		 }
	}	
	
	public static int sendPut(String data, String url) {
//		System.out.println("sendPut " + url);
	    int responseCode = -1;
	    CloseableHttpClient httpclient = HttpClients.createDefault();
 	        HttpPut request = new HttpPut(url);
	        StringEntity params =new StringEntity(data,"UTF-8");
	        params.setContentType("application/json");
	        request.addHeader("content-type", "application/json");
	        request.addHeader("Accept", "*/*");
	        request.addHeader("Accept-Encoding", "gzip,deflate,sdch");
	        request.addHeader("Accept-Language", "en-US,en;q=0.8");
	        request.setEntity(params);
	        CloseableHttpResponse response;
			try {
				response      = httpclient.execute(request);
		        responseCode = response.getStatusLine().getStatusCode();
		        handleResponse(response);
			} catch (ClientProtocolException e) {
 				e.printStackTrace();
			} catch (IOException e) {
 				e.printStackTrace();
			}  
	        return responseCode;
	}
	
	protected static void handleResponse(CloseableHttpResponse response) {
 	try {
        int responseCode = response.getStatusLine().getStatusCode();
//      System.out.println("responseCode " + responseCode);
        if (response.getStatusLine().getStatusCode() == 200 || response.getStatusLine().getStatusCode() == 204) {

            BufferedReader br = new BufferedReader(
                    new InputStreamReader((response.getEntity().getContent())));

            String output;
           // System.out.println("Output from Server ...." + response.getStatusLine().getStatusCode() + "\n");
	    	String info = "";
    		while ((output = br.readLine()) != null) {
    			info = info + output;
    			//System.out.println(output);
    		}
    		if( ctx != null ) {
    			String msg =  "httpinfo('"+info+"')";
    			QActorUtils.raiseEvent( ctx, "clienthttp", "httpinfo",msg);
    		}
        }
        else{ 
            throw new RuntimeException("Failed : HTTP error code : "
                    + response.getStatusLine().getStatusCode());
        }

    }catch (Exception ex) {
	} finally {
//	    	httpclient.close();
    }
		
	}//handleResponse
	
	public static void connectPost(){
 		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost("http://localhost:8484/pi/actuators/leds/2");
		List <NameValuePair> nvps = new ArrayList <NameValuePair>();
		nvps.add(new BasicNameValuePair("username", "vip"));
		nvps.add(new BasicNameValuePair("password", "secret"));
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(nvps));
			CloseableHttpResponse response2 = httpclient.execute(httpPost);

//		    System.out.println(response2.getStatusLine());
		    HttpEntity entity2 = response2.getEntity();
		    // do something useful with the response body and ensure it is fully consumed
		    EntityUtils.consume(entity2);
	 	  } catch ( Exception e) {
	 			e.printStackTrace();
	 			
	 	}
 	}
	

	
	public static void connectGet(){
	 try {
 		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet("http://localhost:8484/pi/actuators/leds");		
//		System.out.println("RestClientHttp connectGet");
		CloseableHttpResponse response = httpclient.execute(httpGet);
//		System.out.println("RestClientHttp response=" + response);

		if (response.getStatusLine().getStatusCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
			   + response.getStatusLine().getStatusCode());
		}

		BufferedReader br = new BufferedReader(
                         new InputStreamReader((response.getEntity().getContent())));

		String output;
		String info = "";
		while ((output = br.readLine()) != null) {
			info = info + output;
			//System.out.println(output);
		}
//		System.out.println("Output from Server .... ");
//		System.out.println(info);
		if( ctx != null ) {
			String msg =  "httpinfo('"+info+"')";
//			System.out.println(msg);
			QActorUtils.raiseEvent( ctx, "clienthttp", "httpinfo",msg);
		}
 	  } catch ( Exception e) {
		e.printStackTrace();
		}
	}
/*
	public static void work1(QActorContext curctx) {
//		System.out.println("RestClientHttp");
		ctx = curctx;
 		connectGet();
		sendPut("{\"value\":false}", "http://localhost:8484/pi/actuators/leds/2");
		sendPut("{\"value\":true}", "http://localhost:8484/pi/actuators/leds/1");
 		connectGet();		
		ctx = null;
	}
	
	public static void main (String args[]){
		System.out.println("RestClientHttp");
 		connectGet();
		sendPut("{\"value\":false}", "http://localhost:8484/pi/actuators/leds/2");
		sendPut("{\"value\":true}", "http://localhost:8484/pi/actuators/leds/1");
 		connectGet();
	}
*/
}
