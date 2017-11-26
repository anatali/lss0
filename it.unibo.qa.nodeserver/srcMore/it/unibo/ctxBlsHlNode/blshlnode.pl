%====================================================================================
% Context ctxBlsHlNode  SYSTEM-configuration: file it.unibo.ctxBlsHlNode.blsHlNode.pl 
%====================================================================================
context(ctxblshlnode, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaledhlnode , ctxblshlnode, "it.unibo.qaledhlnode.MsgHandle_Qaledhlnode"   ). %%store msgs 
qactor( qaledhlnode_ctrl , ctxblshlnode, "it.unibo.qaledhlnode.Qaledhlnode"   ). %%control-driven 
qactor( qacontrolhlnode , ctxblshlnode, "it.unibo.qacontrolhlnode.MsgHandle_Qacontrolhlnode"   ). %%store msgs 
qactor( qacontrolhlnode_ctrl , ctxblshlnode, "it.unibo.qacontrolhlnode.Qacontrolhlnode"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxblshlnode,"it.unibo.ctxBlsHlNode.Evh","local_click").  
eventhandler(evconvert,ctxblshlnode,"it.unibo.ctxBlsHlNode.Evconvert","usercmd").  
%%% -------------------------------------------

