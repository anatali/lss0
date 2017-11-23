package it.unibo.bls.highLevel.interfaces;
import it.unibo.is.interfaces.IObserver;

public interface IBLSControl extends IObserver{	
	public void setLed(IDevLed led);
}