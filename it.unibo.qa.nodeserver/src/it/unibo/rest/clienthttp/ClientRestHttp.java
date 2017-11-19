package it.unibo.rest.clienthttp;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import it.unibo.qactors.QActorContext;
import it.unibo.qactors.QActorUtils;

public class ClientRestHttp {

private  QActorContext ctx = null;
private String host;
private int port;
private CloseableHttpClient httpclient;

 	public ClientRestHttp( QActorContext ctx , String host, int port ) {
		this.ctx  = ctx;
		this.host = host;
		this.port = port;
		httpclient = HttpClients.createDefault();
	}
	public ClientRestHttp( QActorContext ctx  ) {
		this.ctx  = ctx;
 		httpclient = HttpClients.createDefault();
	}

	public  void sendGet(  ) {
		String url = "http://"+host+":"+port;
		sendGet(url);		
	}	
	
	public  void sendGet( String url ) {
	  try {
		System.out.println("		ClientRestHttp sendGet url=" + url);
		HttpGet httpGet = new HttpGet(url);	
		CloseableHttpResponse response = httpclient.execute(httpGet);
//		System.out.println("RestClientHttp response=" + response);
		if (response.getStatusLine().getStatusCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
			   + response.getStatusLine().getStatusCode());
		}
		BufferedReader br = new BufferedReader(
                         new InputStreamReader((response.getEntity().getContent())));
		String data;
		String info = "";
		while ( (data = br.readLine() ) != null) {
			info = info + data;
		}
			String msg =  "httpinfo('"+info+"')";
				System.out.println("raise event " + msg);
			if( ctx != null ) {
				QActorUtils.raiseEvent( ctx, "clienthttp", "httpinfo",msg);
			}
 	  } catch ( Exception e) {
		e.printStackTrace();
	 }		
	}
	public  int sendPut( String data ) {
		String url = "http://"+host+":"+port;
		return sendPut(data, url );
 	}

	public  int sendPut( String data, String url ) {
		System.out.println("		ClientRestHttp sendPut url=" + url);
	    int responseCode = -1;
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
		        responseCode  = response.getStatusLine().getStatusCode();
		        handleResponse(response);
			} catch (ClientProtocolException e) {
 				e.printStackTrace();
			} catch (IOException e) {
 				e.printStackTrace();
			}  
	        return responseCode;
	}

	protected  void handleResponse(CloseableHttpResponse response) {
 	try {
        int responseCode = response.getStatusLine().getStatusCode();
//      System.out.println("responseCode " + responseCode);
        if (response.getStatusLine().getStatusCode() == 200 || response.getStatusLine().getStatusCode() == 204) {

            BufferedReader br = new BufferedReader(
                    new InputStreamReader((response.getEntity().getContent())));

            String data;
           // System.out.println("Output from Server ...." + response.getStatusLine().getStatusCode() + "\n");
	    	String info = "";
    		while ((data = br.readLine()) != null) {
    			info = info + data;
    			//System.out.println(data);
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
	

	
	 /*	
	public static void main (String args[]){
		System.out.println("ClientRestHttp");
 		connectGet();
		sendPut("{\"value\":false}", "http://localhost:8484/pi/actuators/leds/2");
		sendPut("{\"value\":true}", "http://localhost:8484/pi/actuators/leds/1");
 		connectGet();
	}
*/
}
