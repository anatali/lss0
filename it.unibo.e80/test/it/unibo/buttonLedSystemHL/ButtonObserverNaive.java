package it.unibo.buttonLedSystemHL;
import java.util.Observable;
import it.unibo.is.interfaces.IObserver;

public class ButtonObserverNaive implements IObserver{
private String curVal = null;
	@Override
	public void update(Observable source, Object state) {
		 System.out.println("ButtonObserverNaive update " + state);		
		 curVal = (String) state;
	}
	public String getCurVal(){
		return curVal;
	}
}