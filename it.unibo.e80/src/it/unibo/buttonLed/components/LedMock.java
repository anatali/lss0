package it.unibo.buttonLed.components;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.is.interfaces.IOutputEnvView;
 
public class LedMock extends DeviceLedImpl{
	public LedMock( String name, IOutputEnvView outEnvView, LedColor color) throws Exception{
		super(name,outEnvView,color);
	}
	public LedMock(String defaltRep) throws Exception {
		super(defaltRep);
 	}
	protected void show(){	
		this.println( this.getDefaultRep() );
	}
}
