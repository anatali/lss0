using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Simple class that maps some keyboard settings.
/// If you want to define another type of configuration, simply define a new class that it's similar to this one
/// </summary>
public sealed class WASDActorSettingsMapper
{

    private IDictionary<string, WASDMapperInfo> _directionMappings = new Dictionary<string, WASDMapperInfo>()
    {
        { "W", WASDMapperInfo.forward },
        { "S", WASDMapperInfo.back },
        { "A", WASDMapperInfo.left },
        { "D", WASDMapperInfo.right },
        { "SPACE", WASDMapperInfo.zero }
    };

    private KeyboardActorSettings _settings;

    public WASDActorSettingsMapper(KeyboardActorSettings settings)
    {
        _settings = settings; 
    }

    public WASDActorSettingsMapper(KeyboardActorSettings settings, IDictionary<string,WASDMapperInfo> directionMappings)
    {
        _settings = settings;
        _directionMappings = directionMappings;
    }

    public IDictionary<string, WASDMapperInfo> DirectionMappings
    {
        get { return _directionMappings; }
        set { _directionMappings = value; }
    }

    public WASDMapperInfo GetMappingInfoFromDirection(string direction)
    {
        WASDMapperInfo value;
        _directionMappings.TryGetValue(direction, out value);
        return value;
    }

    public float GetConvertedSpeed(float speed)
    {
        return speed * _settings.speedFactor;
    }

    public float RotationSpeed
    {
        get { return _settings.rotationSpeed; }
    }
}

public struct WASDMapperInfo
{
    public Vector3 vector;
    public int rotationFactor;

    public WASDMapperInfo(Vector3 vector, int rotationFactor)
    {
        this.vector = vector;
        this.rotationFactor = rotationFactor;
    }

    public static WASDMapperInfo forward
    {
        get { return new WASDMapperInfo(Vector3.forward, 0); }
    }

    public static WASDMapperInfo back
    {
        get { return new WASDMapperInfo(Vector3.back, 0); }
    }

    public static WASDMapperInfo left
    {
        get { return new WASDMapperInfo(Vector3.zero, -1); }
    }

    public static WASDMapperInfo right
    {
        get { return new WASDMapperInfo(Vector3.zero, 1); }
    }

    public static WASDMapperInfo zero
    {
        get { return new WASDMapperInfo(Vector3.zero, 0); }
    }
}
