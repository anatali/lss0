using System;
using System.Collections.Generic;
using UniRx;
using UnityEngine;

/// <summary>
/// Very basic physical sonar-like detection script.
/// The collected data is viewed as a stream of detected gameobjects.
/// </summary>
/// 
/// 
/// <todo>
/// 1. Realistic collision checking: will the object (or parent object) collide with the detected one?
/// 2. Add filters for detected gameobjects: ex. Has Rigidbody component?
/// </todo>
public class Sonar : MonoBehaviour
{
	public string sonarName;

    [Header("Detection")]
    public float radius = 5;
    [Range(1, 90)]
    public float angleRange = 45;
    public float detectionDistance = 5;
    public float heightOffset = 0;  // use transform.position.y as initial value (0)
    public List<string> validTags = new List<string>() { "Actor", "Environment" };

    [Header("Debug")]
    public bool showSphere;
    public bool showDetectionCone;
    [Range(1, 50)]
    public int rayMagnitude = 10;

    public IObservable<GameObject> SonarData { get; private set; }

    #region Debug
    private Vector3 g_startVec;
    private Vector3 g_startVecFwd;
    private Vector3 g_rayDirection;
    private Vector3 g_targetPos;
    private Vector3 g_cone_left;
    private Vector3 g_cone_right;
    #endregion

    void Awake ()
    {

        SonarData = Observable.EveryFixedUpdate()
            .Select(_ =>
            {
                var detected = Physics.OverlapSphere(transform.position, radius);

                foreach (var obj in detected)
                {
                    if (VerifyTags(obj.gameObject.tag) && !obj.transform.IsChildOf(this.transform) && !this.transform.IsChildOf(obj.transform))
                    {
                        if (CanSeeTarget(obj))
                        {
                            return obj.gameObject;
                        }
                    }
                }

                return null;
            });
	}
	
	// Update is called once per frame
	void Update ()
    {
        #region Debug
        if (showDetectionCone)
        {
            g_cone_left = Quaternion.Euler(0, -angleRange, 0) * (transform.forward * rayMagnitude);
            g_cone_right = Quaternion.Euler(0, angleRange, 0) * (transform.forward * rayMagnitude);
        }
        #endregion
    }

    public bool VerifyTags(string tag)
    {
        if (validTags.Count > 0)
        {
            return validTags.Contains(tag);
        }
        else
            return true; // no filtering
    }

    private bool CanSeeTarget(Collider collider)
    {
        GameObject target = collider.gameObject;
        Vector3 startVec = transform.position;
        startVec.y += heightOffset;
        Vector3 startVecFwd = transform.forward;
        startVecFwd.y += heightOffset;
        Vector3 targetPoint = collider.ClosestPointOnBounds(startVec);

        RaycastHit hit;
        Vector3 rayDirection = targetPoint - startVec;
        float angle = Vector3.Angle(rayDirection, startVecFwd);
        float distance = Vector3.Distance(startVec, targetPoint);
        bool inFieldOfView = Physics.Raycast(startVecFwd + startVec, rayDirection, out hit, detectionDistance);
        bool validTarget = false;

        if (hit.collider != null && hit.collider.gameObject != null)
            validTarget = hit.collider.gameObject == target;

        #region Debug
        //g_rayDirection = rayDirection;
        //g_startVecFwd = startVecFwd;
        //g_startVec = startVec;
        //g_targetPos = targetPoint;
        //Debug.Log("RayDirection: " + rayDirection + ", startVecFwd: " + startVecFwd);
        //Debug.Log("Angle: " + (angle < angleRange) + Environment.NewLine
        //  + "Distance: " + (distance < detectionDistance) + Environment.NewLine
        //  + "InFieldOfView: " + inFieldOfView + Environment.NewLine
        //  + "ValidTarget: " + validTarget);
        #endregion

		if (angle < angleRange && distance < detectionDistance && inFieldOfView && validTarget) {
			 //Debug.Log(" [Sonar] distance=" + distance + " for " + collider );
			 if (collider.name.Equals ("rover"))
			    (collider.GetComponent (typeof(TargetProps)) as TargetProps).distance = distance;
			return true;
		}
        return false;
    }

    #region Debug
    private void OnDrawGizmos()
    {
        // View Sphere!
        if (showSphere)
        {
            Gizmos.color = new Color(1, 0, 0, 0.5F);
            Gizmos.DrawSphere(gameObject.transform.position, radius);
        }

        // View Detection cone!
        if (showDetectionCone)
        {
            Gizmos.color = Color.blue;
            Gizmos.DrawLine(transform.position, transform.position + g_cone_left);
            Gizmos.DrawLine(transform.position, transform.position + g_cone_right);
        }


        // View Vectors!
        //Gizmos.color = Color.red;
        //Gizmos.DrawLine(Vector3.zero, g_startVec);
        //Gizmos.color = Color.blue;
        //Gizmos.DrawLine(Vector3.zero, g_startVecFwd);
        //Gizmos.color = Color.green;
        //Gizmos.DrawLine(Vector3.zero, g_rayDirection);
        //Gizmos.color = Color.yellow;
        //Gizmos.DrawLine(Vector3.zero, g_targetPos);
        //Gizmos.color = Color.gray;
        //Gizmos.DrawRay(g_startVecFwd + g_startVec, g_rayDirection);
    }
    #endregion

}
