package it.unibo.buttonLedSystem.gui.components;

import java.awt.Color;
import java.awt.Panel;
import it.unibo.baseEnv.basicFrame.EnvFrame;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.buttonLed.components.DeviceButtonImpl;
import it.unibo.is.interfaces.IBasicEnvAwt;
import it.unibo.is.interfaces.IOutputEnvView;
 
public class DeviceButtonGui extends DeviceButtonImpl implements IDeviceButtonGui {
protected IBasicEnvAwt env;
protected String[] cmd;
protected Panel cmdPanel;

	public DeviceButtonGui(String name, IOutputEnvView outEnvView, String[] cmd) {
		super( name, outEnvView);
		this.env = outEnvView.getEnv();
		this.cmd = cmd;
		configure();
	}
	protected void configure() {
		cmdPanel =  env.addCmdPanel("", cmd, this);
	}
	@Override
	public Panel getPanel(){
		return cmdPanel;
	}
	/*
	 * API for debugging
 	 */
 	@Override
	public void high() {
 		if( ! buttonPressed ){
			buttonPressed  = true;
			execAction(IDeviceButtonImpl.repSwitch);
 		}else execAction(IDeviceButtonImpl.repHigh);
  	}
	@Override
	public void low() {
		if(  buttonPressed ){
			buttonPressed  = false;
			execAction(IDeviceButtonImpl.repSwitch);
		}else execAction(IDeviceButtonImpl.repLow);
 	}
	/*
	 * --------------------------------------
	 * Main (rapid check)
	 * --------------------------------------
	 */
	public static void main(String args[]) throws Exception {
		IBasicEnvAwt env = new EnvFrame("DevButtonGui", Color.white, Color.BLACK);
		env.init();
 		new DeviceButtonGui("b0", env.getOutputEnvView() ,   new String[] { repSwitch }  );
	}

}
