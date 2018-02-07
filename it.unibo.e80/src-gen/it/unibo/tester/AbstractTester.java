/* Generated by AN DISI Unibo */ 
package it.unibo.tester;
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
public abstract class AbstractTester extends QActor { 
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
		public AbstractTester(String actorId, QActorContext myCtx, IOutputEnvView outEnvView )  throws Exception{
			super(actorId, myCtx,  
			"./srcMore/it/unibo/tester/WorldTheory.pl",
			setTheEnv( outEnvView )  , "init");
			this.planFilePath = "./srcMore/it/unibo/tester/plans.txt";
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
	    	stateTab.put("dowork",dowork);
	    	stateTab.put("handleAnswer",handleAnswer);
	    	stateTab.put("storageBusy",storageBusy);
	    }
	    StateFun handleToutBuiltIn = () -> {	
	    	try{	
	    		PlanRepeat pr = PlanRepeat.setUp("handleTout",-1);
	    		String myselfName = "handleToutBuiltIn";  
	    		println( "tester tout : stops");  
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
	    	//switchTo dowork
	        switchToPlanAsNextState(pr, myselfName, "tester_"+myselfName, 
	              "dowork",false, false, null); 
	    }catch(Exception e_init){  
	    	 println( getName() + " plan=init WARNING:" + e_init.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//init
	    
	    StateFun dowork = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("dowork",-1);
	    	String myselfName = "dowork";  
	    	//delay  ( no more reactive within a plan)
	    	aar = delayReactive(500,"" , "");
	    	if( aar.getInterrupted() ) curPlanInExec   = "dowork";
	    	if( ! aar.getGoon() ) return ;
	    	if( (guardVars = QActorUtils.evalTheGuard(this, " !?material(M)" )) != null ){
	    	temporaryStr = "\"		tester SENDS\"";
	    	temporaryStr = QActorUtils.substituteVars(guardVars,temporaryStr);
	    	println( temporaryStr );  
	    	}
	    	else{ temporaryStr = "\"		tester NO MORE TO SEND\"";
	    	temporaryStr = QActorUtils.substituteVars(guardVars,temporaryStr);
	    	println( temporaryStr );  
	    	}if( (guardVars = QActorUtils.evalTheGuard(this, " ??material(M)" )) != null ){
	    	temporaryStr = QActorUtils.unifyMsgContent(pengine, "cmd(store,M)","cmd(store,M)", guardVars ).toString();
	    	emit( "store", temporaryStr );
	    	}
	    	//bbb
	     msgTransition( pr,myselfName,"tester_"+myselfName,false,
	          new StateFun[]{stateTab.get("handleAnswer") },//new StateFun[]
	          new String[]{"true","E","storeResult" },
	          600000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_dowork){  
	    	 println( getName() + " plan=dowork WARNING:" + e_dowork.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//dowork
	    
	    StateFun handleAnswer = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("handleAnswer",-1);
	    	String myselfName = "handleAnswer";  
	    	printCurrentEvent(false);
	    	//onEvent 
	    	setCurrentMsgFromStore(); 
	    	curT = Term.createTerm("cmd(storeResult,booked)");
	    	if( currentEvent != null && currentEvent.getEventId().equals("storeResult") && 
	    		pengine.unify(curT, Term.createTerm("cmd(storeResult,R)")) && 
	    		pengine.unify(curT, Term.createTerm( currentEvent.getMsg() ) )){ 
	    			/* SwitchTransition */
	    			String parg = "dowork";
	    			parg =  updateVars( Term.createTerm("cmd(storeResult,R)"), 
	    				                Term.createTerm("cmd(storeResult,booked)"), 
	    				                Term.createTerm(currentEvent.getMsg()), parg);
	    			if(parg != null){ 
	    				switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	    			    	 		    		parg,false, true, null); 
	    			    return;	
	    			    //the control is given to the caller state
	    			}
	    	}
	    	//onEvent 
	    	setCurrentMsgFromStore(); 
	    	curT = Term.createTerm("cmd(storeResult,busy)");
	    	if( currentEvent != null && currentEvent.getEventId().equals("storeResult") && 
	    		pengine.unify(curT, Term.createTerm("cmd(storeResult,R)")) && 
	    		pengine.unify(curT, Term.createTerm( currentEvent.getMsg() ) )){ 
	    			/* SwitchTransition */
	    			String parg = "storageBusy";
	    			parg =  updateVars( Term.createTerm("cmd(storeResult,R)"), 
	    				                Term.createTerm("cmd(storeResult,busy)"), 
	    				                Term.createTerm(currentEvent.getMsg()), parg);
	    			if(parg != null){ 
	    				switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	    			    	 		    		parg,false, true, null); 
	    			    return;	
	    			    //the control is given to the caller state
	    			}
	    	}
	    	//onEvent 
	    	setCurrentMsgFromStore(); 
	    	curT = Term.createTerm("cmd(storeResult,space)");
	    	if( currentEvent != null && currentEvent.getEventId().equals("storeResult") && 
	    		pengine.unify(curT, Term.createTerm("cmd(storeResult,R)")) && 
	    		pengine.unify(curT, Term.createTerm( currentEvent.getMsg() ) )){ 
	    			/* SwitchTransition */
	    			String parg = "dowork";
	    			parg =  updateVars( Term.createTerm("cmd(storeResult,R)"), 
	    				                Term.createTerm("cmd(storeResult,space)"), 
	    				                Term.createTerm(currentEvent.getMsg()), parg);
	    			if(parg != null){ 
	    				switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	    			    	 		    		parg,false, true, null); 
	    			    return;	
	    			    //the control is given to the caller state
	    			}
	    	}
	    	repeatPlanNoTransition(pr,myselfName,"tester_"+myselfName,false,false);
	    }catch(Exception e_handleAnswer){  
	    	 println( getName() + " plan=handleAnswer WARNING:" + e_handleAnswer.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//handleAnswer
	    
	    StateFun storageBusy = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("storageBusy",-1);
	    	String myselfName = "storageBusy";  
	    	temporaryStr = "\"			tester waits for storeResult(space) ...\"";
	    	println( temporaryStr );  
	    	//bbb
	     msgTransition( pr,myselfName,"tester_"+myselfName,false,
	          new StateFun[]{
	          () -> {	//AD HOC state to execute an action and resumeLastPlan
	          try{
	            PlanRepeat pr1 = PlanRepeat.setUp("adhocstate",-1);
	            //ActionSwitch for a message or event
	             if( currentEvent.getMsg().startsWith("cmd") ){
	            	/* SwitchTransition */
	            	String parg = "dowork";
	            	parg =  updateVars( Term.createTerm("cmd(storeResult,R)"), 
	            		                Term.createTerm("cmd(storeResult,space)"), 
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
	             println( getName() + " plan=storageBusy WARNING:" + e.getMessage() );
	             //QActorContext.terminateQActorSystem(this); 
	          }
	          }
	          },//new StateFun[]
	          new String[]{"true","E","storeResult" },
	          600000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_storageBusy){  
	    	 println( getName() + " plan=storageBusy WARNING:" + e_storageBusy.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//storageBusy
	    
	    protected void initSensorSystem(){
	    	//doing nothing in a QActor
	    }
	
	}