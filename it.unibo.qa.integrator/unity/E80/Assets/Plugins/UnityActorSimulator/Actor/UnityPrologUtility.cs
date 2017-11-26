using System;
using System.Linq;
using UniRx;
using UnityEngine;

namespace UnityActorSimulator
{
    /// <summary>
    /// Implements some utility methods used by:
    ///     1. Prolog theories
    ///     2. C# classes that work with prolog strings
    /// </summary>
    public static class UnityPrologUtility
    {
        private static string MESSAGE_TERM_IDENTIFIER = "msg";

        private static int _sequenceNumber = 0;

        public static event EventHandler<EventArgs> notifyData;
        public static IObservable<EventArgs> inputObs { get; private set; }

        static UnityPrologUtility()
        {
            inputObs = Observable.FromEventPattern<EventHandler<EventArgs>, EventArgs>(
            handler => handler.Invoke,
            handler => notifyData += handler,
            handler => notifyData -= handler)
            .Select(ev => ev.EventArgs);
        }

        public static int SequenceNumber
        {
            get
            {
                _sequenceNumber += 1;
                return _sequenceNumber;
            }

            private set
            {
                _sequenceNumber = value;
            }
        }

        public static void NotifyData(EventArgs data)
        {
            if (notifyData != null)
                notifyData(null, data);
        }

        public static Quaternion CreateQuaternion(float x, float y, float z, float w)
        {
            return new Quaternion(x, y, z, w);
        }

        public static string BuildEvent(string eventID, string emitter, PrologConvertible payload)
        {
            return MESSAGE_TERM_IDENTIFIER +
                "(" +
                eventID + "," +
                StringValueAttribute.GetStringValue(MessageType.Event) + "," +
                emitter + "," +
                "none" + "," +
                payload.GetPrologRepresentation() + "," +
                SequenceNumber + ")";
        }

        public static string BuildEvent(string eventID, string emitter, string prologPayload)
        {
            return MESSAGE_TERM_IDENTIFIER +
                "(" +
                eventID + "," +
                StringValueAttribute.GetStringValue(MessageType.Event) + "," +
                emitter + "," +
                "none" + "," +
                prologPayload + "," +
                SequenceNumber + ")";
        }

        public static string BuildMessage(string messageID, string sender, string destination, MessageType type, PrologConvertible payload)
        {
            return MESSAGE_TERM_IDENTIFIER +
                "(" +
                messageID + "," +
                StringValueAttribute.GetStringValue(type) + "," +
                sender + "," +
                destination + "," +
                payload.GetPrologRepresentation() + "," +
                SequenceNumber + ")";
        }

        public static string BuildMessage(string messageID, string sender, string destination, MessageType type, string prologPayload)
        {
            return MESSAGE_TERM_IDENTIFIER +
                "(" +
                messageID + "," +
                StringValueAttribute.GetStringValue(type) + "," +
                sender + "," +
                destination + "," +
                prologPayload + "," +
                SequenceNumber + ")";
        }
    }

    public enum MessageType
    {
        [StringValue("dispatch")]
        Dispatch,
        [StringValue("request")]
        Request,
        [StringValue("answer")]
        Answer,
        [StringValue("terminateSystem")]
        EndSystem,
        [StringValue("event")]
        Event
    }
}