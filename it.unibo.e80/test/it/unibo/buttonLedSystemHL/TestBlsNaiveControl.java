package it.unibo.buttonLedSystemHL;

import static org.junit.Assert.*;

import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevButton;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.bls.lowLevel.interfaces.ILed;
import it.unibo.buttonLedSystem.BLSHLMainMock;
import it.unibo.buttonLedSystem.BLSHLFactory;
import it.unibo.system.SituatedSysKb;
import org.junit.*;


public class TestBlsNaiveControl { 
protected IDeviceLedImpl concreteLed;
private IDeviceButtonImpl concreteButton;
protected IDevButton logicButton ;
protected IDevLed logicLed ;


@Before
	public void setUp() {
		try{
			IBLSControl control = null; //will be set later to BLSControlNaive
			BLSHLMainMock sys = 
				BLSHLFactory.createBLSHLDemoMock( SituatedSysKb.standardOutEnvView, control);
			concreteButton = sys.getConcreteButton();
			concreteLed    = sys.getConcreteLed();
			logicButton    = sys.getButton();
			logicLed       = sys.getLed();
		}catch(Exception e){
			fail("setUp");
		}		
	}

@After
	public void tearDown() throws Exception{
 	}
@Test
	public  void testCreation(){
		assertTrue("testCreation", ! concreteButton.isPressed() );
 	 	assertTrue("testCreation", ! concreteLed.isOn() );
	}	
@Test
	public  void testWork(){
 	 	concreteButton.high();
	 	assertTrue("testWork high 1 ", concreteLed.isOn() );
 	 	concreteButton.high();
	 	assertTrue("testWork high 2 ", concreteLed.isOn() );
	 	concreteButton.low();
	 	assertTrue("testWork low 1 ", concreteLed.isOn() );
	 	concreteButton.low();
	 	assertTrue("testWork low 2 ", concreteLed.isOn() );
	 	concreteButton.high();
	 	assertTrue("testWork high 3 ", ! concreteLed.isOn() );
 	 	concreteButton.high();
	 	assertTrue("testWork high 4 ", ! concreteLed.isOn() );
	 	concreteButton.low();
	 	assertTrue("testWork low 3 ", ! concreteLed.isOn() );
	 	concreteButton.high();
	 	assertTrue("testWork high 5 ", concreteLed.isOn() );
	}	
@Test
	public  void testConcreteRep(){
	String ledRep         = concreteLed.getDefaultRep();
	String expectedLedRep = "device(led(led),GREEN,false)";
	String buttonRep      = concreteButton.getDefaultRep();
 	String expectedButtonRep = "sensor(button(bt),false)";
 	System.out.println("" + ledRep + " " + buttonRep);
	assertTrue("testRep 1a ", ledRep.equals(expectedLedRep) );
	assertTrue("testRep 1b ", buttonRep.equals(expectedButtonRep) );
		
	 	concreteButton.high();
	 	ledRep = concreteLed.getDefaultRep();
	 	buttonRep = concreteButton.getDefaultRep();
		expectedButtonRep = "sensor(button(bt),true)";
	 	expectedLedRep    = "device(led(led),GREEN,true)";
		assertTrue("testRep 2a ", ledRep.equals(expectedLedRep) );
		assertTrue("testRep 2b ", buttonRep.equals(expectedButtonRep) );
	}

@Test
	public  void testLogicRep(){
	String ledRep         = logicLed.getDefaultRep();
	String expectedLedRep = "device(led(led),GREEN,false)";
	String buttonRep      = logicButton.getDefaultRep();
	String expectedButtonRep = "devbutton(devBtn,pressed(false))";
	System.out.println(ledRep);
	System.out.println(buttonRep);
		assertTrue("testRep 1a ", ledRep.equals(expectedLedRep) );
		assertTrue("testRep 1b ", buttonRep.equals(expectedButtonRep) );
	}

}
