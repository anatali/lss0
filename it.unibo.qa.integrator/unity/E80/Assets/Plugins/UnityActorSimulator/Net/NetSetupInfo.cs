using System;

namespace UnityActorSimulator
{
    /// <summary>
    /// Simple class used to store net configuration properties loaded from a json file
    /// </summary>
    [Serializable]
    public class NetSetupInfo
    {
        public static readonly string DEFAULT_ASSEMBLY = "Assembly-CSharp";

        public int port;
        public string serverName;
        public string address;
        public string handlerType;
        public string handlerTypeAssembly;

        public NetSetupInfo(int port, string serverName, string address, string handlerType, string handlerTypeAssembly)
        {
            this.port = port;
            this.serverName = serverName;
            this.address = address;
            this.handlerType = handlerType;
            this.handlerTypeAssembly = handlerTypeAssembly;
        }

        public NetSetupInfo(int port, string serverName, string address, string handlerType) : this(port, serverName, address, handlerType, DEFAULT_ASSEMBLY) { }
        
    }
}
