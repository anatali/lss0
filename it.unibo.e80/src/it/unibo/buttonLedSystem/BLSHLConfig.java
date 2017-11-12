package it.unibo.buttonLedSystem;
import it.unibo.bls.highLevel.interfaces.IBLSControl;
import it.unibo.bls.highLevel.interfaces.IDevButton;
import it.unibo.bls.highLevel.interfaces.IDevLed;
import it.unibo.bls.lowLevel.interfaces.IDeviceButtonImpl;
import it.unibo.bls.lowLevel.interfaces.IDeviceLedImpl;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedPlainObject;
 

/*
 * =======================================================================
 * Build a LOGIC BLS system given three concrete devices 
 * =======================================================================
 */
public class BLSHLConfig extends SituatedPlainObject{
	/*
	 * Messages  
	 */
	public final static String on  = "1";
	public final static String off = "0"; 

//Concrete devices	
	protected IDeviceLedImpl concreteLed;
	protected IDeviceButtonImpl concreteButton;	
//Logic devices		
	protected IDevButton logicalButton ;
	protected IDevLed logicalLed ;
//Control
	protected IBLSControl control;

 	public BLSHLConfig(IOutputEnvView outEnvView)  {
		super(outEnvView);
	}
 	public BLSHLConfig(IDeviceButtonImpl button, IDeviceLedImpl led, IBLSControl control, IOutputEnvView outEnvView)  {
		super(outEnvView);
		this.concreteButton  = button;
		this.concreteLed     = led;
		this.control         = control;
		createTheLogicElements(concreteButton,concreteLed,control);
	}
	
	public IDeviceButtonImpl getConcreteButton(){
		return concreteButton;
	}
	public IDeviceLedImpl getConcreteLed(){
		return concreteLed;
	}	
	public IDevButton getButton(){
		return logicalButton;
	}
	public IDevLed getLed(){
		return logicalLed;
	}
	public IBLSControl getController(){
		return control;
	}	
   	protected void createTheLogicElements(IDeviceButtonImpl concreteButton, IDeviceLedImpl concreteLed, IBLSControl controller){
		try{
	 	 	logicalButton  = BLSHLFactory.createLogicalButton("devBtn",outEnvView);
 		 	logicalButton.setDevImpl(concreteButton);	 
// 		 	concreteButton.addObserver(logicalButton);
 		 	logicalLed     = BLSHLFactory.createLogicalLed("devLed",outEnvView);
 		 	logicalLed.setDevImpl( concreteLed );
 		 	if( controller == null ) controller = 
 		 			BLSHLFactory.createBlsControlNaive(outEnvView, concreteLed);
 		 	controller.setLed(logicalLed);
 		 	logicalButton.addObserver(controller);
 		 }catch(Exception e){
			println("BLSHLConfig ERROR " + e.getMessage());
		}	 		
	}
	
}
