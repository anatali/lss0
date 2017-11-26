using System;
using UniRx;
using UnityEngine;
using UnityActorSimulator;

/// <summary>
/// Example script that uses the Sonar script
/// </summary>
[RequireComponent(typeof(Sonar)), RequireComponent(typeof(Collider))]
public class SonarObserver : MonoBehaviour
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
			Debug.Log("[Sonar] " + sonar.name + " Detected obj: " +  obj );
            var connector = TcpConnectorListener.Instance;
            var handler   = connector.GetHandlerFromID(actorName);

            if (handler != null)
            {
                string payload = UnityPrologUtility.BuildEvent("sonarDetect", actorName, "sonarDetect(" + obj.name.ToLower() + ")");
                handler.Send<string>(payload);

                Debug.Log("[Sonar] Sending: " + payload);
            }

        })
        .AddTo(this);
    }
}
