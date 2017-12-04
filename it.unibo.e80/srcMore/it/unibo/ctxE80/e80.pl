%====================================================================================
% Context ctxE80  SYSTEM-configuration: file it.unibo.ctxE80.e80.pl 
%====================================================================================
context(ctxe80, "localhost",  "TCP", "8073" ).  		 
%%% -------------------------------------------
qactor( wharehouse , ctxe80, "it.unibo.wharehouse.MsgHandle_Wharehouse"   ). %%store msgs 
qactor( wharehouse_ctrl , ctxe80, "it.unibo.wharehouse.Wharehouse"   ). %%control-driven 
qactor( order , ctxe80, "it.unibo.order.MsgHandle_Order"   ). %%store msgs 
qactor( order_ctrl , ctxe80, "it.unibo.order.Order"   ). %%control-driven 
qactor( tester , ctxe80, "it.unibo.tester.MsgHandle_Tester"   ). %%store msgs 
qactor( tester_ctrl , ctxe80, "it.unibo.tester.Tester"   ). %%control-driven 
%%% -------------------------------------------
eventhandler(evh,ctxe80,"it.unibo.ctxE80.Evh","store,remove").  
%%% -------------------------------------------

