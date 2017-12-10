%====================================================================================
% Context ctxE80Lgv  SYSTEM-configuration: file it.unibo.ctxE80Lgv.e80Lgv.pl 
%====================================================================================
context(ctxe80lgv, "localhost",  "TCP", "8023" ).  		 
%%% -------------------------------------------
qactor( lgv0 , ctxe80lgv, "it.unibo.lgv0.MsgHandle_Lgv0"   ). %%store msgs 
qactor( lgv0_ctrl , ctxe80lgv, "it.unibo.lgv0.Lgv0"   ). %%control-driven 
qactor( lgvtester , ctxe80lgv, "it.unibo.lgvtester.MsgHandle_Lgvtester"   ). %%store msgs 
qactor( lgvtester_ctrl , ctxe80lgv, "it.unibo.lgvtester.Lgvtester"   ). %%control-driven 
qactor( lgvtester1 , ctxe80lgv, "it.unibo.lgvtester1.MsgHandle_Lgvtester1"   ). %%store msgs 
qactor( lgvtester1_ctrl , ctxe80lgv, "it.unibo.lgvtester1.Lgvtester1"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

