using System;
using UniRx;
using UnityEngine;
using UnityActorSimulator;
using System.Text;

[RequireComponent(typeof(Sonar)), RequireComponent(typeof(Collider))]
public class SonarDetector : MonoBehaviour
{
    [Header("Data Gathering")]
    public double samplingDelayAmount = 400;    //rate di campionamento
     
    [Header("Communication")]
    public string actorName;
    public String sonarName;   
     
	public void Start()
	{
		
		Sonar sonar = GetComponent<Sonar> ();
		IObservable<GameObject> SonarData = sonar.SonarData;
 
		if (string.IsNullOrEmpty (actorName))
			actorName = GetComponent<Collider> ().transform.root.name;

		// Subscription in order to forward gathered data to the actor's handler
		SonarData.Sample (TimeSpan.FromMilliseconds (samplingDelayAmount)) // reduces the amount of sensed data
        .Where (obj => obj != null)
        .Subscribe (obj => {
			//Debug.Log("found: " + this.name   + " target=" +  obj.name.ToLower() + " tag=" + obj.tag );
			float distance = 0;
			//Debug.Log("[Sonar detector] obj: " + obj + " | " + obj.GetComponent(typeof(TargetProps) ) );
			distance = (obj.GetComponent (typeof(TargetProps)) as TargetProps).distance;
				int	d =  (int) distance ;
			//Debug.Log (" [SonarDetector]  " + name + " DETECTED distance" + d + " actorName=" + obj.name);
			var connector = TcpConnectorListener.Instance;
			var handler = connector.GetHandlerFromID (obj.name);
			//Debug.Log ("[SonarDetector] connector: " + connector + " handler" + handler);
			if (handler != null) {
				string payload = UnityPrologUtility.BuildEvent(
						"sonar", actorName, "sonar(" + name +","+obj.name.ToLower () + "," + d + ")");
				handler.Send<string> (payload);
				Debug.Log ("[SonarDetector] Sending: " + payload);
			}
		})
          .AddTo (this);
    }

}
