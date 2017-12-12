using System;
using UniRx;
using UnityEngine;
using UnityActorSimulator;

/// <summary>
/// Example script that uses the Sonar script
/// </summary>
[RequireComponent(typeof(Sonar)), RequireComponent(typeof(Collider))]
public class SonarObserver :  MonoBehaviour
{
    [Header("Data Gathering")]
    public double samplingDelayAmount = 300;

    [Header("Communication")]
    public string actorName;

    public void Start()
    {		 
        Sonar sonar = GetComponent<Sonar>();
        IObservable<GameObject> SonarData = sonar.SonarData;

        if (string.IsNullOrEmpty(actorName))
            actorName = GetComponent<Collider>().transform.root.name;

        // Subscription in order to forward gathered data to the actor's handler
        SonarData.Sample(TimeSpan.FromMilliseconds(samplingDelayAmount)) // reduces the amount of sensed data
        .Where(obj => obj != null)
        .Subscribe(obj =>
        {

			Debug.Log("[SonarOnBoardddd] " + sonar.name + " Detected obj: " +  obj.name );
            var connector = TcpConnectorListener.Instance;
            var handler   = connector.GetHandlerFromID(actorName);

            if (handler != null)
            {
					/*	ATTEMPT TO GET A DISTANCE OF THE OBSTACLE 
						float distance = 0;
						//Debug.Log("[SonarOnBoard] obj: " + obj + " | " + obj.GetComponent(typeof(TargetProps) ) );						 
						distance = (obj.GetComponent (typeof(TargetProps)) as TargetProps).distance;
						int	d =  (int) distance ;
						Debug.Log("[SonarOnBoardddd] distance=" + d);
					*/	 
				string payload = UnityPrologUtility.BuildEvent("sonarDetect", actorName, "sonarDetect(" + obj.name.ToLower() + ")");
				//string payload = UnityPrologUtility.BuildEvent("sonarDetect", actorName, "sonarDetect(" + d + ")");
                handler.Send<string>(payload);

				Debug.Log("[SonarOnBoardddd] Sending: " + payload);
            }

        })
        .AddTo(this);

    }
}
