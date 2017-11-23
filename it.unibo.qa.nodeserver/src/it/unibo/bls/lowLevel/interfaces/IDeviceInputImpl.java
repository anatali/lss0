package it.unibo.bls.lowLevel.interfaces;
import it.unibo.iot.interfaces.IDeviceIot;
import it.unibo.is.interfaces.IObservable;
import it.unibo.is.interfaces.IObserver;

public interface IDeviceInputImpl extends IDeviceIot, IObserver, IObservable{
	public int getInput() ; 
}
