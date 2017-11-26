%====================================================================================
% Context ctxHelloMqtt  SYSTEM-configuration: file it.unibo.ctxHelloMqtt.helloMqtt.pl 
%====================================================================================
context(ctxhellomqtt, "localhost",  "TCP", "8079" ).  		 
%%% -------------------------------------------
qactor( qamqttsender , ctxhellomqtt, "it.unibo.qamqttsender.MsgHandle_Qamqttsender"   ). %%store msgs 
qactor( qamqttsender_ctrl , ctxhellomqtt, "it.unibo.qamqttsender.Qamqttsender"   ). %%control-driven 
qactor( qamqttreceivet , ctxhellomqtt, "it.unibo.qamqttreceivet.MsgHandle_Qamqttreceivet"   ). %%store msgs 
qactor( qamqttreceivet_ctrl , ctxhellomqtt, "it.unibo.qamqttreceivet.Qamqttreceivet"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

