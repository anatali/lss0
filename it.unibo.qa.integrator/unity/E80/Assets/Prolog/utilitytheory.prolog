%%% ---------------------------------------------------------
%%% Utility theory
%%% ---------------------------------------------------------

%%% ---------------------------------------------------------
%%% Public rules
%%% ---------------------------------------------------------

:- public getConnector/1, getUtility/1, getMqttClient/1, checkParameters/2.

%%% ---------------------------------------------------------
%%% Init
%%% ---------------------------------------------------------

%%% USE THIS FOR DLL
%%%:- $typeutils.addtypesearchpath("UnityActorSimulator", "UnityActorSimulator").
%%% ELSE
:- $typeutils.addtypesearchpath("UnityActorSimulator", "Assembly-CSharp-firstpass").

:- log("utilitytheory").

%%% ---------------------------------------------------------
%%% Handler utility methods
%%% ---------------------------------------------------------

changeID(OldName, NewName) :-
	checkParameters([OldName, NewName], [VOldName, VNewName]),
	log("getconnector"),
	getConnector(ConnectorListener),
	ConnectorListener.changeHandlerID(VOldName, VNewName).

%%% ---------------------------------------------------------
%%% UnityActorSimulator utility methods
%%% ---------------------------------------------------------

getConnector(ConnectorListener) :-
	Connector is $typeutils.findtype("TcpConnectorListener"),
	ConnectorListener is $object.findobjectoftype(Connector).

getMqttClient(MqttClientComponent) :-
	MqttClient is $typeutils.findtype("MqttClientComponent"),
	MqttClientComponent is $object.findobjectoftype(MqttClient).

getUtility(Utility) :-
	Utility is $typeutils.findtype("UnityPrologUtility").

%%% Simple patch in order to get the correct arguments value within the prolog goals
%%% that the java actor sends.

checkParameters([], []).

checkParameters([Head | Tail], [Head | Tail2]) :-
	is_class(Head, $'System.String'),
	checkParameters(Tail, Tail2).

checkParameters([Head | Tail], [HeadStr | Tail2]) :-
	is_class(Head, $'Prolog.Symbol'),
	property(Head, name, HeadStr),
	checkParameters(Tail, Tail2).
