package it.unibo.buttonLedSystem.gui.components;
import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.is.interfaces.IBasicUniboEnv;

import java.awt.Panel;

public interface IDeviceButtonGui extends IButton {
	public Panel getPanel();		//property
	public IBasicUniboEnv getEnv();	//property
}
