/* Generated by AN DISI Unibo */ 
package it.unibo.ctxBlsHlNode;
import it.unibo.qactors.QActorContext;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.system.SituatedSysKb;
public class MainCtxBlsHlNode  {
  
//MAIN
public static QActorContext initTheContext() throws Exception{
	IOutputEnvView outEnvView = SituatedSysKb.standardOutEnvView;
	String webDir = "./srcMore/it/unibo/ctxBlsHlNode";
	return QActorContext.initQActorSystem(
		"ctxblshlnode", "./srcMore/it/unibo/ctxBlsHlNode/blshlnode.pl", 
		"./srcMore/it/unibo/ctxBlsHlNode/sysRules.pl", outEnvView,webDir,false);
}
public static void main(String[] args) throws Exception{
	QActorContext ctx = initTheContext();
} 	
}