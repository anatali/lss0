package it.unibo.bls17.naive;

import java.awt.BorderLayout;
import java.awt.Frame;
import java.awt.event.ActionListener;
 

/*
 * A Button that USES a java.awt.Button into a given a Frame  
 * and that adds to itself a given ActionListener
 */
public class ButtonWithGui extends java.awt.Button implements IButton{
private static final long serialVersionUID = 1L;

	public static IButton createButton(Frame frame, String label, ActionListener listener) {
		return new ButtonWithGui(frame, label,listener);	
 	}

	public ButtonWithGui(Frame frame, String label,  ActionListener listener){
		super(label);
		this.addActionListener(  listener );
		frame.add(BorderLayout.WEST,this); 
		frame.validate();
	}
	
}

