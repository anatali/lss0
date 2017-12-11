%====================================================================================
% Context ctxE80CaseStudy  SYSTEM-configuration: file it.unibo.ctxE80CaseStudy.e80CaseStudy.pl 
%====================================================================================
context(ctxe80casestudy, "localhost",  "TCP", "8023" ).  		 
%%% -------------------------------------------
qactor( sourcehandler , ctxe80casestudy, "it.unibo.sourcehandler.MsgHandle_Sourcehandler"   ). %%store msgs 
qactor( sourcehandler_ctrl , ctxe80casestudy, "it.unibo.sourcehandler.Sourcehandler"   ). %%control-driven 
qactor( lgvman , ctxe80casestudy, "it.unibo.lgvman.MsgHandle_Lgvman"   ). %%store msgs 
qactor( lgvman_ctrl , ctxe80casestudy, "it.unibo.lgvman.Lgvman"   ). %%control-driven 
qactor( smarttm , ctxe80casestudy, "it.unibo.smarttm.MsgHandle_Smarttm"   ). %%store msgs 
qactor( smarttm_ctrl , ctxe80casestudy, "it.unibo.smarttm.Smarttm"   ). %%control-driven 
qactor( sdm , ctxe80casestudy, "it.unibo.sdm.MsgHandle_Sdm"   ). %%store msgs 
qactor( sdm_ctrl , ctxe80casestudy, "it.unibo.sdm.Sdm"   ). %%control-driven 
qactor( lgv , ctxe80casestudy, "it.unibo.lgv.MsgHandle_Lgv"   ). %%store msgs 
qactor( lgv_ctrl , ctxe80casestudy, "it.unibo.lgv.Lgv"   ). %%control-driven 
qactor( plant , ctxe80casestudy, "it.unibo.plant.MsgHandle_Plant"   ). %%store msgs 
qactor( plant_ctrl , ctxe80casestudy, "it.unibo.plant.Plant"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxe80casestudy,"it.unibo.ctxE80CaseStudy.Evh","sourceEngaged").  
eventhandler(evh1,ctxe80casestudy,"it.unibo.ctxE80CaseStudy.Evh1","userCmd").  
%%% -------------------------------------------

