%====================================================================================
% Context ctxRadarBase  SYSTEM-configuration: file it.unibo.ctxRadarBase.radargui.pl 
%====================================================================================
context(ctxradarbase, "localhost",  "TCP", "8033" ).  		 
%%% -------------------------------------------
qactor( radarguibase , ctxradarbase, "it.unibo.radarguibase.MsgHandle_Radarguibase"   ). %%store msgs 
qactor( radarguibase_ctrl , ctxradarbase, "it.unibo.radarguibase.Radarguibase"   ). %%control-driven 
qactor( qatester , ctxradarbase, "it.unibo.qatester.MsgHandle_Qatester"   ). %%store msgs 
qactor( qatester_ctrl , ctxradarbase, "it.unibo.qatester.Qatester"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

