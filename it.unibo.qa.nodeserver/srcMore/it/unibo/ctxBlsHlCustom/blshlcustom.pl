%====================================================================================
% Context ctxBlsHlCustom  SYSTEM-configuration: file it.unibo.ctxBlsHlCustom.blshlCustom.pl 
%====================================================================================
context(ctxblshlcustom, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaledhlcustom , ctxblshlcustom, "it.unibo.qaledhlcustom.MsgHandle_Qaledhlcustom"   ). %%store msgs 
qactor( qaledhlcustom_ctrl , ctxblshlcustom, "it.unibo.qaledhlcustom.Qaledhlcustom"   ). %%control-driven 
qactor( qacontrolhlcustom , ctxblshlcustom, "it.unibo.qacontrolhlcustom.MsgHandle_Qacontrolhlcustom"   ). %%store msgs 
qactor( qacontrolhlcustom_ctrl , ctxblshlcustom, "it.unibo.qacontrolhlcustom.Qacontrolhlcustom"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evconvert,ctxblshlcustom,"it.unibo.ctxBlsHlCustom.Evconvert","usercmd").  
%%% -------------------------------------------

