%====================================================================================
% Context ctxRover  SYSTEM-configuration: file it.unibo.ctxRover.testRover.pl 
%====================================================================================
context(ctxradarbase, "localhost",  "TCP", "8080" ).  		 
context(ctxrover, "localhost",  "TCP", "8070" ).  		 
%%% -------------------------------------------
qactor( rover , ctxrover, "it.unibo.rover.MsgHandle_Rover"   ). %%store msgs 
qactor( rover_ctrl , ctxrover, "it.unibo.rover.Rover"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxrover,"it.unibo.ctxRover.Evh","alarm,sonarDetect,sonar").  
%%% -------------------------------------------

