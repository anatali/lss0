using System;
using System.Net;
using System.Net.Sockets;
using System.Runtime.CompilerServices;

namespace UnityActorSimulator
{
    public class TcpActorClientEventsArgs : EventArgs
    {
        private TcpActorClientHandler _handler;

        public TcpActorClientEventsArgs(TcpActorClientHandler handler)
        {
            Handler = handler;
        }

        public TcpActorClientHandler Handler
        {
            get { return _handler; }
            private set { _handler = value; }
        }
    }

    /// <summary>
    /// Abstract class that defines the general behaviour of the tcp client handler.
    /// </summary>
    public abstract class TcpActorClientHandler : IComparable<TcpActorClientHandler>
    {
        protected string _ID;
        protected TcpClient _client;
        protected bool _clearActorOnClose;

        public event EventHandler<EventArgs> onConnectionClose;

        public string ID
        {
            get { return _ID; }
            set { _ID = value; }
        }

        protected TcpActorClientHandler(TcpClient client, bool clearActorOnClose)
        {
            _client = client;
            _clearActorOnClose = clearActorOnClose;

            string clientIPAddress = ((IPEndPoint)client.Client.RemoteEndPoint).Address.ToString();
            int port = ((IPEndPoint)client.Client.LocalEndPoint).Port;
            _ID = clientIPAddress + "/" + port; // default value
        }

        protected abstract T Receive<T>();

        [MethodImpl(MethodImplOptions.Synchronized)]
        public abstract void Send<T>(T data);

        public abstract void Stop();

        public int CompareTo(TcpActorClientHandler other)
        {
            string className = this.GetType().Name;
            string otherClassName = other.GetType().Name;

            return className.CompareTo(otherClassName);
        }

        protected void OnConnectionClose(object sender, EventArgs e)
        {
            if (onConnectionClose != null)
                onConnectionClose(sender, e);
        }
    }
}