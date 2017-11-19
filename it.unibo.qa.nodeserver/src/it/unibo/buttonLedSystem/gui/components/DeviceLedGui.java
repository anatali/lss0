package it.unibo.buttonLedSystem.gui.components;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.buttonLed.components.DeviceLedImpl;
import it.unibo.is.interfaces.IBasicEnvAwt;
import it.unibo.is.interfaces.IOutputEnvView;
import java.awt.Color; 
import java.awt.Panel;
 
public class DeviceLedGui extends DeviceLedImpl implements IDeviceLedGui{
protected Panel p = null;
protected Panel container = null;

	public DeviceLedGui( String name, IOutputEnvView outEnvView, LedColor color ) throws Exception{
		super( name, outEnvView, color  );
		myconfigure();
   	}	
	public DeviceLedGui( String name, IOutputEnvView outEnvView, Panel container, LedColor color ) throws Exception{
		super( name, outEnvView, color  );
		this.container = container;
		myconfigure();
   	}	
	protected void myconfigure() throws Exception{
 		IBasicEnvAwt env  = outEnvView.getEnv(); //get the environment from the given view
		if( env == null) throw new Exception("no gui environment found");
 		p= new Panel();
		if( color == LedColor.GREEN) p.setBackground(Color.green);
		else p.setBackground(Color.red);
		p.validate();
		if(container != null ){
			container.add(p);
		}else{
	 		env.addPanel(p);			
		}
  		turnOff();
	}	
	protected void configure() throws Exception{
		//At the moment do nothing, since container should not be set
	}
	@Override
 	@SuppressWarnings("deprecation")
	protected void show(  ){	
 		if( p == null ) return;
		if( this.isOn() ){
			p.resize(15, 15);
		}
		else p.resize(5, 5);
		p.validate();
	}
	@Override
	public Panel getPanel() {
 		return p;
	}
}