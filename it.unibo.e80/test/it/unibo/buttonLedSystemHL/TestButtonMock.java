package it.unibo.buttonLedSystemHL;
import static org.junit.Assert.*;
import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.buttonLedSystem.BLSHLFactory;
import it.unibo.system.SituatedSysKb;
import org.junit.Before;
import org.junit.Test;
/*
 * This test makes reference to ButtonMock
 * The test unit works like a user that calls the high/low methods
 */

public class TestButtonMock  {  
private String btnName = "btnMock";
private IButton button;
@Before
	public void setUp() { 		
		try{
 			button = BLSHLFactory.createButtonMock(btnName,SituatedSysKb.standardOutEnvView);
		}catch(Exception e){
			fail("setUp");
		}
   	}
@Test
	public  void testCreation(){
 		assertTrue("	testCreation", ! button.isPressed() );
  	}	
@Test
public  void testPress(){
 	button.high();
 	assertTrue("testPress", button.isPressed() );
	assertTrue("testRelease",  button.getInput() == 1 );
	button.high();
	assertTrue("testPress", button.isPressed() );
	assertTrue("testRelease",  button.getInput() == 1 );
}
@Test
public  void testRelease(){
 	button.low();
 	assertTrue("testRelease", ! button.isPressed() );
	assertTrue("testRelease",  button.getInput() == 0 );
	button.high();
 	assertTrue("testRelease", button.isPressed() );
	assertTrue("testRelease",  button.getInput() == 1 );
	button.low();
	assertTrue("testRelease",  ! button.isPressed() );
	assertTrue("testRelease",  button.getInput() == 0 );
}

@Test
public void testName(){
 	String expectedName = "button("+btnName+")";
	assertTrue("testPolling", button.getName().equals(expectedName));
  }
@Test
public void testPolling(){
	button.high();
 	assertTrue("testPolling", button.getInput()==1 );
}
@Test
public void testUpdate(){
	button.update(null,true);
 	assertTrue("testUpdate", button.getInput()==1 );
}

@Test
public void testObserver(){
	ButtonObserverNaive buttonObserver = new ButtonObserverNaive();
	button.addObserver(buttonObserver);
	button.high();
	assertTrue("testObserver",  buttonObserver.getCurVal().equals(IDeviceButtonImpl.repHigh) );
	button.low();
	assertTrue("testObserver",  buttonObserver.getCurVal().equals(IDeviceButtonImpl.repLow) );
 } 
}