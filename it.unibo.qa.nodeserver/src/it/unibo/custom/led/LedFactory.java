package it.unibo.custom.led;

import java.util.Hashtable;

import alice.tuprolog.SolveInfo;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.buttonLed.components.DevLed;
import it.unibo.buttonLedSystem.gui.components.DeviceLedGui;
import it.unibo.buttonLedSystem.gui.components.IDeviceLedGui;
import it.unibo.qactors.akka.QActor;

public class LedFactory {
private static Hashtable<String, IDevLed> leds = new Hashtable<String, IDevLed>();
 
	public static void createLedWithGui( String name, QActor qa ) {
		try {		
			IDeviceLedGui ledGui = new DeviceLedGui(  name,   qa.getOutputEnvView(), LedColor.RED);
			IDevLed led          = new DevLed( name, qa.getOutputEnvView() );
			led.setDevImpl(ledGui);
			leds.put(name, led);
 		} catch (Exception e) {
 			qa.println("WARNING createLedWithGui: " + e.getMessage());
 		}		
	}

//	public  static void createLedNode( String name, QActor qa) {
//		try {
//			
//			ledGui = new DeviceLedGui(  name,   qa.getOutputEnvView(), LedColor.RED);
//			led    = new DevLed( name, qa.getOutputEnvView() );
//			led.setDevImpl(ledGui);
//		} catch (Exception e) {
// 			e.printStackTrace();
//		}		
//	}-----------
	
	
	public static IDevLed getLed(String ledName) {
		return leds.get(ledName);
	}
	public static void ledSwitch(String ledName) {
		IDevLed led = leds.get(ledName);
		if( led != null ) led.doSwitch();
 	}
	
  	public static void ledBlink(String ledName){
  		System.out.println("		ledBlink STARTS");
   		while( true ) {
  			ledSwitch(ledName);
  			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
 			}
   		}
  	}
  	
 
	
}
