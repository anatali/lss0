using System;
using System.Collections;
using UniRx;
using UnityActorSimulator;
using UnityEngine;

/// <summary>
/// Simple observer that filters observable stream by selecting only the data useful for 3D/2D movement
/// </summary>
public class MovementObserver : MonoBehaviour
{
    private WASDActorSettingsMapper _configuration;
    private IDisposable _currentAction;
    private Animator _anim;

    // Since the input observable is initialized at Awake(), it is better to locate subscription here
    void Start ()
    {
        _anim = GetComponent<Animator>();

        // Retrieving mapper
        var settings = FindObjectOfType<SettingsDatabase>().Settings;
        object retrievedValue = null;
        settings.TryGetValue(gameObject.name, out retrievedValue);
        _configuration = retrievedValue as WASDActorSettingsMapper;

        UnityPrologUtility.inputObs.Where(data => data is ActorDataHandlerArgs && ((ActorDataHandlerArgs)data).Name.Equals(this.name))
            .Subscribe(data =>
            {
                // Stopping on-going coroutine
                if (_currentAction != null)
                {
                    _currentAction.Dispose();
                    Debug.Log("Received new command! Stopping on-going coroutine..");
                }

                var retrieved = data as ActorDataHandlerArgs;
                Debug.Log("Received movement data: " + retrieved);

                // Apply animation if animator != null
                if (_anim != null)
                {
                    ChooseAnimation(retrieved.Direction);
                }

                // Apply movement
                _currentAction = Observable.FromMicroCoroutine(() => MovementCoroutine(retrieved.Direction, retrieved.Speed, retrieved.Duration, retrieved.Angle))
                .Subscribe(
                    _ => { },
                    _ => { },
                    () => 
                    {
                        if (_anim != null)
                        {
                            ApplyAnimation(false, false, false, false, true);
                        }
                         
                    });
                
            },
            ex =>
            {
                Debug.LogException(ex);
            })
            .AddTo(this);

	}
	
	// Update is called once per frame
	void Update () {
		
	}

    /// <summary>
    /// Uses a WASDActorSettingsMapper.
    /// Simple coroutine which follows the following behaviour:
    ///     W -> moves forward (gameobject's facing)
    ///     S -> moves backward (gameobject's facing)
    ///     A -> rotates left by angle parameter
    ///     D -> rotates right by angle parameter
    /// </summary>
    IEnumerator MovementCoroutine(string direction, float speed, float duration, float angle)
    {
        WASDMapperInfo info = _configuration.GetMappingInfoFromDirection(direction);
        Vector3 eulerAngles = transform.rotation.eulerAngles;
        float rotationSpeed = _configuration.RotationSpeed;
        float filteredSpeed = _configuration.GetConvertedSpeed(speed);
        float rotationAccumulator = 0;
        float movementAccumulator = 0;

        // Movement
        while (EvaluateGoalCondition(duration, movementAccumulator, rotationAccumulator, angle, info.vector))
        {
            transform.position += transform.TransformDirection(info.vector) * filteredSpeed * Time.fixedDeltaTime;
            float deltaY = EvaluateRotationDelta(angle, duration, rotationAccumulator) * info.rotationFactor * Time.fixedDeltaTime * rotationSpeed;
            eulerAngles.y += deltaY;
            rotationAccumulator += deltaY;

            if (eulerAngles.y > 360)
                eulerAngles.y -= 360;
            else if (eulerAngles.y < -360)
                eulerAngles.y += 360;


            transform.eulerAngles = eulerAngles;

            yield return null;  // next frame
            movementAccumulator += Time.fixedDeltaTime;
        }
    }

    /// <summary>
    /// If no duration is specified (equal to zero) then the translation of the object
    /// is repeated forever, whereas the rotation stops as soon as the object has rotated
    /// by the specified amount.
    /// </summary>
    /// <param name="duration"></param>
    /// <param name="accumulator"></param>
    /// <returns></returns>
    private bool EvaluateGoalCondition(float duration, float movementAccumulator, float rotationAccumulator, float angle, Vector3 direction)
    {
        // Movement
        bool movementGoal = true;

        if (duration > 0)
            movementGoal = movementAccumulator < duration;

        if (direction.z == 0 && direction.x == 0)
            movementGoal = false;

        // Rotation
        bool rotationGoal = true;

        if (angle == 0)
            rotationGoal = false;
        else
        {
            rotationGoal = Math.Abs(rotationAccumulator) < Math.Abs(angle);
        }

        return movementGoal || rotationGoal;
    }

    private float EvaluateRotationDelta(float angle, float duration, float rotationAccumulator)
    {
        if (duration == 0)
        {
            if (Math.Abs(rotationAccumulator) > Math.Abs(angle))
            {
                return 0;
            }
            else
            {
                return angle;
            }
        }
        else
        {
            return (angle / duration);
        }
    }

    private void ChooseAnimation(string direction)
    {
        switch (direction)
        {
            case "W":
                {
                    ApplyAnimation(true, false, false, false, false);
                }
                break;

            case "A":
                {
                    ApplyAnimation(false, false, true, false, false);
                }
                break;

            case "D":
                {
                    ApplyAnimation(false, false, false, true, false);
                }
                break;

            case "S":
                {
                    ApplyAnimation(false, true, false, false, false);
                }
                break;

            case "SPACE":
                {
                    ApplyAnimation(false, false, false, false, true);
                }
                break;

            default: break;
        }
    }

    private void ApplyAnimation(bool forward, bool backward, bool left, bool right, bool stop)
    {
        _anim.SetBool("forward", forward);
        _anim.SetBool("backward", backward);
        _anim.SetBool("left", left);
        _anim.SetBool("right", right);
        _anim.SetBool("stop", stop);
    }
}
