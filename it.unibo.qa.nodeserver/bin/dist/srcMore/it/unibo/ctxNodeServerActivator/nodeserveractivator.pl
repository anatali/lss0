%====================================================================================
% Context ctxNodeServerActivator  SYSTEM-configuration: file it.unibo.ctxNodeServerActivator.nodeServerActivator.pl 
%====================================================================================
context(ctxnodeserveractivator, "localhost",  "TCP", "8071" ).  		 
%%% -------------------------------------------
qactor( qaserveractivator , ctxnodeserveractivator, "it.unibo.qaserveractivator.MsgHandle_Qaserveractivator"   ). %%store msgs 
qactor( qaserveractivator_ctrl , ctxnodeserveractivator, "it.unibo.qaserveractivator.Qaserveractivator"   ). %%control-driven 
qactor( qaservercmds , ctxnodeserveractivator, "it.unibo.qaservercmds.MsgHandle_Qaservercmds"   ). %%store msgs 
qactor( qaservercmds_ctrl , ctxnodeserveractivator, "it.unibo.qaservercmds.Qaservercmds"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxnodeserveractivator,"it.unibo.ctxNodeServerActivator.Evh","usercmd").  
%%% -------------------------------------------

