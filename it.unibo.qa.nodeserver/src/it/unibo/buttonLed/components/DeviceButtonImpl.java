package it.unibo.buttonLed.components;
import java.util.Observable;
import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.is.interfaces.IActivityBase;
import it.unibo.is.interfaces.IOutputView;
import it.unibo.system.SituatedPlainObject;
/*
 * A SituatedPlainObject that defines a common behavior for all button implementations
 */
public class DeviceButtonImpl extends SituatedPlainObject implements IButton,IActivityBase {
protected String input = "";
protected boolean  buttonPressed  = false;

	public DeviceButtonImpl(String name, IOutputView outView ) {
		super("button("+name+")",outView);
	}
	/*
	 * This is the entry point for a "polling interaction"
	 */
	@Override
	public int getInput()  { 
 		int v = input.equals( IDeviceButtonImpl.repHigh ) ? 1  : 0 ;
		println( "DeviceButtonImpl getInput:" + v );
		return v;  
	}
	/*
	 * Entry point after a button-click (button implements IActivityBase)
	 */
 	@Override
	public void execAction(String cmd) {
  		println( "DeviceButtonImpl " + this.getClass().getName() + " execAction:" + cmd );
 		input = cmd;
 		this.notifyTheObservers(cmd);
  	} 	
 	/*
 	 * This update method is used by some class (e.g. DevButtonStdin, Arduino) that generates a boolean
 	 */
 	public void update( boolean v){		
 		input = v ? IDeviceButtonImpl.repHigh : IDeviceButtonImpl.repLow ;
  		execAction( input );
	}
 	/*
 	 * This update method is used by some class (e.g.Arduino?) that generates a string 'LOW' or 'HIGH'
 	 */
	@Override
	public void update(Observable source, Object value) {
		String vs = ""+value;		
		if( vs.equals( IDeviceButtonImpl.repHigh ) || vs.equals(IDeviceButtonImpl.repLow) ){
 			execAction(  ""+vs.equals( IDeviceButtonImpl.repHigh )  );
		}else{
			execAction( vs );
		}
 	}
	@Override
	public String getDefaultRep() {
		String s = "sensor("+this.name+","+ buttonPressed +")";
  		return s;
 	}
	@Override
	public String getName() {
 		return name;
	}
	@Override
	public boolean isPressed() {
 		return  buttonPressed ;
	}
	/*
	 * API for debugging
 	 */
	@Override
	public void high() {
		buttonPressed  = true;
		execAction(IDeviceButtonImpl.repHigh);
 	}
	@Override
	public void low() {
		buttonPressed  = false;
		execAction(IDeviceButtonImpl.repLow);
 	}
/*
 * Remove all the observers	
 */
// 	protected void terminate(){
// 		 this.deleteObservers();
// 	}
 }