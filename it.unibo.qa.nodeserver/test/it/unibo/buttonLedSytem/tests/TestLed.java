package it.unibo.buttonLedSytem.tests;
import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import alice.tuprolog.Prolog;
import alice.tuprolog.Term;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.bls.lowLevel.interfaces.ILed;
import it.unibo.buttonLed.components.LedMock;
//import it.unibo.system.SituatedSysKb;
 
public class TestLed { 
protected ILed led;

@Before
	public void setUp() {
		System.out.println(" *** setUp "  );
		try{
			//THIS SENTENCE IS INTRUDUCED AFTER PRJECT AND IMPLEMENTATION
			led = new LedMock("led1",   LedColor.GREEN);
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
	String repExpected="device("+led.getName() +","+color+",false)";
	System.out.println("rep="+ rep + " repExpected=" + repExpected);
  	assertTrue("testrep", rep.equals(repExpected) ); 
 } 
@Test
public  void testRepUnify(){
	System.out.println("	testRepUnify ... " );
 	String color = led.getLedColor()==LedColor.RED ? "RED" : "GREEN";
	String repExpected="device("+led.getName() +","+color+",false)";
 	Term te = Term.createTerm(repExpected);
	Term tr = Term.createTerm(led.getDefaultRep());
	boolean match = new Prolog().unify(tr, te);
  	assertTrue("testRepUnify",  match );  
} 
}