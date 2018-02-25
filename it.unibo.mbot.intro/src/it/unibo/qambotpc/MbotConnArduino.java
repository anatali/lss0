package it.unibo.qambotpc;
import it.unibo.mbot.serial.JSSCSerialComm;
import it.unibo.mbot.serial.SerialPortConnSupport;
import it.unibo.qactors.QActorUtils;

public class MbotConnArduino {
 
private static SerialPortConnSupport conn;
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
		try { conn.sendCmd("w"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotBackward() {
		try { conn.sendCmd("s"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotLeft() {
		try { conn.sendCmd("a"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotRight() {
		try { conn.sendCmd("d"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotStop() {
		try { conn.sendCmd("h"); } catch (Exception e) {e.printStackTrace();}
//		QActorUtils.terminateTheQActorSystem( systemCreator, false  ); 
	}
	public static void mbotLinefollow() {
		try { conn.sendCmd("f"); } catch (Exception e) {e.printStackTrace();}
	}
	public static void mbotExit() {
		try { conn.sendCmd("h"); } catch (Exception e) {e.printStackTrace();}
		
		//System.exit(1);
		
	}
	
	
//	public static void sendCmd(String cmd) {
//   		try {
//   			if( initDone ) conn.sendCmd(cmd);
//   			else {
//   				init();
//   			}
//		} catch (Exception e) {
// 			e.printStackTrace();
//		} 
//  		
//	}
}
