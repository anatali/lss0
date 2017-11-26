%%% ---------------------------------------------------------
%%% CREATION
%%% ---------------------------------------------------------

%%% :- shadow create/9, create/4, verifyName/1, createPrimitive/2, move/5.
:- log("actortheory").

create(Name, Prefab, X, Y, Z, A, B, C, W) :-
	verifyName(Name) -> !, fail.

create(Name, Prefab, X, Y, Z, A, B, C, W) :-
	checkParameters([Name, Prefab], [VName, VPrefab]),
	not(verifyName(VName)),
	call_method($resources, load(VPrefab), PrefabObj),
	getUtility(Utility),
	Quaternion is Utility.createquaternion(A,B,C,W),
	Instance is $object.instantiate(PrefabObj, vector(X,Y,Z), Quaternion),
	set_property(Instance, "name", VName).

%%% Internal usage
create(Name, Prefab, vector3(X,Y,Z), Quaternion) :-
	verifyName(Name) -> !, fail.

%%% Internal usage
create(Name, Prefab, vector3(X,Y,Z), Quaternion) :-
	checkParameters([Name, Prefab], [VName, VPrefab]),
	not(verifyName(VName)),
	call_method($resources, load(VPrefab), PrefabObj),
	Instance is $object.instantiate(PrefabObj, vector(X,Y,Z), Quaternion),
	set_property(Instance, "name", VName).

verifyName(Name) :-
	checkParameters([Name], [VName]),
	Found is $gameobject.find(VName),
	Found == null,
	!,
	fail.

verifyName(Name) :-
	checkParameters([Name], [VName]),
	Found is $gameobject.find(VName),
	Found \== null.

%%% Internal usage
createPrimitive(Name, PrimitiveType) :-
	$gameobject.createprimitive(PrimitiveType).

%%% ---------------------------------------------------------
%%% MOVEMENT
%%% ---------------------------------------------------------

move(Name, Direction, Speed, Duration, Angle) :-
	not(verifyName(Name)) -> !, fail.

move(Name, Direction, Speed, Duration, Angle) :-
	checkParameters([Name, Direction], [VName, VDirection]),
	verifyName(VName),
	!,
	ActorData is $'ActorUtility'.buildActorDataHandlerData(VName, VDirection, Speed, Duration, Angle),
	getUtility(Utility),
	Utility.notifyData(ActorData).