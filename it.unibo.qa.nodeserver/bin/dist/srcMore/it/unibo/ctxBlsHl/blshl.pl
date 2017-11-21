%====================================================================================
% Context ctxBlsHl  SYSTEM-configuration: file it.unibo.ctxBlsHl.blshl.pl 
%====================================================================================
context(ctxblshl, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaledhl , ctxblshl, "it.unibo.qaledhl.MsgHandle_Qaledhl"   ). %%store msgs 
qactor( qaledhl_ctrl , ctxblshl, "it.unibo.qaledhl.Qaledhl"   ). %%control-driven 
qactor( qacontrolhl , ctxblshl, "it.unibo.qacontrolhl.MsgHandle_Qacontrolhl"   ). %%store msgs 
qactor( qacontrolhl_ctrl , ctxblshl, "it.unibo.qacontrolhl.Qacontrolhl"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evconvert,ctxblshl,"it.unibo.ctxBlsHl.Evconvert","usercmd").  
%%% -------------------------------------------

