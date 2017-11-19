package it.unibo.buttonLed.components;

import java.util.Observable;
import it.unibo.is.interfaces.IOutputView;
import it.unibo.qactors.akka.QActor;

public class DevButtonQa extends DevButton {    
private  QActor myActor; 
private int count = 1;    

public DevButtonQa( String name, IOutputView outView, QActor qa ){ 
	super(name,outView);
	this.myActor = qa;
}

	@Override
	public synchronized void update(Observable source, Object cmd) {
		super.update( source,   cmd);
		if(myActor!=null) myActor.emit("local_click", "clicked("+count++ +")");
 	}
}