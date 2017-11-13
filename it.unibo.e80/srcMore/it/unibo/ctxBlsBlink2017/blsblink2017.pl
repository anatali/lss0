%====================================================================================
% Context ctxBlsBlink2017  SYSTEM-configuration: file it.unibo.ctxBlsBlink2017.blsBlink2017.pl 
%====================================================================================
context(ctxblsblink2017, "localhost",  "TCP", "8030" ).  		 
%%% -------------------------------------------
qactor( ledblink , ctxblsblink2017, "it.unibo.ledblink.MsgHandle_Ledblink"   ). %%store msgs 
qactor( ledblink_ctrl , ctxblsblink2017, "it.unibo.ledblink.Ledblink"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

