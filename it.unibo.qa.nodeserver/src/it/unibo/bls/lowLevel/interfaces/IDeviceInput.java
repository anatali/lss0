package it.unibo.bls.lowLevel.interfaces;
import it.unibo.iot.interfaces.IDeviceIot;
import it.unibo.is.interfaces.IObservable;

/*
 * -----------------------------------------------------------
 * This is a first model of a (IOT) Input Device:
 * an observable entity with a name and 
 * a default representation (expressed in Prolog syntax)
 * -----------------------------------------------------------
 */
public interface IDeviceInput extends IDeviceIot, IObservable{
}
