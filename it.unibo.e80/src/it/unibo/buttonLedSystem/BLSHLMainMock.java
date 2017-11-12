package it.unibo.buttonLedSystem;

import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;

public class BLSHLMainMock extends BLSHLConfig{
	
 	public BLSHLMainMock( IOutputEnvView outEnvView)  {
		this(outEnvView, null);
	}
 	public BLSHLMainMock(IOutputEnvView outEnvView, IBLSControl control)  {
		super(outEnvView);
		this.control = control;
		try {
			initThesystem();
		} catch (Exception e) {
 			e.printStackTrace();
		}
	}
 	protected void initThesystem() throws Exception  {
 		concreteButton  = BLSHLFactory.createButtonMock("bt",outEnvView);
 		concreteLed     = BLSHLFactory.createLedMock("led", outEnvView, LedColor.GREEN);
//		if( control == null )  control = BLSHLFactory.createBlsControlSwitch(outEnvView);
		createTheLogicElements(concreteButton, concreteLed, control);
 	}

	protected void simulate() throws Exception{
 		for(int i=1; i<=5;i++){
			System.out.println("BUTTON high " + i);
 			concreteButton.high();
			Thread.sleep(100);
			System.out.println("BUTTON low " + i);
			concreteButton.low();
			Thread.sleep(100);						
		}		
	}

	public static void main(String args[]) throws Exception {
 		BLSHLMainMock sys = new BLSHLMainMock( SituatedSysKb.standardOutEnvView );		 
		sys.simulate();
	}

}
