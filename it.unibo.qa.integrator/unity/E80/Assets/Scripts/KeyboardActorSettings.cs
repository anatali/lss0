using System;
using System.Collections.Generic;
using UnityActorSimulator;

/// <summary>
/// Actor's WASD movement settings wrapper class
/// </summary>
[Serializable]
public class KeyboardActorSettings : BaseActorSettings
{
    public List<string> keybindings;
    public float speedFactor;
    public float rotationSpeed;

    public KeyboardActorSettings(string actorName, List<string> keybindings, float speedFactor, float rotationSpeed) : base(actorName)
    {
        this.keybindings = keybindings;
        this.speedFactor = speedFactor;
        this.rotationSpeed = rotationSpeed;
    }

    public override string ToString()
    {
        return "RobotSetting for " + base.ToString()
            + "Key bindings: " + keybindings.ToString() + Environment.NewLine
            + "Speed factor: " + speedFactor + Environment.NewLine
            + "Rotation speed: " + rotationSpeed + Environment.NewLine;
    }
}

