/* Generated by AN DISI Unibo */ 
package it.unibo.qahttpclient;
import it.unibo.qactors.PlanRepeat;
import it.unibo.qactors.QActorContext;
import it.unibo.qactors.StateExecMessage;
import it.unibo.qactors.QActorUtils;
import it.unibo.is.interfaces.IOutputEnvView;
import it.unibo.qactors.action.AsynchActionResult;
import it.unibo.qactors.action.IActorAction;
import it.unibo.qactors.action.IActorAction.ActionExecMode;
import it.unibo.qactors.action.IMsgQueue;
import it.unibo.qactors.akka.QActor;
import it.unibo.qactors.StateFun;
import java.util.Stack;
import java.util.Hashtable;
import java.util.concurrent.Callable;
import alice.tuprolog.Struct;
import alice.tuprolog.Term;
import it.unibo.qactors.action.ActorTimedAction;
public abstract class AbstractQahttpclient extends QActor { 
	protected AsynchActionResult aar = null;
	protected boolean actionResult = true;
	protected alice.tuprolog.SolveInfo sol;
	protected String planFilePath    = null;
	protected String terminationEvId = "default";
	protected String parg="";
	protected boolean bres=false;
	protected IActorAction action;
	 
	
		protected static IOutputEnvView setTheEnv(IOutputEnvView outEnvView ){
			return outEnvView;
		}
		public AbstractQahttpclient(String actorId, QActorContext myCtx, IOutputEnvView outEnvView )  throws Exception{
			super(actorId, myCtx,  
			"./srcMore/it/unibo/qahttpclient/WorldTheory.pl",
			setTheEnv( outEnvView )  , "init");
			this.planFilePath = "./srcMore/it/unibo/qahttpclient/plans.txt";
	  	}
		@Override
		protected void doJob() throws Exception {
			String name  = getName().replace("_ctrl", "");
			mysupport = (IMsgQueue) QActorUtils.getQActor( name ); 
			initStateTable(); 
	 		initSensorSystem();
	 		history.push(stateTab.get( "init" ));
	  	 	autoSendStateExecMsg();
	  		//QActorContext.terminateQActorSystem(this);//todo
		} 	
		/* 
		* ------------------------------------------------------------
		* PLANS
		* ------------------------------------------------------------
		*/    
	    //genAkkaMshHandleStructure
	    protected void initStateTable(){  	
	    	stateTab.put("handleToutBuiltIn",handleToutBuiltIn);
	    	stateTab.put("init",init);
	    	stateTab.put("interactWithWotServer",interactWithWotServer);
	    	stateTab.put("interactWithAServer",interactWithAServer);
	    	stateTab.put("interactWithRestServer",interactWithRestServer);
	    	stateTab.put("putData",putData);
	    }
	    StateFun handleToutBuiltIn = () -> {	
	    	try{	
	    		PlanRepeat pr = PlanRepeat.setUp("handleTout",-1);
	    		String myselfName = "handleToutBuiltIn";  
	    		println( "qahttpclient tout : stops");  
	    		repeatPlanNoTransition(pr,myselfName,"application_"+myselfName,false,false);
	    	}catch(Exception e_handleToutBuiltIn){  
	    		println( getName() + " plan=handleToutBuiltIn WARNING:" + e_handleToutBuiltIn.getMessage() );
	    		QActorContext.terminateQActorSystem(this); 
	    	}
	    };//handleToutBuiltIn
	    
	    StateFun init = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("init",-1);
	    	String myselfName = "init";  
	    	parg = "noOp"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//switchTo interactWithAServer
	        switchToPlanAsNextState(pr, myselfName, "qahttpclient_"+myselfName, 
	              "interactWithAServer",false, false, null); 
	    }catch(Exception e_init){  
	    	 println( getName() + " plan=init WARNING:" + e_init.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//init
	    
	    StateFun interactWithWotServer = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("interactWithWotServer",-1);
	    	String myselfName = "interactWithWotServer";  
	    	parg = "sendGet(\"http://localhost:8484/pi/actuators/leds\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(400,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "interactWithWotServer";
	    	if( ! aar.getGoon() ) return ;
	    	parg = "sendPut(\"{%value%:%true%}\",\"http://localhost:8484/pi/actuators/leds/1\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(400,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "interactWithWotServer";
	    	if( ! aar.getGoon() ) return ;
	    	parg = "sendGet(\"http://localhost:8484/pi/actuators/leds\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(400,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "interactWithWotServer";
	    	if( ! aar.getGoon() ) return ;
	    	parg = "sendPut(\"{%value%:%true%}\",\"http://localhost:8484/pi/actuators/leds/2\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(400,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "interactWithWotServer";
	    	if( ! aar.getGoon() ) return ;
	    	parg = "sendGet(\"http://localhost:8484/pi/actuators/leds\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	repeatPlanNoTransition(pr,myselfName,"qahttpclient_"+myselfName,false,false);
	    }catch(Exception e_interactWithWotServer){  
	    	 println( getName() + " plan=interactWithWotServer WARNING:" + e_interactWithWotServer.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//interactWithWotServer
	    
	    StateFun interactWithAServer = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("interactWithAServer",-1);
	    	String myselfName = "interactWithAServer";  
	    	parg = "sendPut(\"a\",\"http://localhost:8080\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(1000,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "interactWithAServer";
	    	if( ! aar.getGoon() ) return ;
	    	parg = "sendGet(\"http://localhost:8080\")"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	repeatPlanNoTransition(pr,myselfName,"qahttpclient_"+myselfName,false,false);
	    }catch(Exception e_interactWithAServer){  
	    	 println( getName() + " plan=interactWithAServer WARNING:" + e_interactWithAServer.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//interactWithAServer
	    
	    StateFun interactWithRestServer = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp(getName()+"_interactWithRestServer",0);
	     pr.incNumIter(); 	
	    	String myselfName = "interactWithRestServer";  
	    	parg = "sendGet"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	if( (guardVars = QActorUtils.evalTheGuard(this, " not !?data(X)" )) != null )
	    	{
	    	println( "qahttpclient ends" ); 
	    	pr.terminate(); return;
	    	}
	    	//switchTo putData
	        switchToPlanAsNextState(pr, myselfName, "qahttpclient_"+myselfName, 
	              "putData",true, false, " !?data(X)"); 
	    }catch(Exception e_interactWithRestServer){  
	    	 println( getName() + " plan=interactWithRestServer WARNING:" + e_interactWithRestServer.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//interactWithRestServer
	    
	    StateFun putData = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp(getName()+"_putData",0);
	     pr.incNumIter(); 	
	    	String myselfName = "putData";  
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(500,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "putData";
	    	if( ! aar.getGoon() ) return ;
	    	if( (guardVars = QActorUtils.evalTheGuard(this, " ??data(X)" )) != null ){
	    	parg = "sendPut(X)"; 
	    	parg = QActorUtils.substituteVars(guardVars,parg);
	    	actorOpExecute(parg, false);	//OCT17		 
	    	}
	    	else{ println( "no more data" ); 
	    	pr.terminate(); return;
	    	}
	    	repeatPlanNoTransition(pr,myselfName,"qahttpclient_"+myselfName,true,true);
	    }catch(Exception e_putData){  
	    	 println( getName() + " plan=putData WARNING:" + e_putData.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//putData
	    
	    protected void initSensorSystem(){
	    	//doing nothing in a QActor
	    }
	
	}
