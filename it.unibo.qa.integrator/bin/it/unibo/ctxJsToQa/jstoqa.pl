%====================================================================================
% Context ctxJsToQa  SYSTEM-configuration: file it.unibo.ctxJsToQa.jsToQa.pl 
%====================================================================================
context(ctxjstoqa, "localhost",  "TCP", "8031" ).  		 
%%% -------------------------------------------
qactor( qajaactoivator , ctxjstoqa, "it.unibo.qajaactoivator.MsgHandle_Qajaactoivator"   ). %%store msgs 
qactor( qajaactoivator_ctrl , ctxjstoqa, "it.unibo.qajaactoivator.Qajaactoivator"   ). %%control-driven 
qactor( qareceiver , ctxjstoqa, "it.unibo.qareceiver.MsgHandle_Qareceiver"   ). %%store msgs 
qactor( qareceiver_ctrl , ctxjstoqa, "it.unibo.qareceiver.Qareceiver"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxjstoqa,"it.unibo.ctxJsToQa.Evh","alarm").  
%%% -------------------------------------------

