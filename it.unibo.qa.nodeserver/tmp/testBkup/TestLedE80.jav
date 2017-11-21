package it.unibo.buttonLedSytem.tests;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import org.junit.Before;
import org.junit.Test;
import it.unibo.e80.interfaces.ILedE80;


/*
 * THIS IS A TEST PLAN
 */
public class TestLedE80 { 
protected ILedE80 led;

@Before
public void setUp() {
	System.out.println(" *** setUp "  );
	try{
		//THIS SENTENCE IS INTRUDUCED AFTER PROJECT AND IMPLEMENTATION
		System.out.println("setUp");
//		led = ;
	}catch(Exception e){
		fail("setUp");
	}
	}

@Test
public void testTurnOn() {
	System.out.println("testTurnOn");
	led.turnOn();
	assertTrue("", led.isOn());
}

 
}