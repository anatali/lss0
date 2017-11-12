package it.unibo.buttonLed.control;

import java.util.Observable;
import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.is.interfaces.IOutputView;
import it.unibo.system.SituatedPlainObject;

public class BLSControlFSM extends SituatedPlainObject implements IBLSControl {
  	protected String curstate = "S0";
 	protected boolean on = false;
  	protected IDevLed ledLogical;
  	
	public BLSControlFSM( IOutputView outView ){
 		super(outView);
  	}
 	public BLSControlFSM(IOutputView outView, IDevLed ledLogical){
 		super(outView);
 		this.ledLogical = ledLogical;
 	}
 	public void update(Observable source, Object cmd) {
  		println("BLSControlFSM update cmd="  + cmd  );	
		controllerAsFsm( ""+cmd );
	}
	/*
	 * Injection of the high-level Led  
	 */
 	public void setLed(IDevLed led){
 		ledLogical = led;
 	}
 	protected void controllerAsFsm(String cmd){
		String result = controllerFsm(cmd);
   		println("BLSControlFSM curstate=" + curstate + "/result=" + result);
		if( result != null ){
			if( result.equals("on")){
				if(ledLogical !=null) ledLogical.turnOn();		
 				println("BLSControlFSM FSM done ON"   );
			}
			if( result.equals("off")){
				if(ledLogical !=null) ledLogical.turnOff();
 				println("BLSControlFSM FSM done OFF"   );
			}
		}		
	}
	protected String controllerFsm(String inp){
		if( curstate.equals("S0")){
			if( inp.equals("true")){
 				curstate = "SOdd";
				return "on";
			}else  return null; //Exception
		}
		if( curstate.equals("SOdd")){
			if( inp.equals("false")){
				curstate = "SOn";
				return "";
			}else   return null; //Exception
		}
		if( curstate.equals("SOn")){
			if( inp.equals("true")){
 				curstate = "SEven";
				return "off";
			}else  return null; //Exception
		}
		if( curstate.equals("SEven")){
			if( inp.equals("false")){
				curstate = "S0";
				return "";
			}else return null; //Exception
		}
		return null;
 	}	
 }
