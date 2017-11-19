package it.unibo.custom.gui;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import it.unibo.qactors.akka.QActor;

public class CustomBlsGui {
public static final boolean ledGuiOn  = true;
public static final boolean ledGuiOff = false;
private static final Dimension smallGui = new Dimension(20, 20);
private static final Dimension largeGui = new Dimension(50, 50);

private static CustomBlsGui curBlsGui = null;

	private QActor myActor;
    private JFrame frm       = new JFrame();
    private JPanel pnl       = new JPanel();
    private JButton btnGui   = new JButton("Click");
    private JPanel ledGui    = new JPanel();
    private int count        = 1;    
    
    //Factory methods
    public static synchronized CustomBlsGui createCustomBlsGui(QActor myActor) {
    	if( curBlsGui == null ) curBlsGui = new CustomBlsGui(myActor);
    	return curBlsGui;
    }
    public static synchronized CustomBlsGui createCustomLedGui(QActor myActor) {
    	return new CustomBlsGui(myActor, "led");
     }
    public static synchronized CustomBlsGui createCustomButtonGui(QActor myActor) {
    	return new CustomBlsGui(myActor, "button");
     }
    /*
     * CONSTRUCTORS
     */
    public  CustomBlsGui(QActor myActor) {
    	this.myActor = myActor;
    	initAll();
    }
    public  CustomBlsGui(QActor myActor, String device) {
    	this.myActor = myActor;
    	if( device == "led") initLedGui();
    	else if( device == "button") initButtonGui();
    }
    
    protected void initAll() {
    	initFrame("all");
       	System.out.println("CustomBlsGui initAll done   "    );
    }
    
    protected void initFrame(String device) {
         if( device == "button") {
            pnl.setPreferredSize(new Dimension(140, 100));
        	pnl.add( btnGui, BorderLayout.SOUTH);
            frm.setLocation(150, 100);
        }
        else if( device == "led") {
            pnl.setPreferredSize(new Dimension(140, 100));
        	pnl.add( ledGui, BorderLayout.NORTH); 
            frm.setLocation(350, 100);
        }
        else if( device == "all")  {
            pnl.add(btnGui, BorderLayout.SOUTH);
            pnl.add( ledGui, BorderLayout.NORTH);        	
            frm.setLocation(350, 100);
        }
        frm.add(pnl, BorderLayout.CENTER);
        frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // EDIT
        frm.setResizable(false);
        frm.pack();
        frm.setVisible(true);
       	System.out.println("CustomBlsGui init done for " + device  );   	
    }
    
    protected void initButtonGui() {
    	initFrame("button");
        btnGui.setPreferredSize(new Dimension(100, 40));
        btnGui.addActionListener(new ActionListener() {
             @Override
            public void actionPerformed(ActionEvent e) {
                //System.out.println("actionPerformed " + e.getActionCommand());
                if(myActor!=null) myActor.emit("local_click", "clicked("+count++ +")");
            }
        });    	
    }
    
    protected void initLedGui() {
       	initFrame("led");
       	ledGui.setBackground(Color.RED);
       	ledGui.setPreferredSize(smallGui);
       	setLedGui(ledGuiOff); 	
    }
    
    public void setLedGui(boolean on) {
     	System.out.println("CustomBlsGui setLedGui " + on);
    	if(on) ledGui.setSize(largeGui);
    	else ledGui.setSize(smallGui);
    	ledGui.repaint();
    }
    

    /*
     * Just to test	  
     */    
    public static void main(String[] args) throws InterruptedException {
    	CustomBlsGui blsGui = new CustomBlsGui(null);
    	for( int i=1; i<=3; i++) {
			Thread.sleep(1000);
			blsGui.setLedGui(ledGuiOn);
			Thread.sleep(1000);
			blsGui.setLedGui(ledGuiOff);
    	}
    }
}    
/*
preferences / java / editor / content assist / advanded. 
Only check in first and second list the option: - Java Proposals
*/