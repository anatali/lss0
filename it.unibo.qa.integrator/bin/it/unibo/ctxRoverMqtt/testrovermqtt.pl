%====================================================================================
% Context ctxRoverMqtt  SYSTEM-configuration: file it.unibo.ctxRoverMqtt.testRoverMqtt.pl 
%====================================================================================
context(ctxrovermqtt, "localhost",  "TCP", "8070" ).  		 
%%% -------------------------------------------
qactor( rover , ctxrovermqtt, "it.unibo.rover.MsgHandle_Rover"   ). %%store msgs 
qactor( rover_ctrl , ctxrovermqtt, "it.unibo.rover.Rover"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxrovermqtt,"it.unibo.ctxRoverMqtt.Evh","alarm,sonarDetect,sonar").  
%%% -------------------------------------------

