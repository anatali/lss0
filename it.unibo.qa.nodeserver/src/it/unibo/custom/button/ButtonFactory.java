package it.unibo.custom.button;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import it.unibo.qactors.akka.QActor;

public class ButtonFactory {
protected static int n = 0;

	public static void createButtonWithGui( String btnName, QActor qa ) {
    	//qa.println("createButtonWithGui " + btnName  );
    	JButton btnGui   = new JButton(btnName);
       	initFrame("button", btnName, btnGui);
        btnGui.setPreferredSize(new Dimension(100, 40));
        btnGui.addActionListener(new ActionListener() {
             @Override
            public void actionPerformed(ActionEvent e) {
                //qa.println("CustomBlsGui actionPerformed " + e.getActionCommand() + " myActor=" + qa.getName());
                if(qa!=null) qa.emit("local_click", "clicked( \""+ n++ +"\" )");
            }
        });    	
 	}
	
    protected static void initFrame(String device, String devanme, JButton btnGui ) {
          JFrame frm       = new JFrame();
          JPanel pnl       = new JPanel();
          pnl.setPreferredSize(new Dimension(140, 100));
       	  pnl.add( btnGui, BorderLayout.SOUTH);
          frm.setLocation(150, 100);
          frm.add(pnl, BorderLayout.CENTER);
          frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  
          frm.setResizable(false);
          frm.pack();
          frm.setVisible(true);
    }
	
}
