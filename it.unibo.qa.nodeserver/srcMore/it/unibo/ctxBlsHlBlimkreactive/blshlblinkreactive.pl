%====================================================================================
% Context ctxBlsHlBlimkreactive  SYSTEM-configuration: file it.unibo.ctxBlsHlBlimkreactive.blsHlBlinkReactive.pl 
%====================================================================================
context(ctxblshlblimkreactive, "localhost",  "TCP", "8059" ).  		 
%%% -------------------------------------------
qactor( qaledhlreactive , ctxblshlblimkreactive, "it.unibo.qaledhlreactive.MsgHandle_Qaledhlreactive"   ). %%store msgs 
qactor( qaledhlreactive_ctrl , ctxblshlblimkreactive, "it.unibo.qaledhlreactive.Qaledhlreactive"   ). %%control-driven 
qactor( qacontrolhlblinkreactive , ctxblshlblimkreactive, "it.unibo.qacontrolhlblinkreactive.MsgHandle_Qacontrolhlblinkreactive"   ). %%store msgs 
qactor( qacontrolhlblinkreactive_ctrl , ctxblshlblimkreactive, "it.unibo.qacontrolhlblinkreactive.Qacontrolhlblinkreactive"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

