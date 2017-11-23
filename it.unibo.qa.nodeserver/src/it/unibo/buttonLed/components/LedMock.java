package it.unibo.buttonLed.components;

import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.bls.lowLevel.interfaces.ILed;

public class LedMock  implements ILed{
private boolean on = false;
private String name;
protected LedColor color;

	public LedMock( String name, LedColor color) throws Exception{
		this.name = "led("+name+")";
		if( color == LedColor.RED || color == LedColor.GREEN)
			this.color=color;
		else throw new Exception("a led can be only RED or GREEN");		
	}
	public LedMock( String defaltRep ) throws Exception{
		throw new Exception("Not yet implemented");
	}
	@Override
	public void doSwitch() {
		 if( isOn() ) turnOff();
		 else turnOn();
	}
	@Override
	public void turnOn() {
		on = true;		
	}
	@Override
	public void turnOff() {
		on = false;		
	}
	@Override
	public LedColor getLedColor() {
		return color;
	}
	@Override
	public boolean isOn() {
		return on;
	}
	@Override
 	public String getDefaultRep() { 		
 		String ledLedColor = getLedColor()==LedColor.RED ? "RED" : "GREEN";
   		return "device("+this.name+"," + ledLedColor + ","+ isOn() +")";
 	}
	@Override
	public String getName() {
		return name;
	}
}
