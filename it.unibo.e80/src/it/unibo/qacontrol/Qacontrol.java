/* Generated by AN DISI Unibo */ 
/*
This code is generated only ONCE
*/
package it.unibo.qacontrol;
import it.unibo.is.interfaces.IActivity;
import it.unibo.is.interfaces.IIntent;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.qactors.QActorContext;

public class Qacontrol extends AbstractQacontrol implements IActivity{ 
	public Qacontrol(String actorId, QActorContext myCtx, IOutputEnvView outEnvView )  throws Exception{
		super(actorId, myCtx, outEnvView);
	}
/*
 * ADDED BY THE APPLICATION DESIGNER	
 */
	private int count = 1;
	
	public void createAButtonPojo(){
		createAButtonWithGui();		
	}
	protected void createAButtonWithGui(){
		outEnvView.getEnv().addCmdPanel("btn", new String[]{"click"}, this);		
	}
	@Override 
	public void execAction(String cmd) {
		try {
			//println("++++ " + cmd);
 			//sendMsg("turn","qaled", QActorContext.dispatch, "switch(" + count++ + ")" );
			this.emit("local_click", "clicked("+count++ +")");
		} catch (Exception e) {
 			e.printStackTrace();
		} 		
	}
	@Override
	public void execAction() {	}
	@Override
	public void execAction(IIntent input) {	}
	@Override
	public String execActionWithAnswer(String cmd) { return null;	}

}
