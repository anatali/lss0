package it.unibo.buttonLedSystem.gui.components;
import it.unibo.bls.lowLevel.interfaces.ILed;
import it.unibo.is.interfaces.IBasicUniboEnv;
import java.awt.Panel;

public interface IDeviceLedGui extends ILed{
	public Panel getPanel();		//property
	public IBasicUniboEnv getEnv();	//property
}
