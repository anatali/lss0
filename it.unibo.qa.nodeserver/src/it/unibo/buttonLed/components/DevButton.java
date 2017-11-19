package it.unibo.buttonLed.components;

import java.util.Observable;
import it.unibo.bls.highLevel.interfaces.IDevButton;
import it.unibo.bls.lowLevel.interfaces.IDeviceInputImpl;
import it.unibo.buttonLedSystem.BLSHLConfig;
import it.unibo.is.interfaces.IOutputView;
import it.unibo.system.SituatedPlainObject;

public class DevButton extends SituatedPlainObject implements IDevButton {    
protected IDeviceInputImpl  concreteButton;

public DevButton( String name, IOutputView outView ){ 
	super(name,outView);
}

public void setDevImpl(IDeviceInputImpl  buttonImpl){
	this.concreteButton = buttonImpl;
	buttonImpl.addObserver(this);
}
	@Override
	public int getInput() throws Exception {
		return concreteButton.getInput();
	}
	@Override
	public boolean isPressed()   {
 		try {
 			int von = Integer.parseInt(BLSHLConfig.on);
			return concreteButton.getInput() == von;
		} catch (Exception e) {
 			e.printStackTrace();
 			return false;
		}
	}
	@Override
	public synchronized void update(Observable source, Object cmd) {
		println("DevButton update " + cmd);
 		this.setChanged();	//!!!!
		this.notifyObservers( cmd );
	}
	@Override
	public String getDefaultRep() {
// 		return concreteButton.getDefaultRep();
		String s = "devbutton("+this.name+",pressed("+ isPressed() +"))";
		return s;
	}	
}