package it.unibo.buttonLedSystemHL;

import static org.junit.Assert.*;
import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevButton;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.bls.lowLevel.interfaces.ILed;
import it.unibo.buttonLed.components.ButtonMock;
import it.unibo.buttonLed.components.LedMock;
import it.unibo.buttonLed.control.BLSControlNaive;
import it.unibo.buttonLed.control.BLSControlSwitch;
import it.unibo.buttonLedSystem.BLSHLMainMock;
import it.unibo.buttonLedSystem.BLSHLFactory;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;
import org.junit.*;


public class TestBlsControls { 
protected IDeviceLedImpl concreteLed;
private IDeviceButtonImpl concreteButton;
protected IDevButton logicButton ;
protected IDevLed logicLed ;
 	
	@Test
	public void testControlFsm(){
		try{
			IBLSControl control = BLSHLFactory.createBlsControlFSM( SituatedSysKb.standardOutEnvView );
			BLSHLMainMock sys   = BLSHLFactory.createBLSHLDemoMock( SituatedSysKb.standardOutEnvView, control);
			concreteButton = sys.getConcreteButton();
			concreteLed    = sys.getConcreteLed();
			logicButton    = sys.getButton();
			logicLed       = sys.getLed();
			testWork();
		}catch(Exception e){
			fail("setUp");
		}			
	}
	@Test
	public void testControlSwitch(){
		try{
			IBLSControl control = new BLSControlSwitch( SituatedSysKb.standardOutEnvView );
			BLSHLMainMock sys = BLSHLFactory.createBLSHLDemoMock( SituatedSysKb.standardOutEnvView, control);
			concreteButton = sys.getConcreteButton();
			concreteLed    = sys.getConcreteLed();
			logicButton    = sys.getButton();
			logicLed       = sys.getLed();
	 	 	concreteButton.high();
		 	assertTrue("testSwitch high 1 ", concreteLed.isOn() );
	 	 	concreteButton.high();
		 	assertTrue("testSwitch high 2 ", ! concreteLed.isOn() );
		 	concreteButton.low();
		 	assertTrue("testSwitch low 1 ", concreteLed.isOn() );
		 	concreteButton.low();
		 	assertTrue("testSwitch low 2 ", ! concreteLed.isOn() );
		 	concreteButton.high();
		 	assertTrue("testSwitch high 3 ",  concreteLed.isOn() );
	 	 	concreteButton.high();
		 	assertTrue("testSwitch high 4 ", ! concreteLed.isOn() );
		 	concreteButton.low();
		 	assertTrue("testSwitch low 3 ",  concreteLed.isOn() );
		 	concreteButton.high();
		 	assertTrue("testSwitch high 5 ", ! concreteLed.isOn() );
		}catch(Exception e){
			fail("testControlSwitch");
		}			
	}
 
	protected void testWork(){
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
 

 
}
