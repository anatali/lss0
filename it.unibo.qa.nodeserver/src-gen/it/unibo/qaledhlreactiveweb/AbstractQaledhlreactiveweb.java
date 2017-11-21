/* Generated by AN DISI Unibo */ 
package it.unibo.qaledhlreactiveweb;
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
public abstract class AbstractQaledhlreactiveweb extends QActor { 
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
		public AbstractQaledhlreactiveweb(String actorId, QActorContext myCtx, IOutputEnvView outEnvView )  throws Exception{
			super(actorId, myCtx,  
			"./srcMore/it/unibo/qaledhlreactiveweb/WorldTheory.pl",
			setTheEnv( outEnvView )  , "init");		
			this.planFilePath = "./srcMore/it/unibo/qaledhlreactiveweb/plans.txt";
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
	    	stateTab.put("waitForCmd",waitForCmd);
	    	stateTab.put("doLedBlink",doLedBlink);
	    	stateTab.put("stopBlink",stopBlink);
	    	stateTab.put("endWork",endWork);
	    }
	    StateFun handleToutBuiltIn = () -> {	
	    	try{	
	    		PlanRepeat pr = PlanRepeat.setUp("handleTout",-1);
	    		String myselfName = "handleToutBuiltIn";  
	    		println( "qaledhlreactiveweb tout : stops");  
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
	    	if( (guardVars = QActorUtils.evalTheGuard(this, " !?config(led,X)" )) != null ){
	    	parg = "createLedObject(X)"; 
	    	parg = QActorUtils.substituteVars(guardVars,parg);
	    	actorOpExecute(parg, false);	//OCT17		 
	    	}
	    	//switchTo waitForCmd
	        switchToPlanAsNextState(pr, myselfName, "qaledhlreactiveweb_"+myselfName, 
	              "waitForCmd",false, false, null); 
	    }catch(Exception e_init){  
	    	 println( getName() + " plan=init WARNING:" + e_init.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//init
	    
	    StateFun waitForCmd = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp(getName()+"_waitForCmd",0);
	     pr.incNumIter(); 	
	    	String myselfName = "waitForCmd";  
	    	temporaryStr = "\"qaledhlreactiveweb WAITS\"";
	    	println( temporaryStr );  
	    	//bbb
	     msgTransition( pr,myselfName,"qaledhlreactiveweb_"+myselfName,false,
	          new StateFun[]{
	          () -> {	//AD HOC state to execute an action and resumeLastPlan
	          try{
	            PlanRepeat pr1 = PlanRepeat.setUp("adhocstate",-1);
	            //ActionSwitch for a message or event
	             if( currentEvent.getMsg().startsWith("cmd") ){
	            	/* SwitchTransition */
	            	String parg = "doLedBlink";
	            	parg =  updateVars( Term.createTerm("cmd(V)"), 
	            		                Term.createTerm("cmd(start)"), 
	            		                Term.createTerm(currentEvent.getMsg()), parg);
	            	if(parg != null){ 
	            		switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	            	    	 		    		parg,false, true, null); 
	            	    return;	
	            	    //the control is given to the caller state
	            	}
	             }
	            repeatPlanNoTransition(pr1,"adhocstate","adhocstate",false,true);
	          }catch(Exception e ){  
	             println( getName() + " plan=waitForCmd WARNING:" + e.getMessage() );
	             //QActorContext.terminateQActorSystem(this); 
	          }
	          }
	          },//new StateFun[]
	          new String[]{"true","E","cmd" },
	          3000000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_waitForCmd){  
	    	 println( getName() + " plan=waitForCmd WARNING:" + e_waitForCmd.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//waitForCmd
	    
	    StateFun doLedBlink = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("doLedBlink",-1);
	    	String myselfName = "doLedBlink";  
	    	temporaryStr = "\"qaledhlreactiveweb doLedBlink\"";
	    	println( temporaryStr );  
	    	parg = "setupLedBlink"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	Callable<String> body;
	    int ractionTimeOut=0;
	    ractionTimeOut = 30000;
	    body= new Callable<String>(){
	    	public String call() throws Exception {
	      				parg = "ledBlink"; 
	      				actorOpExecute(parg, false);	//OCT17		 
	    			return currentActionResult;
	    		}		
	    		}; 
	    		terminationEvId = QActorUtils.getNewName(IActorAction.endBuiltinEvent);
	    currentTimedAction = new ActorTimedAction("ra_"+terminationEvId,this,myCtx,body,false,
	    			terminationEvId, new String[]{}, outEnvView, ractionTimeOut	);
	    currentTimedAction.execASynch();
	      	//aaa
	    msgTransition( pr,myselfName,"qaledhlreactiveweb_"+myselfName,false,
	          new StateFun[]{stateTab.get( "endWork"),stateTab.get( "stopBlink")},
	          new String[]{"true","E",terminationEvId,"true","E","alarm"},
	          ractionTimeOut, "endWork" );
	    }catch(Exception e_doLedBlink){  
	    	 println( getName() + " plan=doLedBlink WARNING:" + e_doLedBlink.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//doLedBlink
	    
	    StateFun stopBlink = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("stopBlink",-1);
	    	String myselfName = "stopBlink";  
	    	temporaryStr = "\"qaledhlreactiveweb stopBlink\"";
	    	println( temporaryStr );  
	    	parg = "ledblinkstop"; 
	    	actorOpExecute(parg, false);	//OCT17		 
	    	//switchTo waitForCmd
	        switchToPlanAsNextState(pr, myselfName, "qaledhlreactiveweb_"+myselfName, 
	              "waitForCmd",false, false, null); 
	    }catch(Exception e_stopBlink){  
	    	 println( getName() + " plan=stopBlink WARNING:" + e_stopBlink.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//stopBlink
	    
	    StateFun endWork = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("endWork",-1);
	    	String myselfName = "endWork";  
	    	temporaryStr = "\"qaledhlreactive ends\"";
	    	println( temporaryStr );  
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(3000,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "endWork";
	    	if( ! aar.getGoon() ) return ;
	    	repeatPlanNoTransition(pr,myselfName,"qaledhlreactiveweb_"+myselfName,false,false);
	    }catch(Exception e_endWork){  
	    	 println( getName() + " plan=endWork WARNING:" + e_endWork.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//endWork
	    
	    protected void initSensorSystem(){
	    	//doing nothing in a QActor
	    }
	
	}