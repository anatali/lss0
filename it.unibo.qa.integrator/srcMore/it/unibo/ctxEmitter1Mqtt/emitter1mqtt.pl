%====================================================================================
% Context ctxEmitter1Mqtt  SYSTEM-configuration: file it.unibo.ctxEmitter1Mqtt.emitter1Mqtt.pl 
%====================================================================================
context(ctxemitter1mqtt, "localhost",  "TCP", "5073" ).  		 
%%% -------------------------------------------
qactor( sensorsonar , ctxemitter1mqtt, "it.unibo.sensorsonar.MsgHandle_Sensorsonar"   ). %%store msgs 
qactor( sensorsonar_ctrl , ctxemitter1mqtt, "it.unibo.sensorsonar.Sensorsonar"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

