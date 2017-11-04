%====================================================================================
% Context ctxBls0  SYSTEM-configuration: file it.unibo.ctxBls0.bls0.pl 
%====================================================================================
context(ctxbls0, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qabls0cmdhandler , ctxbls0, "it.unibo.qabls0cmdhandler.MsgHandle_Qabls0cmdhandler"   ). %%store msgs 
qactor( qabls0cmdhandler_ctrl , ctxbls0, "it.unibo.qabls0cmdhandler.Qabls0cmdhandler"   ). %%control-driven 
qactor( qabls0led , ctxbls0, "it.unibo.qabls0led.MsgHandle_Qabls0led"   ). %%store msgs 
qactor( qabls0led_ctrl , ctxbls0, "it.unibo.qabls0led.Qabls0led"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

