package it.unibo.bls17.naive;
import static org.junit.Assert.assertTrue;
import java.awt.event.ActionEvent;
import org.junit.Before;
import org.junit.Test;

public class TestBlsGuiBase {
private MainBlsGuiBase sys;

	@Before
	public void setUp(){
		sys = MainBlsGuiBase.createTheSystem();
	}
	 /*
	 * Test the class MainBlsGuiBase
	 */	
	@Test
	public void testSystemLogic(){
 		String cmd 					 = sys.getCmd();
 		ILed led                     = sys.getLed();		
  		ButtonListener listener      = sys.getActionListener();
 		ActionEvent ev               = new ActionEvent(sys.getButton(), 0, cmd);	
		assertTrue("testSystemLogic", listener.getNumOfClicks()==0 && ! led.getState());	
		delay(500);
		listener.actionPerformed(ev);
		assertTrue("testSystemLogic",  listener.getNumOfClicks()==1 &&  led.getState());
		delay(500);
		listener.actionPerformed(ev);
		assertTrue("testSystemLogic",  listener.getNumOfClicks()==2 && ! led.getState() );
		delay(500);
		listener.actionPerformed(ev);
		assertTrue("testSystemLogic",  listener.getNumOfClicks()==3 &&  led.getState());
		delay(500);
	}
	@Test
	public void testWrongCmd(){
  		ILed led                     = sys.getLed();		
  		ButtonListener listener      = sys.getActionListener();
 		ActionEvent ev               = new ActionEvent(sys.getButton(), 0, "CLICK");	
		assertTrue("testWrongCmd", listener.getNumOfClicks()==0 && ! led.getState());	
		delay(500);
		listener.actionPerformed(ev);
		assertTrue("testWrongCmd",  listener.getNumOfClicks()==1 && ! led.getState());
		delay(500);
		listener.actionPerformed(ev);
		assertTrue("testWrongCmd",  listener.getNumOfClicks()==2 && ! led.getState() );
		delay(500);
 	}
	
 	protected void delay( int time ){
		try {
			Thread.sleep(time);
		} catch (InterruptedException e) {
 			e.printStackTrace();
		} 		
 	}
}
