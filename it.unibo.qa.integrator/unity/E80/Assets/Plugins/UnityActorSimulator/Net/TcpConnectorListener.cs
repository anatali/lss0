using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using UniRx;
using UnityEngine;

namespace UnityActorSimulator
{
    /// <summary>
    /// Simple tcp listener for incoming client socket requests
    /// </summary>
    public class TcpConnectorListener : Singleton<TcpConnectorListener>
    {
        private static string BASE_DIRECTORY = Environment.CurrentDirectory + @"\Assets\Configurations\";
        private static readonly int DEFAULT_SERVER_PORT = 6000;

        [Header("Network Settings")]
        public int port = DEFAULT_SERVER_PORT;
        public string serverName = typeof(TcpConnectorListener).Name;

        [Header("Json File Configuration")]
        public string filename;

        [Header("Actor Debugging")]
        public bool clearActorOnClose;

        private TcpListener _listener;
        private Type _handlerType = typeof(TcpReactiveActorClientHandler);     // internal implementation
        private IDictionary<string, TcpActorClientHandler> _handlers = new Dictionary<string, TcpActorClientHandler>();

        public IDictionary<string, TcpActorClientHandler> Handlers
        {
            get { return _handlers; }
        }

        /// <summary>
        /// Tries to retrieve a client's handler from the server's list.
        /// </summary>
        /// <param name="ID"></param>
        /// <returns>retrieved client's handler or null</returns>
        public TcpActorClientHandler GetHandlerFromID(string ID)
        {
            TcpActorClientHandler handler;

            _handlers.TryGetValue(ID, out handler);

            return handler;
        }

        /// <summary>
        /// Verifies if the ID already exists.
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool VerifyNewHandlerID(string ID)
        {
            bool alreadyExists = _handlers.ContainsKey(ID);

            return !alreadyExists;
        }

        /// <summary>
        /// Updates the handler ID
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="newID"></param>
        /// <returns></returns>
        public bool ChangeHandlerID(string ID, string newID)
        {
            if (VerifyNewHandlerID(newID))
            {
                TcpActorClientHandler handler;
                _handlers.TryGetValue(ID, out handler);

                if (handler != null)
                {
                    _handlers.Remove(ID);

                    handler.ID = newID;
                    _handlers.Add(newID, handler);

                    Debug.Log("[" + serverName + "] Handler ID updated! From " + ID + " To " + newID);

                    return true;
                }
                else
                    Debug.LogError("[" + serverName + "] Trying to access to non-existing handler!");
            }

            return false;
        }

        protected override void Awake()
        {
            base.Awake();

            Debug.Log(typeof(TcpConnectorListener).Assembly);
            var type = Type.GetType("UnityActorSimulator.TcpConnectorListener,"+ typeof(TcpConnectorListener).Assembly, false, true);
            Debug.Log(type);

            if (string.IsNullOrEmpty(serverName))
                serverName = name;

            if (string.IsNullOrEmpty(filename))
                _listener = new TcpListener(IPAddress.Any, port);
            else
            {
                Debug.Log("[" + serverName + "] Loading from json file: " + filename);

                var netInfo = JsonHelper.LoadFromJsonFile<NetSetupInfo>(BASE_DIRECTORY + filename).First();

                port = netInfo.port;
                serverName = netInfo.serverName;
                IPAddress address;

                if (IPAddress.TryParse(netInfo.address, out address) == false)
                {
                    address = IPAddress.Any;
                }

                Debug.Log("[" + serverName + "] Configured listener: " + address + "/" + port);
                _listener = new TcpListener(address, port);

                var retrievedType = Type.GetType(netInfo.handlerType + "," + netInfo.handlerTypeAssembly);
                if (typeof(TcpActorClientHandler).GetInheritedTypes().Contains(retrievedType))
                {
                    Debug.Log("[" + serverName + "] Using custom client handler: " + _handlerType.Name);
                    _handlerType = retrievedType;
                }
                else
                    Debug.LogWarning("[" + serverName + "] Handler type read does not extends abstract class " + typeof(TcpActorClientHandler).Name +
                        "! Using default client handler..");
            }

            Debug.Log("[" + serverName + "] Server is up!");

            // Since it is a monobehaviour (Unity will freeze otherwise)
            Thread thread = new Thread(new ThreadStart(_listener.Start));
            thread.Start();

            var listenerObs = Observable.Defer(() =>
            {
                Func<IObservable<TcpClient>> client = Observable.FromAsyncPattern<TcpClient>(_listener.BeginAcceptTcpClient, _listener.EndAcceptTcpClient);
                return client();
            })
            .RepeatUntilDestroy(this);

            listenerObs.Subscribe(client =>
            {
                // Create Handler and pass client to it
                TcpActorClientHandler handler = Activator.CreateInstance(_handlerType, new object[] { client, clearActorOnClose }) as TcpActorClientHandler;
                _handlers.Add(handler.ID, handler);
                handler.onConnectionClose += Handler_onConnectionClose;

                Debug.Log("[" + serverName + "] New client connected! Handler ID: " + handler.ID);
            })
            .AddTo(this);
        }

        private void Handler_onConnectionClose(object sender, EventArgs e)
        {
            if (e is TcpActorClientEventsArgs)
            {
                var args = e as TcpActorClientEventsArgs;
                _handlers.Remove(args.Handler.ID);
            }
            else
                Debug.LogWarning("[" + serverName + "] Received non valid EventArgs!");

        }
    }
}