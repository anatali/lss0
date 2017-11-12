package it.unibo.bls.highLevel.interfaces;
 

import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
/*
* -----------------------------------------------------------
* This is the high-level model of the Led
* -----------------------------------------------------------
*/
public interface IDevLed  extends  IDevOutput{	
	
	public enum LedColor{
		GREEN(0), RED(1);
		private int Value;  
		private LedColor(int Value) {
			this.Value = Value;
		}
		public int getValue() {
			return Value;
		}	
	} ;

  	public void doSwitch(); //non-primitive
  	public void turnOn(); // modifier
	public void turnOff(); // modifier
 	public boolean isOn(); //property	
	public void setDevImpl(IDeviceLedImpl ledImpl) throws Exception;	//injector 
}
