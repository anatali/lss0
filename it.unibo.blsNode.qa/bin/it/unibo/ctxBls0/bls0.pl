%====================================================================================
% Context ctxBls0  SYSTEM-configuration: file it.unibo.ctxBls0.bls0.pl 
%====================================================================================
context(ctxbls0, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qabls0led , ctxbls0, "it.unibo.qabls0led.MsgHandle_Qabls0led"   ). %%store msgs 
qactor( qabls0led_ctrl , ctxbls0, "it.unibo.qabls0led.Qabls0led"   ). %%control-driven 
qactor( qabls0client , ctxbls0, "it.unibo.qabls0client.MsgHandle_Qabls0client"   ). %%store msgs 
qactor( qabls0client_ctrl , ctxbls0, "it.unibo.qabls0client.Qabls0client"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

