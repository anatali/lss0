%====================================================================================
% Context ctxReactiveActions  SYSTEM-configuration: file it.unibo.ctxReactiveActions.reactiveActions.pl 
%====================================================================================
context(ctxreactiveactions, "localhost",  "TCP", "8078" ).  		 
%%% -------------------------------------------
qactor( musicreactive , ctxreactiveactions, "it.unibo.musicreactive.MsgHandle_Musicreactive"   ). %%store msgs 
qactor( musicreactive_ctrl , ctxreactiveactions, "it.unibo.musicreactive.Musicreactive"   ). %%control-driven 
qactor( alarmemitter , ctxreactiveactions, "it.unibo.alarmemitter.MsgHandle_Alarmemitter"   ). %%store msgs 
qactor( alarmemitter_ctrl , ctxreactiveactions, "it.unibo.alarmemitter.Alarmemitter"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

