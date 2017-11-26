using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Simple script for 2D dynamic obstacle movement
/// </summary>
public class PeriodicMovement : MonoBehaviour
{
    [Range(0, 50)]
    public float x_range = 10;
    [Range(0, 50)]
    public int z_range = 0;
    public int speed = 5;

    private Vector3 _startingPos;
    private Vector3 _delta_x = Vector3.zero;
    private Vector3 _delta_z = Vector3.zero;

	// Use this for initialization
	void Start ()
    {
        _startingPos = transform.position;

        if (x_range > 0)
            _delta_x = transform.right * Time.deltaTime * speed;
        if (z_range > 0)
            _delta_z = transform.forward * Time.deltaTime * speed;
    }
	
	void Update ()
    {
        Vector3 currentPos = transform.position;

        if (currentPos.x > _startingPos.x + x_range)
        {
            _delta_x = -transform.right * Time.deltaTime * speed;
        }

        if (currentPos.x < _startingPos.x - x_range)
        {
            _delta_x = transform.right * Time.deltaTime * speed;
        }

        if (currentPos.z > _startingPos.z + z_range)
        {
            _delta_z = -transform.forward * Time.deltaTime * speed;
        }

        if (currentPos.z < _startingPos.z - z_range)
        {
            _delta_z = transform.forward * Time.deltaTime * speed;
        }

        transform.position += _delta_x + _delta_z;
 	}
}
