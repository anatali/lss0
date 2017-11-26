using System;

/// <summary>
/// Move action wrapper class
/// </summary>
public class ActorDataHandlerArgs : EventArgs
{
    public string Name { get; set; }
    public string Direction { get; set; }
    public float Speed { get; set; }
    public float Duration { get; set; }
    public float Angle { get; set; }

    public ActorDataHandlerArgs(string name, string direction, float speed, float duration, float angle)
    {
        this.Name = name;
        this.Direction = direction;
        this.Speed = speed;
        this.Duration = duration;
        this.Angle = angle;
    }

    public override string ToString()
    {
        return Name + ", " + Direction + ", " + Speed + ", " + Duration + ", " + Angle;
    }

    public override bool Equals(object obj)
    {
        if (obj == null)
            return false;

        if (obj is ActorDataHandlerArgs == false)
            return false;

        var retrieved = obj as ActorDataHandlerArgs;

        return Name.Equals(retrieved.Name) &&
            Direction.Equals(retrieved.Direction) &&
            Speed == retrieved.Speed &&
            Duration == retrieved.Duration &&
            Angle == retrieved.Angle;
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}