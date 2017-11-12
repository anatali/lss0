package it.unibo.bls.lowLevel.interfaces;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
/*
* -----------------------------------------------------------
* This is a first model of the Led:
* a Led is a Device with a LedColor and a internal binary state
* -----------------------------------------------------------
*/
public interface IDeviceLedImpl  extends IDeviceOutputImpl{	
  	public void doSwitch(); 		//non-primitive
  	public void turnOn(); 			// modifier
	public void turnOff(); 			// modifier
	public LedColor getLedColor(); //property
	public boolean isOn(); 			//property	
}