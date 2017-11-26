using System;

namespace UnityActorSimulator
{
    /// <summary>
    /// Basic class that describes the general properties of an actor settings
    /// </summary>
    [Serializable]
    public abstract class BaseActorSettings : IComparable<BaseActorSettings>
    {
        public string actorName;

        public BaseActorSettings(string actorName)
        {
            this.actorName = actorName;
        }

        public int CompareTo(BaseActorSettings other)
        {
            return actorName.CompareTo(other.actorName);
        }

        public override string ToString()
        {
            return "Actor: " + actorName + Environment.NewLine;
        }
    }
}