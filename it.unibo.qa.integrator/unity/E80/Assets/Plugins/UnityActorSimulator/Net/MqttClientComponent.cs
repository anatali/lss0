using System;
using System.Collections.Generic;
using UniRx;
using UnityEngine;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using System.Linq;

namespace UnityActorSimulator
{
    /// <summary>
    /// Simple wrapper class that encapsulates a MqttClient by exploiting UniRx.
    /// In particular, each event emitted by MqttClient is wrapped into an IObservable.
    /// </summary>
    public class MqttClientComponent : Singleton<MqttClientComponent>
    {
        [Header("Network Settings")]
        public string brokerHostName;
        public string clientID;

        [Header("Initial Configuration")]
        public string clientName = typeof(MqttClientComponent).Name;
        public bool connectOnStart = true;
        public bool subscribeOnStart = true;
        public List<string> topics;

        private MqttClient _client;

        public IObservable<MqttMsgPublishEventArgs> PublishedObs { get; private set; }
        public IObservable<EventArgs> ConnectionClosedObs { get; private set; }
        public IObservable<MqttMsgPublishedEventArgs> PublishObs { get; private set; }
        public IObservable<MqttMsgSubscribedEventArgs> SubscribedObs { get; private set; }
        public IObservable<MqttMsgUnsubscribedEventArgs> UnsubscribedObs { get; private set; }

        protected override void Awake()
        {
            base.Awake();

            // Network

            _client = new MqttClient(brokerHostName);

            if (string.IsNullOrEmpty(clientID))
                clientID = Guid.NewGuid().ToString();

            // Initial configuration

            if (string.IsNullOrEmpty(clientName))
                clientName = name;

            if (connectOnStart)
            {
                _client.Connect(clientID);
                Debug.Log("[" + name + "] Client connected to: " + brokerHostName);
            }

            if (subscribeOnStart)
            {
                Subscribe();
            }

            // Observables

            ConnectionClosedObs = Observable.FromEventPattern<MqttClient.ConnectionClosedEventHandler, EventArgs>(
            handler => handler.Invoke,
            handler => _client.ConnectionClosed += handler,
            handler => _client.ConnectionClosed -= handler)
            .Select(ev => ev.EventArgs);

            PublishObs = Observable.FromEventPattern<MqttClient.MqttMsgPublishedEventHandler, MqttMsgPublishedEventArgs>(
            handler => handler.Invoke,
            handler => _client.MqttMsgPublished += handler,
            handler => _client.MqttMsgPublished -= handler)
            .Select(ev => ev.EventArgs);

            PublishedObs = Observable.FromEventPattern<MqttClient.MqttMsgPublishEventHandler, MqttMsgPublishEventArgs>(
            handler => handler.Invoke,
            handler => _client.MqttMsgPublishReceived += handler,
            handler => _client.MqttMsgPublishReceived -= handler)
            .Select(ev => ev.EventArgs);

            SubscribedObs = Observable.FromEventPattern<MqttClient.MqttMsgSubscribedEventHandler, MqttMsgSubscribedEventArgs>(
            handler => handler.Invoke,
            handler => _client.MqttMsgSubscribed += handler,
            handler => _client.MqttMsgSubscribed -= handler)
            .Select(ev => ev.EventArgs);

            UnsubscribedObs = Observable.FromEventPattern<MqttClient.MqttMsgUnsubscribedEventHandler, MqttMsgUnsubscribedEventArgs>(
            handler => handler.Invoke,
            handler => _client.MqttMsgUnsubscribed += handler,
            handler => _client.MqttMsgUnsubscribed -= handler)
            .Select(ev => ev.EventArgs);

        }

        private void OnDestroy()
        {
            if (_client.IsConnected)
                _client.Disconnect();
        }

        public MqttClient Client
        {
            get { return _client; }
            private set { _client = value; }
        }

        // ##################################
        // ######## PROLOG UTILITIES ########
        // ##################################

        public void Subscribe()
        {
            var distinctTopics = topics.Distinct().ToArray();
            _client.Subscribe(distinctTopics, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
            Debug.Log("[" + name + "] Client subscribed to specified topics!");
            foreach (string topic in topics)
                Debug.Log("Topic: " + topic);
        }
    }

}