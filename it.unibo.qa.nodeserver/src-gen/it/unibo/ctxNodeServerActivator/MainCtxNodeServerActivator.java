/* Generated by AN DISI Unibo */ 
package it.unibo.ctxNodeServerActivator;
import it.unibo.qactors.QActorContext;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;
public class MainCtxNodeServerActivator  {
  
//MAIN
public static QActorContext initTheContext() throws Exception{
	IOutputEnvView outEnvView = SituatedSysKb.standardOutEnvView;
	String webDir = null;
	return QActorContext.initQActorSystem(
		"ctxnodeserveractivator", "./srcMore/it/unibo/ctxNodeServerActivator/nodeserveractivator.pl", 
		"./srcMore/it/unibo/ctxNodeServerActivator/sysRules.pl", outEnvView,webDir,false);
}
public static void main(String[] args) throws Exception{
	QActorContext ctx = initTheContext();
} 	
}
