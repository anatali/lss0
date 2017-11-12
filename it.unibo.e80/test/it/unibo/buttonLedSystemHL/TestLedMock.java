package it.unibo.buttonLedSystemHL;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.buttonLedSystem.BLSHLFactory;
import it.unibo.system.SituatedSysKb;

public class TestLedMock { 
protected IDeviceLedImpl led;

@Before
	public void setUp() {
		System.out.println(" *** setUp "  );
		try{
 			led = BLSHLFactory.createLedMock("led",SituatedSysKb.standardOutEnvView, LedColor.GREEN);
 		}catch(Exception e){
			fail("setUp");
		}
 	}
@After
	public void tearDown() throws Exception{
  		System.out.println(" *** tearDown "  );
	}
@Test
	public  void testCreation(){
		System.out.println("	testCreation ... " );
	 	assertTrue("testCreation", ! led.isOn() );
  	}	
@Test
public  void testTurnOn(){
	System.out.println("	testTurnOn ... " );
	led.turnOn();
 	assertTrue("testTurnOn", led.isOn() );
 }
@Test
public  void testTurnOff(){
	System.out.println("	testTurnOff ... " );
	led.turnOff();
 	assertTrue("testTurnOf", ! led.isOn() );
}
@Test
public  void testSwitch(){
	System.out.println("	testSwitch ... " );
	led.doSwitch();
 	assertTrue("testSwitch",  led.isOn() );
 	led.doSwitch();
 	assertTrue("testSwitch",  ! led.isOn() );
} 
@Test
public  void testRep(){
	System.out.println("	testrep ... " );
	String rep   = led.getDefaultRep();
	String color = led.getLedColor()==LedColor.RED ? "RED" : "GREEN";
	String repExpected="device(led("+led.getName() +"),"+color+",false)";
	System.out.println("rep="+ rep + " repExpected=" + repExpected);
  	assertTrue("testrep", rep.equals(repExpected) ); 
 } 
 
}