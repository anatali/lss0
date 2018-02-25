package it.unibo.mbot.intro;

import it.unibo.mbot.serial.JSSCSerialComm;
import it.unibo.mbot.serial.SerialPortConnSupport;

public class MbotControl {
 	private SerialPortConnSupport conn;
	private JSSCSerialComm serialConn;
	private String dataFromArduino;

	public void init() throws Exception {
 		System.out.println("MbotControl starts");
		serialConn = new JSSCSerialComm(null);
		//conn = serialConn.connect("COM6");	//returns a SerialPortConnSupport
		conn = serialConn.connect("/dev/ttyUSB0");
		dataFromArduino = conn.receiveALine();
		System.out.println("MbotControl received:" + dataFromArduino);
		getDataFromArduino();
	}
	
	public void doRequestToAndruino(String cmd) throws Exception {
		conn.sendCmd(cmd);
//		dataFromArduino = conn.receiveALine();
//		System.out.println("MbotControl received:" + dataFromArduino);		
 		System.out.println("user cmd (w,a,s,d,h):"  );
	}
	
	public void getDataFromArduino() {
		new Thread() {
			public void run() {
				try {
					System.out.println("MbotControl getDataFromArduino STARTED"  );
					while(true) {
						String dataFromArduino = conn.receiveALine();
						System.out.println("MbotControl received:" + dataFromArduino);	
					}
				} catch (Exception e) {
 					e.printStackTrace();
				}
			}
		}.start();
	}
 	public void askUser() throws Exception {
 		init();
 		System.out.println("user cmd (w,a,s,d,h):"  );
		while(true) {
 	 		int cmd = System.in.read(); 
	 		//System.out.println("user:" + cmd);
	 		switch (cmd ) {
		 		case 119 : doRequestToAndruino("w") ; break;
		 		case 115 : doRequestToAndruino("s") ; break;
		 		case 97  : doRequestToAndruino("a") ; break;
		 		case 100 : doRequestToAndruino("d") ; break;
		 		case 104 : doRequestToAndruino("h") ;
	 		}
 		} 		
 	}

	public static void main( String[] args) throws Exception {
		new MbotControl().askUser();
	}
}
