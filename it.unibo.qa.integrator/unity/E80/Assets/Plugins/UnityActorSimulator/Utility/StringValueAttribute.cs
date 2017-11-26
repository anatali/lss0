using System;
using System.Collections;
using System.Reflection;

namespace UnityActorSimulator
{

    /// <summary>
    /// Simple attribute in order to associate a string value to an enum value
    /// </summary>
    /// <see cref="https://www.codeproject.com/Articles/11130/String-Enumerations-in-C"/>
    public class StringValueAttribute : System.Attribute
    {
        private static Hashtable _stringValues = new Hashtable();

        private string _value;

        public StringValueAttribute(string value)
        {
            _value = value;
        }

        public string Value
        {
            get { return _value; }
        }

        public static string GetStringValue(Enum value)
        {
            string output = null;
            Type type = value.GetType();

            //Check first in our cached results...
            if (_stringValues.ContainsKey(value))
                output = (_stringValues[value] as StringValueAttribute).Value;
            else
            {
                //Look for our 'StringValueAttribute' in the field's custom attributes
                FieldInfo fi = type.GetField(value.ToString());
                StringValueAttribute[] attrs = fi.GetCustomAttributes(typeof(StringValueAttribute), false) as StringValueAttribute[];

                if (attrs.Length > 0)
                {
                    _stringValues.Add(value, attrs[0]);
                    output = attrs[0].Value;
                }
            }

            return output;
        }

    }
}