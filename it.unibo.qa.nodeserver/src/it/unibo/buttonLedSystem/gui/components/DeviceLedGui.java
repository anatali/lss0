package it.unibo.buttonLedSystem.gui.components;
import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.buttonLed.components.DeviceLedImpl;
import it.unibo.is.interfaces.IBasicEnvAwt;
import it.unibo.is.interfaces.IOutputEnvView;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Panel;
import javax.swing.JFrame;
import javax.swing.JPanel;
 
public class DeviceLedGui extends DeviceLedImpl implements IDeviceLedGui{
protected Panel p = null;
protected JPanel container = null;
protected final Dimension smallGui = new Dimension(20, 20);
protected final Dimension largeGui = new Dimension(50, 50);

	public DeviceLedGui( String name, IOutputEnvView outEnvView, LedColor color ) throws Exception{
		super( name, outEnvView, color  );
		myconfigure();
   	}	
	
	 
	protected void myconfigure() throws Exception{
  		configure();
 		IBasicEnvAwt env  = outEnvView.getEnv(); //get the environment from the given view
		if( env == null) container = createAdHocFrame();//throw new Exception("no gui environment found");
 		p = new Panel();
 		p.setPreferredSize(smallGui);
		if( color == LedColor.GREEN) p.setBackground(Color.green);
		else p.setBackground(Color.red);
 		if(container != null ){
			container.add(p);
		}else{
	 		env.addPanel(p);			
		}
 	}	
 
	protected JPanel createAdHocFrame() {
		  JFrame frm       = new JFrame();
		  JPanel pnl       = new JPanel();
            pnl.setPreferredSize(smallGui);
	        frm.add(pnl, BorderLayout.CENTER);
	        frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  
	        frm.setResizable(false);
	        frm.pack();
	        frm.setVisible(true);
	        frm.setSize(200, 100);
            frm.setLocation(350, 100);
 	        return pnl;
 	}

	@Override
 	protected void show(  ){	
 		if( p == null ) return;
		if( this.isOn() ){
 			p.setSize(largeGui);
		}
		else p.setSize(smallGui);
		p.validate();
	}
		
	@Override
	public Panel getPanel() {
 		return p;
	}

}