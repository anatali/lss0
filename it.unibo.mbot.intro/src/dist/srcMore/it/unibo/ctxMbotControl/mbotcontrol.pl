%====================================================================================
% Context ctxMbotControl  SYSTEM-configuration: file it.unibo.ctxMbotControl.mbotControl.pl 
%====================================================================================
context(ctxmbotcontrol, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( rover , ctxmbotcontrol, "it.unibo.rover.MsgHandle_Rover"   ). %%store msgs 
qactor( rover_ctrl , ctxmbotcontrol, "it.unibo.rover.Rover"   ). %%control-driven 
qactor( sonardetector , ctxmbotcontrol, "it.unibo.sonardetector.MsgHandle_Sonardetector"   ). %%store msgs 
qactor( sonardetector_ctrl , ctxmbotcontrol, "it.unibo.sonardetector.Sonardetector"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

