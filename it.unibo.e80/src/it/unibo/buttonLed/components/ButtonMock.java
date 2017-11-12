package it.unibo.buttonLed.components;

import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.is.interfaces.IOutputEnvView;
 
public class ButtonMock extends DeviceButtonImpl implements IButton {

	public ButtonMock( String name, IOutputEnvView outEnvView ) throws Exception{
		super(name, outEnvView);	 
	}

 }
