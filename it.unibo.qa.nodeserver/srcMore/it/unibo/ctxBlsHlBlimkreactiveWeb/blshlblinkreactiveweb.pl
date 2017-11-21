%====================================================================================
% Context ctxBlsHlBlimkreactiveWeb  SYSTEM-configuration: file it.unibo.ctxBlsHlBlimkreactiveWeb.blsHlBlinkReactiveWeb.pl 
%====================================================================================
context(ctxblshlblimkreactiveweb, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaledhlreactiveweb , ctxblshlblimkreactiveweb, "it.unibo.qaledhlreactiveweb.MsgHandle_Qaledhlreactiveweb"   ). %%store msgs 
qactor( qaledhlreactiveweb_ctrl , ctxblshlblimkreactiveweb, "it.unibo.qaledhlreactiveweb.Qaledhlreactiveweb"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

