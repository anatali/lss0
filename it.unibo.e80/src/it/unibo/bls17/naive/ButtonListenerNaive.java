package it.unibo.bls17.naive;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
 
/*
 * ----------------------------------------------------------------
 * GOAL: an ActionListener that keeps track of the last event
* ----------------------------------------------------------------
 */
public class ButtonListenerNaive implements ActionListener {
private int count = 0;
private ActionEvent curEvent = null;
 
 	public String convertTime(long time){
	    Date date = new Date(time);
	    Format format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	    return format.format(date);
	}
	@Override
	public void actionPerformed(ActionEvent e) {
		curEvent = e;
		count++;
 	 	System.out.println("actionPerformed " + e.getActionCommand() + " id=" + e.getID() + " from:" + e.getSource());
	 	System.out.println("actionPerformed " + convertTime(e.getWhen()));
    }
	
	public int getNumOfClicks(){
		return count;
	}
	public ActionEvent getLastEvent(){
		return curEvent;
	}	
}
