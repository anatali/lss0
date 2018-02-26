package it.unibo.qambotpc;
import it.unibo.mbot.serial.JSSCSerialComm;
import it.unibo.mbot.serial.SerialPortConnSupport;


public class MbotConnArduino {
 
private static SerialPortConnSupport conn = null;
private static JSSCSerialComm serialConn;
private static String dataFromArduino;
 
	public static void initRasp()   {
		init( "/dev/ttyUSB0" );
	}
	public static void initPc()   {
		init( "COM6" );
	}

 	private static void init(String port)   {
		try {
	 		System.out.println("MbotConnArduino starts");
			serialConn = new JSSCSerialComm(null);
			conn = serialConn.connect(port);	//returns a SerialPortConnSupport
			if( conn == null ) return;
 			dataFromArduino = conn.receiveALine();
			System.out.println("MbotConnArduino received:" + dataFromArduino);
 			getDataFromArduino();
		}catch( Exception e) {
			System.out.println("MbotConnArduino ERROR" + e.getMessage());
		}
	}
	
	private static  void getDataFromArduino() {
		new Thread() {
			public void run() {
				try {
					System.out.println("MbotConnArduino getDataFromArduino STARTED"  );
					while(true) {
						String dataFromArduino = conn.receiveALine();
						System.out.println("MbotConnArduino received:" + dataFromArduino);	
					}
				} catch (Exception e) {
 					e.printStackTrace();
				}
			}
		}.start();
	}
	
	public static void mbotForward() {
 		try { if( conn != null ) conn.sendCmd("w"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotBackward() {
		try { if( conn != null ) conn.sendCmd("s"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotLeft() {
		try { if( conn != null ) conn.sendCmd("a"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotRight() {
		try { if( conn != null ) conn.sendCmd("d"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotStop() {
		try { if( conn != null ) conn.sendCmd("h"); } catch (Exception e) {e.printStackTrace();}
//		QActorUtils.terminateTheQActorSystem( systemCreator, false  ); 
	}
	public static void mbotLinefollow() {
		try { if( conn != null ) conn.sendCmd("f"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotExit() {
		try { if( conn != null ) conn.sendCmd("h"); } catch (Exception e) {e.printStackTrace();}
		
		//System.exit(1);
		
	}
	
	
 
}
