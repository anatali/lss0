using Prolog;
using System;
using System.IO;
using System.Net.Sockets;
using System.Text;
using UniRx;
using UnityEngine;

namespace UnityActorSimulator
{
    /// <summary>
    ///  Simple network stream creation as observable to which the class instance subscribes.
    ///  Moreover, the client handler is implemented as to receive only strings in prolog-like syntax.
    /// </summary>
    /// 
    public class TcpReactiveActorClientHandler : TcpActorClientHandler
    {
        private StreamReader _reader;
        private StreamWriter _writer;
        private IDisposable _streamObserver;

        public IDisposable StreamObserver
        {
            get { return _streamObserver; }
        }

        public TcpReactiveActorClientHandler(TcpClient client, bool clearActorOnClose) : base(client, clearActorOnClose)
        {
            var stream = _client.GetStream();
            _reader = new StreamReader(stream);
            _writer = new StreamWriter(stream);

            var streamObs = Observable.Defer(() =>
                Observable.Start(() =>
                {
                    return this.Receive<string>();
                })
                .ObserveOnMainThread()
                .Catch((Exception e) => 
                {
                    Stop();

                    OnConnectionClose(this, new TcpActorClientEventsArgs(this));

                    if (_clearActorOnClose)
                    {
                        Debug.LogWarning("[ Handler " + ID + "] Trying to find associated actor by using handler's ID! Please be aware to change its default ID if you want to properly use this feature..");
                        var retrieved = GameObject.Find(_ID);
                        if (retrieved != null)
                        {
                            GameObject.Destroy(retrieved);
                        }
                    }

                    return Observable.Empty<string>();
                })
                .RepeatSafe()
                .TakeWhile(message => _client.Connected && message.Length > 0));

            _streamObserver = streamObs.ObserveOnMainThread()
           .Subscribe(message =>
           {
               Debug.Log("[ Handler " + ID + "] Received message: " + message);
               var kb = GameObject.Find("GlobalKB").GetComponent<KB>();

               if (!kb.IsTrueParsed(message))
               {
                   Debug.LogError("[ Handler " + ID + "] Prolog goal failed!");
               }

           });
        }

        protected override T Receive<T>()
        {
            String message = _reader.ReadLine();
            string decodedMessage = WWW.UnEscapeURL(message, Encoding.UTF8) + "."; // prolog goal

            return (T)Convert.ChangeType(decodedMessage, typeof(T));
        }

        public override void Send<T>(T data)
        {
            var encodedMessage = WWW.EscapeURL(data.ToString(), Encoding.UTF8);

            try
            {
                _writer.WriteLine(encodedMessage);
                _writer.Flush();
            }
            catch(Exception e)
            {
                Debug.LogError(e.Message);
                Debug.LogError(e.StackTrace);
                Stop();
            }
        }

        public override void Stop()
        {
            Debug.Log("[Handler " + ID + "] Detected stream closure! Closing Handler..");
            _streamObserver.Dispose();
            _reader.Close();
            _writer.Close();
            _client.Close();
        }
    }
}