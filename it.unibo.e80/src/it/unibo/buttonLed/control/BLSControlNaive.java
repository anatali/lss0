package it.unibo.buttonLed.control;
import java.util.Observable;
import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.is.interfaces.IOutputView;
import it.unibo.system.SituatedPlainObject;

/*
 * ------------------------------------------------------------
 * input : Boolean or String( LOW/HIGH )
 * curInput : boolean
 * ------------------------------------------------------------
 */
public class BLSControlNaive extends SituatedPlainObject implements IBLSControl{
private IDeviceLedImpl led;
private boolean previousInput = false;
private boolean sodd = true;
 
	/*
	 * Constructor for low-level configuration
	 */
	public BLSControlNaive(IOutputView outView, IDeviceLedImpl led){
		super(outView);
		this.led = led;
	}
	/*
	 * Injection of the Led for high-level configuration
	 * not supported by a low-level control
	 */
 	public void setLed(IDevLed led){
// 		println("BLSControlNaive does not known high-level devices "   );
  	}
	@Override
	public void update(Observable arg0, Object input) {
 		println("BLSControlNaive update input= " + input );
		boolean curInput = false;
		if( input instanceof String )
			curInput =  input.equals( IDeviceButtonImpl.repHigh );
		else if( input instanceof Boolean )
			curInput = (Boolean) input;		
		elab(curInput);
  	}//update
	
	protected void elab(boolean curInput){
 		if( curInput &&  ! previousInput ){ //true follows a false (edge)
 	 		if( sodd ) led.turnOn(); 		//number of edged is odd (initial) 
 	 		else led.turnOff();
 	 		sodd = ! sodd;
 		}
 		previousInput = curInput;
	}
 }
