%====================================================================================
% Context ctxRover  SYSTEM-configuration: file it.unibo.ctxRover.testRover.pl 
%====================================================================================
context(ctxrover, "localhost",  "TCP", "8070" ).  		 
%%% -------------------------------------------
qactor( rover , ctxrover, "it.unibo.rover.MsgHandle_Rover"   ). %%store msgs 
qactor( rover_ctrl , ctxrover, "it.unibo.rover.Rover"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxrover,"it.unibo.ctxRover.Evh","sonarDetect,sonar").  
%%% -------------------------------------------

