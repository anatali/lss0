package it.unibo.buttonLedSystem;

import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevButton;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.bls.lowLevel.interfaces.IButton;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.bls.lowLevel.interfaces.ILed;
import it.unibo.buttonLed.components.ButtonMock;
import it.unibo.buttonLed.components.DevButton;
import it.unibo.buttonLed.components.DevLed;
import it.unibo.buttonLed.components.LedMock;
import it.unibo.buttonLed.control.BLSControlFSM;
import it.unibo.buttonLed.control.BLSControlNaive;
import it.unibo.buttonLed.control.BLSControlSwitch;
import it.unibo.is.interfaces.IOutputEnvView;
  

public class BLSHLFactory {
	/*
	 * LOGICAL devices
	 */
	public static IDevLed createLogicalLed(String name, IOutputEnvView outEnvView) throws Exception{
		return new DevLed(name,outEnvView);
	}
	public static IDevButton createLogicalButton(String name, IOutputEnvView outEnvView) throws Exception{
		return new DevButton(name,outEnvView);
	}
	/*
	 * MOCK devices
	 */	
	public static IButton createButtonMock(String name, IOutputEnvView outEnvView) throws Exception{
		return new ButtonMock(name,outEnvView);
	}
	public static IDeviceLedImpl createLedMock(String name, IOutputEnvView outEnvView, LedColor color) throws Exception{
		return new LedMock(name,outEnvView,color);
	}
	/*
	 * Control
	 */
	public static IBLSControl createBlsControlNaive(IOutputEnvView outEnvView, IDeviceLedImpl led){
		return new BLSControlNaive(outEnvView,led); 
	}
	public static IBLSControl createBlsControlFSM(IOutputEnvView outEnvView ){
		return new BLSControlFSM(outEnvView ); 
	}
	public static IBLSControl createBlsControlSwitch(IOutputEnvView outEnvView ){  
		return new BLSControlSwitch(outEnvView); 
	}
	/*
	 * SYSTEM
	 */
	public static BLSHLMainMock createBLSHLDemoMock(IOutputEnvView outEnvView, IBLSControl control) throws Exception{
 		return new BLSHLMainMock(outEnvView,  control );
	}
//	public static BLSHLConfig createBLSHL(IOutputEnvView outEnvView, IButton button, IDevLed led, IBLSControl control) throws Exception{
//		return new BLSHLConfig(button, led, control, outEnvView  );
//	}
	
}
