/* Generated by AN DISI Unibo */ 
package it.unibo.ctxReactiveActions;
import it.unibo.qactors.QActorContext;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;
public class MainCtxReactiveActions  {
  
//MAIN
public static QActorContext initTheContext() throws Exception{
	IOutputEnvView outEnvView = SituatedSysKb.standardOutEnvView;
	String webDir = null;
	return QActorContext.initQActorSystem(
		"ctxreactiveactions", "./srcMore/it/unibo/ctxReactiveActions/qaactions.pl", 
		"./srcMore/it/unibo/ctxReactiveActions/sysRules.pl", outEnvView,webDir,false);
}
public static void main(String[] args) throws Exception{
	QActorContext ctx = initTheContext();
} 	
}
