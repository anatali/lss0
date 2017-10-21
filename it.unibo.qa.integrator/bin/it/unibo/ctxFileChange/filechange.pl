%====================================================================================
% Context ctxFileChange  SYSTEM-configuration: file it.unibo.ctxFileChange.fileChange.pl 
%====================================================================================
context(ctxfilechange, "localhost",  "TCP", "8061" ).  		 
%%% -------------------------------------------
qactor( qafilechange , ctxfilechange, "it.unibo.qafilechange.MsgHandle_Qafilechange"   ). %%store msgs 
qactor( qafilechange_ctrl , ctxfilechange, "it.unibo.qafilechange.Qafilechange"   ). %%control-driven 
qactor( qafilechangehandler , ctxfilechange, "it.unibo.qafilechangehandler.MsgHandle_Qafilechangehandler"   ). %%store msgs 
qactor( qafilechangehandler_ctrl , ctxfilechange, "it.unibo.qafilechangehandler.Qafilechangehandler"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

