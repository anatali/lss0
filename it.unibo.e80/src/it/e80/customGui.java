package it.e80;

import java.awt.Color;
import java.util.Hashtable;
import it.unibo.baseEnv.basicFrame.EnvFrame;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.qactors.akka.QActor;
 

public class customGui {
      
private static Hashtable<QActor,EnvFrame> guiTab  = new Hashtable<QActor,EnvFrame>();
    

	public static void createCustomGui( QActor qa, String size, String posx, String posy, String color  ) {
 		if(  guiTab.get(qa) != null ) return;		
 		Color colorgui = getColor(color);
		EnvFrame frm = setTheEnv( qa, Integer.parseInt(size), Integer.parseInt(posx) , Integer.parseInt(posy) ,  colorgui );
		guiTab.put(qa, frm);
	}
	
 	protected static Color getColor(String color) {
 		if( color.equals("cyan")) return Color.cyan;
		if( color.equals("green")) return Color.green;
		if( color.equals("yellow")) return Color.yellow;
		if( color.equals("gray")) return Color.lightGray;
		if( color.equals("pink")) return Color.pink;
		return Color.white;
 	}
	protected static EnvFrame setTheEnv(QActor qa, int size, int px, int py,Color colorgui ){
		EnvFrame env = new EnvFrame( qa.getName().replace("_ctrl", ""), colorgui  , Color.black );
		env.init();
		env.setSize(size+(size/2),size); 
		env.setLocation(py, py );
		IOutputEnvView newOutEnvView = ((EnvFrame) env).getOutputEnvView();
		qa.setOutEnvView( newOutEnvView );
		return env;
 	}
	
}
