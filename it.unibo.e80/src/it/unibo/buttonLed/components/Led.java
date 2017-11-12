package it.unibo.buttonLed.components;
import it.unibo.is.interfaces.IOutputView;

/*
 * Towards UBIQUITOUS LANGUAGE
 * Led is the name of a logical, technology-independent Led
 */
public class Led  extends DevLed{
	public Led(String name, IOutputView outView) {
		super(name, outView);
 	}
}
