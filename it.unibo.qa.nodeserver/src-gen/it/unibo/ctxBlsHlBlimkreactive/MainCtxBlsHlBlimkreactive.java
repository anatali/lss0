/* Generated by AN DISI Unibo */ 
package it.unibo.ctxBlsHlBlimkreactive;
import it.unibo.qactors.QActorContext;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;
public class MainCtxBlsHlBlimkreactive  {
  
//MAIN
public static QActorContext initTheContext() throws Exception{
	IOutputEnvView outEnvView = SituatedSysKb.standardOutEnvView;
	String webDir = "./srcMore/it/unibo/ctxBlsHlBlimkreactive";
	return QActorContext.initQActorSystem(
		"ctxblshlblimkreactive", "./srcMore/it/unibo/ctxBlsHlBlimkreactive/blshlblinkreactive.pl", 
		"./srcMore/it/unibo/ctxBlsHlBlimkreactive/sysRules.pl", outEnvView,webDir,false);
}
public static void main(String[] args) throws Exception{
	QActorContext ctx = initTheContext();
} 	
}
