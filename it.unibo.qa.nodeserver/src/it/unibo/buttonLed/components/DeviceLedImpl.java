package it.unibo.buttonLed.components;

import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.bls.lowLevel.interfaces.ILed;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedPlainObject;

public class DeviceLedImpl extends SituatedPlainObject implements ILed{
private boolean on = false;
protected LedColor color;

	public DeviceLedImpl( String name, IOutputEnvView outEnvView, LedColor color) throws Exception{
		super(name, outEnvView);
		this.color=color;
		configure();
 	}
	public DeviceLedImpl( String defaltRep ) throws Exception{
		throw new Exception("Not yet implemented");
	}
	protected void configure() throws Exception{
		if( color == LedColor.RED || color == LedColor.GREEN){
			turnOff();
		}else throw new Exception("a led can be only RED or GREEN");			
//		System.out.println("DeviceLedImpl configure done"  );
	}
	@Override
	public void doSwitch() {
		 if( on ) turnOff();
		 else turnOn();
	}
	@Override
	public void turnOn() {
//		println("LED  turnOn " + isOn() ) ;
		on = true;	
		show();
 	}
	@Override
	public void turnOff() {
//		println("LED  turnOff " + isOn() ) ;
		on = false;		
		show();
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
   		return "device(led("+this.name+")," + ledLedColor + ","+ isOn() +")";
 	}
	@Override
	public String getName() {
		return name;
	}
	/*
	 * Do nothing at the moment
	 */
	protected void show(){	println("DeviceLedImpl LED:" + isOn() ) ; }
}
