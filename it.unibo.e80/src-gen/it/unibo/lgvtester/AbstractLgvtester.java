/* Generated by AN DISI Unibo */ 
package it.unibo.lgvtester;
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
public abstract class AbstractLgvtester extends QActor { 
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
		public AbstractLgvtester(String actorId, QActorContext myCtx, IOutputEnvView outEnvView )  throws Exception{
			super(actorId, myCtx,  
			"./srcMore/it/unibo/lgvtester/WorldTheory.pl",
			setTheEnv( outEnvView )  , "init");
			this.planFilePath = "./srcMore/it/unibo/lgvtester/plans.txt";
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
	    	stateTab.put("handleAnswer",handleAnswer);
	    	stateTab.put("simulatesmarttm",simulatesmarttm);
	    	stateTab.put("simulateaftersdm",simulateaftersdm);
	    }
	    StateFun handleToutBuiltIn = () -> {	
	    	try{	
	    		PlanRepeat pr = PlanRepeat.setUp("handleTout",-1);
	    		String myselfName = "handleToutBuiltIn";  
	    		println( "lgvtester tout : stops");  
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
	    	it.e80.customGui.createCustomGui( this ,"400", "30", "500", "white"  );
	    	temporaryStr = "\"lgvtester query for lgv0 ready\"";
	    	println( temporaryStr );  
	    	if( (guardVars = QActorUtils.evalTheGuard(this, " ??source(S)" )) != null ){
	    	temporaryStr = QActorUtils.unifyMsgContent(pengine,"lgvReady_2(SOURCE,LGV,V)","lgvReady_2(S,lgv0,query)", guardVars ).toString();
	    	sendMsg("lgvReady_2","lgv0", QActorContext.dispatch, temporaryStr ); 
	    	}
	    	//bbb
	     msgTransition( pr,myselfName,"lgvtester_"+myselfName,false,
	          new StateFun[]{stateTab.get("handleAnswer") },//new StateFun[]
	          new String[]{"true","M","lgvReady_2" },
	          600000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_init){  
	    	 println( getName() + " plan=init WARNING:" + e_init.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//init
	    
	    StateFun handleAnswer = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("handleAnswer",-1);
	    	String myselfName = "handleAnswer";  
	    	printCurrentMessage(false);
	    	temporaryStr = "\"lgvtester handleAnswer\"";
	    	println( temporaryStr );  
	    	//onMsg 
	    	setCurrentMsgFromStore(); 
	    	curT = Term.createTerm("lgvReady_2(SOURCE,lgv0,false)");
	    	if( currentMessage != null && currentMessage.msgId().equals("lgvReady_2") && 
	    		pengine.unify(curT, Term.createTerm("lgvReady_2(SOURCE,LGV,V)")) && 
	    		pengine.unify(curT, Term.createTerm( currentMessage.msgContent() ) )){ 
	    		String parg = "\"DEVICE NOT READY\"";
	    		/* Print */
	    		parg =  updateVars( Term.createTerm("lgvReady_2(SOURCE,LGV,V)"), 
	    		                    Term.createTerm("lgvReady_2(SOURCE,lgv0,false)"), 
	    			    		  	Term.createTerm(currentMessage.msgContent()), parg);
	    		if( parg != null ) println( parg );
	    	}
	    	//onMsg 
	    	setCurrentMsgFromStore(); 
	    	curT = Term.createTerm("lgvReady_2(SOURCE,lgv0,true)");
	    	if( currentMessage != null && currentMessage.msgId().equals("lgvReady_2") && 
	    		pengine.unify(curT, Term.createTerm("lgvReady_2(SOURCE,LGV,V)")) && 
	    		pengine.unify(curT, Term.createTerm( currentMessage.msgContent() ) )){ 
	    		/* SwitchTransition */
	    		String parg = "simulatesmarttm";
	    		parg =  updateVars( Term.createTerm("lgvReady_2(SOURCE,LGV,V)"), 
	    			                Term.createTerm("lgvReady_2(SOURCE,lgv0,true)"), 
	    			                Term.createTerm(currentMessage.msgContent()), parg);
	    		if(parg != null){ 
	    			switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	    		    	 		    		parg,false, true, null); 
	    		    return;	
	    		    //the control is given to the caller state
	    		}
	    	}
	    	//bbb
	     msgTransition( pr,myselfName,"lgvtester_"+myselfName,false,
	          new StateFun[]{stateTab.get("handleAnswer") },//new StateFun[]
	          new String[]{"true","M","lgvReady_2" },
	          600000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_handleAnswer){  
	    	 println( getName() + " plan=handleAnswer WARNING:" + e_handleAnswer.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//handleAnswer
	    
	    StateFun simulatesmarttm = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("simulatesmarttm",-1);
	    	String myselfName = "simulatesmarttm";  
	    	temporaryStr = "\"lgvtester lgvMoveLoad\"";
	    	println( temporaryStr );  
	    	temporaryStr = QActorUtils.unifyMsgContent(pengine,"lgvMoveLoad_3cmd(LGV,SOURCE)","lgvMoveLoad_3cmd(lgv0,s1)", guardVars ).toString();
	    	sendMsg("lgvMoveLoad_3cmd","lgv0", QActorContext.dispatch, temporaryStr ); 
	    	//bbb
	     msgTransition( pr,myselfName,"lgvtester_"+myselfName,false,
	          new StateFun[]{
	          () -> {	//AD HOC state to execute an action and resumeLastPlan
	          try{
	            PlanRepeat pr1 = PlanRepeat.setUp("adhocstate",-1);
	            //ActionSwitch for a message or event
	             if( currentMessage.msgContent().startsWith("lgvLoaded_3a") ){
	            	/* SwitchTransition */
	            	String parg = "simulateaftersdm";
	            	parg =  updateVars( Term.createTerm("lgvLoaded_3a(LGV,SOURCE,MATERIAL)"), 
	            		                Term.createTerm("lgvLoaded_3a(LGV,SOURCE,M)"), 
	            		                Term.createTerm(currentMessage.msgContent()), parg);
	            	if(parg != null){ 
	            		switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	            	    	 		    		parg,false, true, null); 
	            	    return;	
	            	    //the control is given to the caller state
	            	}
	             }
	            repeatPlanNoTransition(pr1,"adhocstate","adhocstate",false,true);
	          }catch(Exception e ){  
	             println( getName() + " plan=simulatesmarttm WARNING:" + e.getMessage() );
	             //QActorContext.terminateQActorSystem(this); 
	          }
	          }
	          },//new StateFun[]
	          new String[]{"true","M","lgvLoaded_3a" },
	          600000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_simulatesmarttm){  
	    	 println( getName() + " plan=simulatesmarttm WARNING:" + e_simulatesmarttm.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//simulatesmarttm
	    
	    StateFun simulateaftersdm = () -> {	
	    try{	
	     PlanRepeat pr = PlanRepeat.setUp("simulateaftersdm",-1);
	    	String myselfName = "simulateaftersdm";  
	    	temporaryStr = "\"lgvtester lgvMoveWhareh\"";
	    	println( temporaryStr );  
	    	temporaryStr = QActorUtils.unifyMsgContent(pengine,"lgvMoveWhareh_7cmd(LGV,SOURCE,DEST)","lgvMoveWhareh_7cmd(lgv0,s1,cell1)", guardVars ).toString();
	    	sendMsg("lgvMoveWhareh_7cmd","lgv0", QActorContext.dispatch, temporaryStr ); 
	    	//bbb
	     msgTransition( pr,myselfName,"lgvtester_"+myselfName,false,
	          new StateFun[]{
	          () -> {	//AD HOC state to execute an action and resumeLastPlan
	          try{
	            PlanRepeat pr1 = PlanRepeat.setUp("adhocstate",-1);
	            //ActionSwitch for a message or event
	             if( currentMessage.msgContent().startsWith("lgvStore_7a") ){
	            	/* SwitchTransition */
	            	String parg = "init";
	            	parg =  updateVars( Term.createTerm("lgvStore_7a(LGV,SOURCE,MATERIAL,RESULT)"), 
	            		                Term.createTerm("lgvStore_7a(LGV,SOURCE,M,R)"), 
	            		                Term.createTerm(currentMessage.msgContent()), parg);
	            	if(parg != null){ 
	            		switchToPlanAsNextState(pr, myselfName, "console_"+myselfName, 
	            	    	 		    		parg,false, true, null); 
	            	    return;	
	            	    //the control is given to the caller state
	            	}
	             }
	            repeatPlanNoTransition(pr1,"adhocstate","adhocstate",false,true);
	          }catch(Exception e ){  
	             println( getName() + " plan=simulateaftersdm WARNING:" + e.getMessage() );
	             //QActorContext.terminateQActorSystem(this); 
	          }
	          }
	          },//new StateFun[]
	          new String[]{"true","M","lgvStore_7a" },
	          600000, "handleToutBuiltIn" );//msgTransition
	    }catch(Exception e_simulateaftersdm){  
	    	 println( getName() + " plan=simulateaftersdm WARNING:" + e_simulateaftersdm.getMessage() );
	    	 QActorContext.terminateQActorSystem(this); 
	    }
	    };//simulateaftersdm
	    
	    protected void initSensorSystem(){
	    	//doing nothing in a QActor
	    }
	
	}