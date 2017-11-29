%====================================================================================
% Context ctxReactiveAsycnhActions  SYSTEM-configuration: file it.unibo.ctxReactiveAsycnhActions.qaActionsAsycnh.pl 
%====================================================================================
context(ctxreactiveasycnhactions, "localhost",  "TCP", "8078" ).  		 
%%% -------------------------------------------
qactor( musicreactiveasycnh , ctxreactiveasycnhactions, "it.unibo.musicreactiveasycnh.MsgHandle_Musicreactiveasycnh"   ). %%store msgs 
qactor( musicreactiveasycnh_ctrl , ctxreactiveasycnhactions, "it.unibo.musicreactiveasycnh.Musicreactiveasycnh"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

