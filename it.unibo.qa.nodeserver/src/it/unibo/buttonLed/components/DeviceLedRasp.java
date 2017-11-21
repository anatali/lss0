package it.unibo.buttonLed.components;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import it.unibo.bls.highLevel.interfaces.IDevLed.LedColor;
import it.unibo.is.interfaces.IOutputEnvView;

public class DeviceLedRasp extends DeviceLedImpl {
	protected BufferedReader readerC;
 	protected PrintWriter processWriter = null;
	public DeviceLedRasp(String name, IOutputEnvView outEnvView, LedColor color) throws Exception {
		super(name, outEnvView, color);
		setUpLedSupport();
 	}

	protected void setUpLedSupport() {
		try {
			println("setUpLedSupport (in C) "    );
			Process p = Runtime.getRuntime().exec("sudo ./Led");
			println("setUpLedSupport (in C) p= "  + p );
//			readerC   = new BufferedReader(new java.io.InputStreamReader(p.getInputStream()));			
			OutputStream outSupport = p.getOutputStream();
			processWriter = new PrintWriter(outSupport);
			println("setUpLedSupport (in C) STARTED "  + outSupport );
		} catch (Exception e) {
				e.printStackTrace();
		}				
	}
	
	protected void show(){	
		try {
			println("show " + processWriter );
			if( processWriter == null ) return;
			String outS = this.isOn() ? "1\n" : "0\n";
			println("show " + outS );
			processWriter.write( outS );
//			processWriter.write( "\n" );
			processWriter.flush();
		} catch (Exception e) {
 			e.printStackTrace();
		}
	}
 
	
}
