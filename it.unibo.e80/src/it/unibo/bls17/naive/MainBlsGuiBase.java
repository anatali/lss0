package it.unibo.bls17.naive;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.Frame;
/*
 * -----------------------------------------------------------
 * A ButtonLed system built in a (JAVA) technology-dependent way
 * -----------------------------------------------------------
 */
public class MainBlsGuiBase  {
	private Frame frame ;
	private ButtonListener buttonListener ; 
 	private IButton btn;
 	private ILed led;
 	private BorderLayout layout = new BorderLayout();
 	private final String btnLabel = "LEDSWITCH";
 	
 	public static MainBlsGuiBase createTheSystem(){
 		return new MainBlsGuiBase();
 	}
 	
 	protected MainBlsGuiBase( ) {
		initFrame();
		createComponents();
 	}	
	
	public ButtonListener getActionListener(){
		return buttonListener;
	}
	public IButton getButton(){
		return btn;
	}
	public ILed getLed(){
		return led;
	}
	public String getCmd(){
		return btnLabel;
	}
	
 	protected void createComponents(){
  		//Create Led
 		led = LedWithGui.createLed( frame );
 		//Create the application logic
 		BlsApplicationLogic applLogic = new BlsApplicationLogic(led);
 		//Create Button
		buttonListener = new ButtonListener( applLogic, btnLabel ); 
		btn            = ButtonWithGui.createButton(frame, btnLabel, buttonListener);
 		led.turnOff();
	}
 	
 	public void initFrame(){
 		frame = new Frame();
 		frame.setSize( new Dimension(400,200) );
 		frame.setLayout(layout);		
 		frame.addWindowListener(new WindowListener() {			
			@Override
			public void windowOpened(WindowEvent e) {}				
			@Override
			public void windowIconified(WindowEvent e) {}
			@Override
			public void windowDeiconified(WindowEvent e) {}
			@Override
			public void windowDeactivated(WindowEvent e) {}
			@Override
			public void windowClosing(WindowEvent e) {
				System.exit(0);				
			}			
			@Override
			public void windowClosed(WindowEvent e) {}
			@Override
			public void windowActivated(WindowEvent e) {}
		}); 	
		frame.setVisible(true);
 	}
 	

	public static void main(String[] args) {
		createTheSystem();
 	}
}

 