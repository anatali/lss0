package it.unibo.bls17.naive;

import java.awt.event.ActionEvent;
/*
 * An ActionLister that USES the given application logic
 */
public class ButtonListener extends ButtonListenerNaive {
private BlsApplicationLogic appLogic;
private String btnLabel;

	public ButtonListener(BlsApplicationLogic appLogic, String btnLabel){
		super();
		this.appLogic = appLogic;
		this.btnLabel = btnLabel;
	}
 	@Override
	public void actionPerformed(ActionEvent e) {
 		super.actionPerformed(e);
		String evCmd = e.getActionCommand();
		if( evCmd.equals(btnLabel)) appLogic.execute( evCmd );
   	}
}
