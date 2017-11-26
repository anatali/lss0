/// <summary>
/// Simple utility class that implements some basic actor structures
/// </summary>
public static class ActorUtility
{
    public static ActorDataHandlerArgs BuildActorDataHandlerData(string name, string direction, float speed, float duration, float angle)
    {
        return new ActorDataHandlerArgs(name, direction, speed, duration, angle);
    }
}
