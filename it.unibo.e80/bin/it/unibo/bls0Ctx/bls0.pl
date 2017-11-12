%====================================================================================
% Context bls0Ctx  SYSTEM-configuration: file it.unibo.bls0Ctx.bls0.pl 
%====================================================================================
context(bls0ctx, "localhost",  "TCP", "8029" ).  		 
%%% -------------------------------------------
qactor( qaled , bls0ctx, "it.unibo.qaled.MsgHandle_Qaled"   ). %%store msgs 
qactor( qaled_ctrl , bls0ctx, "it.unibo.qaled.Qaled"   ). %%control-driven 
qactor( ledtester , bls0ctx, "it.unibo.ledtester.MsgHandle_Ledtester"   ). %%store msgs 
qactor( ledtester_ctrl , bls0ctx, "it.unibo.ledtester.Ledtester"   ). %%control-driven 
qactor( qacontrol , bls0ctx, "it.unibo.qacontrol.MsgHandle_Qacontrol"   ). %%store msgs 
qactor( qacontrol_ctrl , bls0ctx, "it.unibo.qacontrol.Qacontrol"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

