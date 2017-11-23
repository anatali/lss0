package it.unibo.bls.highLevel.interfaces;
import it.unibo.bls.lowLevel.interfaces.IDeviceInputImpl;
import it.unibo.iot.interfaces.IDeviceIot;
import it.unibo.is.interfaces.IObservable;
import it.unibo.is.interfaces.IObserver;
 
public interface IDevInput extends IDeviceIot, IObserver, IObservable{
	public void setDevImpl(IDeviceInputImpl  buttonImpl);	//injector
	public int getInput() throws Exception; 
}
