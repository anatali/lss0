/* Generated by AN DISI Unibo */ 
package it.unibo.ctxBlsHl;
import it.unibo.qactors.QActorContext;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;
public class MainCtxBlsHl  {
  
//MAIN
public static QActorContext initTheContext() throws Exception{
	IOutputEnvView outEnvView = SituatedSysKb.standardOutEnvView;
	String webDir = "./srcMore/it/unibo/ctxBlsHl";
	return QActorContext.initQActorSystem(
		"ctxblshl", "./srcMore/it/unibo/ctxBlsHl/blshl.pl", 
		"./srcMore/it/unibo/ctxBlsHl/sysRules.pl", outEnvView,webDir,false);
}
public static void main(String[] args) throws Exception{
	QActorContext ctx = initTheContext();
} 	
}