package it.unibo.buttonLed.components;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.is.interfaces.IOutputView;
import it.unibo.system.SituatedPlainObject;
   
public class DevLed  extends SituatedPlainObject implements IDevLed{
protected IDeviceLedImpl  concreteLed;

	public DevLed( String name, IOutputView outView  ){
		super(name,outView);
 	}
	@Override
	public void turnOn() {
		concreteLed.turnOn();
 	}
	@Override
	public void turnOff() {
		concreteLed.turnOff();
 	}
	@Override
	public boolean isOn() {
 		return concreteLed.isOn();
	}
	@Override
	public void doSwitch() {
		concreteLed.doSwitch();		
	} 	 
	@Override
	public String getDefaultRep() {
 		return concreteLed.getDefaultRep();
	}
	@Override
	public void setDevImpl( IDeviceLedImpl ledImpl ) throws Exception{
		this.concreteLed = ledImpl;
  	}	
}
