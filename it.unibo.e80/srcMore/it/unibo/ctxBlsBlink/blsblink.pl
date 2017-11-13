%====================================================================================
% Context ctxBlsBlink  SYSTEM-configuration: file it.unibo.ctxBlsBlink.blsBlink.pl 
%====================================================================================
context(ctxblsblink, "localhost",  "TCP", "8030" ).  		 
%%% -------------------------------------------
qactor( ledblink , ctxblsblink, "it.unibo.ledblink.MsgHandle_Ledblink"   ). %%store msgs 
qactor( ledblink_ctrl , ctxblsblink, "it.unibo.ledblink.Ledblink"   ). %%control-driven 
qactor( cmdemitter , ctxblsblink, "it.unibo.cmdemitter.MsgHandle_Cmdemitter"   ). %%store msgs 
qactor( cmdemitter_ctrl , ctxblsblink, "it.unibo.cmdemitter.Cmdemitter"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

