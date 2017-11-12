%====================================================================================
% Context ctxHttpClient  SYSTEM-configuration: file it.unibo.ctxHttpClient.httpClient.pl 
%====================================================================================
context(ctxhttpclient, "localhost",  "TCP", "8049" ).  		 
%%% -------------------------------------------
qactor( qahttpclient , ctxhttpclient, "it.unibo.qahttpclient.MsgHandle_Qahttpclient"   ). %%store msgs 
qactor( qahttpclient_ctrl , ctxhttpclient, "it.unibo.qahttpclient.Qahttpclient"   ). %%control-driven 
qactor( qahttpanswerhandler , ctxhttpclient, "it.unibo.qahttpanswerhandler.MsgHandle_Qahttpanswerhandler"   ). %%store msgs 
qactor( qahttpanswerhandler_ctrl , ctxhttpclient, "it.unibo.qahttpanswerhandler.Qahttpanswerhandler"   ). %%control-driven 
%%% -------------------------------------------
%%% -------------------------------------------

