%====================================================================================
% Context ctxBlsCustom  SYSTEM-configuration: file it.unibo.ctxBlsCustom.blsCustom.pl 
%====================================================================================
context(ctxblscustom, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaledcustom , ctxblscustom, "it.unibo.qaledcustom.MsgHandle_Qaledcustom"   ). %%store msgs 
qactor( qaledcustom_ctrl , ctxblscustom, "it.unibo.qaledcustom.Qaledcustom"   ). %%control-driven 
qactor( qacontrolcustom , ctxblscustom, "it.unibo.qacontrolcustom.MsgHandle_Qacontrolcustom"   ). %%store msgs 
qactor( qacontrolcustom_ctrl , ctxblscustom, "it.unibo.qacontrolcustom.Qacontrolcustom"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxblscustom,"it.unibo.ctxBlsCustom.Evh","local_click").  
eventhandler(evconvert,ctxblscustom,"it.unibo.ctxBlsCustom.Evconvert","usercmd").  
%%% -------------------------------------------

