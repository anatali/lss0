package it.unibo.buttonLed.control;
import java.util.Observable;
import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedPlainObject;

/*
 * ------------------------------------------------------------
 * input : Click
 * 
 * ------------------------------------------------------------
 */
public class BLSControlSwitch extends SituatedPlainObject implements IBLSControl{
protected IDevLed led;
protected boolean sodd = true;
 
 	public BLSControlSwitch( IOutputEnvView outEnvView ){
		super(outEnvView);
 	}
   	public void setLed(IDevLed led){
 		this.led = led;
 	}
	@Override
	public void update(Observable arg0, Object input) {
		println("BLSControlSwitch update input=" + input + " sodd=" + sodd );
    	if( sodd ) led.turnOn(); 		 
 	 	else led.turnOff();
 	 	sodd = ! sodd;
 	}
 }
