%====================================================================================
% Context ctxMbotControl  SYSTEM-configuration: file it.unibo.ctxMbotControl.mbotControl.pl 
%====================================================================================
context(ctxmbotcontrol, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qambotpc , ctxmbotcontrol, "it.unibo.qambotpc.MsgHandle_Qambotpc"   ). %%store msgs 
qactor( qambotpc_ctrl , ctxmbotcontrol, "it.unibo.qambotpc.Qambotpc"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

