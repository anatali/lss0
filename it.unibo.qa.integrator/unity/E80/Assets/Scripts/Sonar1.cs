using System;
//using UniRx;
using UnityEngine;
//using UnityActorSimulator;
//using uPLibrary.Networking.M2Mqtt;
using System.Text;
//using uPLibrary.Networking.M2Mqtt.Messages;

/// <summary>
/// Example script that uses the Sonar script
/// </summary>
[RequireComponent(typeof(Sonar)), RequireComponent(typeof(Collider))]
public class Sonar1 : SonarDetector
{
 
 
    new public void Start()
    {
        Debug.Log("Sonar1 start : " );
        base.Start();
    }
   
}
