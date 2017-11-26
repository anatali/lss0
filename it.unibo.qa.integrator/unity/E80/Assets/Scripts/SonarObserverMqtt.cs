using System;
using UniRx;
using UnityEngine;
using UnityActorSimulator;
//using uPLibrary.Networking.M2Mqtt;
using System.Text;
//using uPLibrary.Networking.M2Mqtt.Messages;

/// <summary>
/// Example script that uses the Sonar script
/// </summary>
[RequireComponent(typeof(Sonar)), RequireComponent(typeof(Collider))]
public class SonarObserverMqtt : MonoBehaviour
{
    [Header("Data Gathering")]
    public double samplingDelayAmount = 400;    //rate di campionamento
     
    [Header("Communication")]
    public string actorName;

    /*
     * MQTT
     */
    public static MqttClientComponent client;

    public static Boolean started  = false;
    public static int numofstarted = 0;

    public string brokerHostname = "m2m.eclipse.org";
    public int brokerPort = 1883;
    public string userName = "unity";
    public string password = null;
    public string topic      = "unibo/mqtt/unity";
    public string topicInput = "unibo/mqtt/unity/input";

     
    public void Start()
    {
		
        Sonar sonar = GetComponent<Sonar>();
        IObservable<GameObject> SonarData = sonar.SonarData;

        Connect();

        if (string.IsNullOrEmpty(actorName))
            actorName = GetComponent<Collider>().transform.root.name;

        // Subscription in order to forward gathered data to the actor's handler
        SonarData.Sample(TimeSpan.FromMilliseconds(samplingDelayAmount)) // reduces the amount of sensed data
        .Where(obj => obj != null)
        .Subscribe(obj =>
        {
        /*
        var connector = TcpConnectorListener.Instance;
        var handler = connector.GetHandlerFromID(actorName);

        if (handler != null)
        {
            string payload = UnityPrologUtility.BuildEvent("local_sonarDetect", actorName, "sonarDetect(" + obj.name.ToLower() + ")");
            handler.Send<string>(payload);

            Debug.Log("[Sonar] Sending: " + payload);
        }
        */
        //Debug.Log("found: " + this.name   + " target=" +  obj.name.ToLower() + " tag=" + obj.tag );
        float distance = 0;
            if ( true ) //obj.name.Equals("robot") || obj.name.Equals("wall") && started
            {
                distance = (obj.GetComponent(typeof(TargetProps)) as TargetProps).distance ;
                string msg = "msg( sonarDetect" + "," + actorName + "," + 
                    "sonarDetect(" + this.name.ToLower() + "," + 
                      (obj.GetComponent(typeof(TargetProps)) as TargetProps).distance + "))";
                Debug.Log("msg: " + msg);
                //if(obj.name.ToLower().Equals("robot"))
                Publish(topic, msg);
                float d = (obj.GetComponent(typeof(TargetProps)) as TargetProps).distance;
                if (d > 8) d = 50; else d = 10;
                string msg1 = "msg( polar" + ", dispatch, " + actorName + ", radargui, " +
                  "p(" +  d + "," + "90), 1" + ")";
                Debug.Log("msg1: " + msg1);
                Publish("unibo/mqtt/radar", msg1);
                 
            }
        }
        )
        .AddTo(this);
    }


    public void Connect()
    {
		/*
        if (client == null) { 
            Debug.Log("connecting to " + brokerHostname + ":" + brokerPort);
            client = new MqttClient4Unity(brokerHostname, brokerPort, false, null);
            //string clientId = Guid.NewGuid().ToString();
            //client.Connect(clientId, userName, password)
            client.Connect("qaunity");
            client.Subscribe(topicInput);
            Debug.Log("connected to " + brokerHostname + ":" + brokerPort + " inputOn:" + topicInput);
        }
        */
		/* TODO
		if (client == null) {
			client = MqttClientComponent.Instance;
			Debug.Log("connecting to " + brokerHostname + ":" + brokerPort);
			client.Connect("qaunity");
		}
		*/
    }

    public void Publish(string _topic, string msg)
    {
             Debug.Log("Publish on " + _topic + " msg=" + msg);
		/*
            client.Publish(
             _topic, Encoding.UTF8.GetBytes(msg), MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE, true);
            */
     }
    // Update is called once per frame
    void Update()
    {
		/*
        while (client.Count() > 0)
        {
			
            string s = client.Receive();
            //msgq.Enqueue(s);
            Debug.Log("received %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% :" + s);
            numofstarted++;
            if(numofstarted == 2)   started = true;

        }
       */
    }

}
