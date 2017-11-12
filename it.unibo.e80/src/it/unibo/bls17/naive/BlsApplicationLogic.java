package it.unibo.bls17.naive;

 

public class BlsApplicationLogic {
	private ILed led;
	
	public BlsApplicationLogic(ILed led){
		this.led = led;
	}
	public void execute( String cmd ){
		System.out.println("BlsApplicationLogic " + cmd +" ledstate=" + led.getState());
		if( led.getState() ) led.turnOff();
		else led.turnOn();
	}
}
