package it.unibo.bls.lowLevel.interfaces;
/*
 * -----------------------------------------------------------
 * This is a first model of the Button:
 * A Button is a Device with a an internal binary state
* -----------------------------------------------------------
 */
public interface IDeviceButtonImpl extends IDeviceInputImpl{
	public  final String repHigh    = "true";
	public  final String repLow     = "false";
	public  final String repSwitch  = "switch";
	public  final String eventName  = "click";

	public boolean isPressed() ;	//property
 	/*
	 * For debugging purposes 	
	 */
	public void high();		//modifier
	public void low();	    //modifier
}
