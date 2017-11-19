%====================================================================================
% Context ctxBlsHlBlimk  SYSTEM-configuration: file it.unibo.ctxBlsHlBlimk.blshlBlink.pl 
%====================================================================================
context(ctxblshlblimk, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaledhl , ctxblshlblimk, "it.unibo.qaledhl.MsgHandle_Qaledhl"   ). %%store msgs 
qactor( qaledhl_ctrl , ctxblshlblimk, "it.unibo.qaledhl.Qaledhl"   ). %%control-driven 
qactor( qacontrolhlblink , ctxblshlblimk, "it.unibo.qacontrolhlblink.MsgHandle_Qacontrolhlblink"   ). %%store msgs 
qactor( qacontrolhlblink_ctrl , ctxblshlblimk, "it.unibo.qacontrolhlblink.Qacontrolhlblink"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evconvert,ctxblshlblimk,"it.unibo.ctxBlsHlBlimk.Evconvert","usercmd").  
%%% -------------------------------------------

