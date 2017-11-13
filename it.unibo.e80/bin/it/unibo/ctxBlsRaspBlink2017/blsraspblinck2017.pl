%====================================================================================
% Context ctxBlsRaspBlink2017  SYSTEM-configuration: file it.unibo.ctxBlsRaspBlink2017.blsRaspBlinck2017.pl 
%====================================================================================
context(ctxblsraspblink2017, "localhost",  "TCP", "8030" ).  		 
%%% -------------------------------------------
qactor( buttongpio , ctxblsraspblink2017, "it.unibo.buttongpio.MsgHandle_Buttongpio"   ). %%store msgs 
qactor( buttongpio_ctrl , ctxblsraspblink2017, "it.unibo.buttongpio.Buttongpio"   ). %%control-driven 
qactor( ledgpio , ctxblsraspblink2017, "it.unibo.ledgpio.MsgHandle_Ledgpio"   ). %%store msgs 
qactor( ledgpio_ctrl , ctxblsraspblink2017, "it.unibo.ledgpio.Ledgpio"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

