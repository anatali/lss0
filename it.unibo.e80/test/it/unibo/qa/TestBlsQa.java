package it.unibo.qa;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import alice.tuprolog.NoSolutionException;
import alice.tuprolog.SolveInfo;
import it.unibo.bls0Ctx.MainBls0Ctx;
import it.unibo.qactors.QActorContext;
import it.unibo.qactors.QActorUtils;
import it.unibo.qactors.akka.QActor;
 
/*
 * Each test recreates and runs the whole system
 * 
 * Perhaps this is not the best way to test the system, but we want to experiment jacoco
 */
public class TestBlsQa {
   private QActorContext ctx;
   private QActor control = null;
   private QActor led = null;
   private String ledState;
   private boolean ledStateCheck;
   
  	@Before
	public void setUp() throws Exception  {
    	ctx = MainBls0Ctx.initTheContext();
    	//We create the actors, but we must also be sure that 
    	//each actor has terminated its initialization phase
   		while( control == null || led == null ){
   			//wait for creation
  	 		Thread.sleep(200);  
 			control  = QActorUtils.getQActor("qacontrol_ctrl");
  			led      = QActorUtils.getQActor("qaled_ctrl");
  		};
  		while( getLedState(led).equals("failure")) {
  			//wait for init
  			System.out.println("led still not set"   );
  			Thread.sleep(300);
  		}
   		System.out.println("====== setUp  led=" + led );
	}
  	
	 @After
	 public void terminate(){
	  	System.out.println("====== terminate  " + ctx );
   	 }

  	@Test
	public void aTest() {  
  		System.out.println("====== aTest ==============="  );
		try {
	 		assertTrue("aTest button", control != null );
  			assertTrue("actorTest led", led != null );
  			//initial
  			ledState = getLedState(led);
  			ledStateCheck = ledState.equals("true");
  			assertTrue("aTest led", ledStateCheck );
  			
  			for( int i=1; i<=2; i++) {
	 			raiseButtonClick(control);
// 				Thread.sleep(500);
	 			ledState = getLedState(led);
	  			ledStateCheck = ledState.equals("true");
	 			System.out.println("====== aTest 1 ledState="  + ledState + " " +  ledStateCheck );
 	     		assertTrue("aTest led", ledStateCheck );
	  			
	     		raiseButtonClick(control);
//	     		Thread.sleep(500);
				ledState = getLedState(led);
	 			System.out.println("====== aTest 2 ledState="  + ledState  + " " +  ledState.equals("true"));
 				assertTrue("aTest led", ledState.equals("true") );			
 				
  			}
 			//Avoid to break the testing too early
   			Thread.sleep(1000);
   			 
  		} catch (Exception e) {
			fail("actorTest " + e.getMessage() );
		}		
	}
  	
  	 
  	
  	
/*
 * UTILITIES  	
 */
  	public void raiseButtonClick(QActor button) throws InterruptedException{
		QActorUtils.emitEventAfterTime(button, "btn", "local_click", "clicked(1)", 200);
  		Thread.sleep(800); 	//give time to handle the event		 		
  	}
  	public String getLedState(QActor led) throws NoSolutionException{
 		SolveInfo lsg      = led.solveGoal("getVal(ledState,V)");
  		String ledState = ""+lsg.getVarValue("V");
		return ledState;
  	}
} 	
