using System;
using System.IO;
using UnityEngine;

namespace UnityActorSimulator
{
    /// <summary>
    /// Json utility class for reading multiple json data (arrays).
    /// Added utility methods in order to save/load Json data to/from file.
    /// </summary>
    /// <see cref="http://stackoverflow.com/questions/36239705/serialize-and-deserialize-json-and-json-array-in-unity/36244111#36244111"/>
    public static class JsonHelper
    {
        public static T[] FromJson<T>(string json)
        {
            Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(json);
            return wrapper.Items;
        }

        public static string ToJson<T>(T[] array)
        {
            Wrapper<T> wrapper = new Wrapper<T>();
            wrapper.Items = array;
            return JsonUtility.ToJson(wrapper);
        }

        public static string ToJson<T>(T[] array, bool prettyPrint)
        {
            Wrapper<T> wrapper = new Wrapper<T>();
            wrapper.Items = array;
            return JsonUtility.ToJson(wrapper, prettyPrint);
        }

        public static T[] LoadFromJsonFile<T>(string filename)
        {
            if (File.Exists(filename))
            {
                if (filename.EndsWith(".json") == false)
                    throw new ArgumentException("Expected json file");

                Debug.Log("[JsonHelper] Opening file:" + filename);

                StreamReader reader = new StreamReader(filename);
                string jsonFile = reader.ReadToEnd();
                reader.Close();

                return JsonHelper.FromJson<T>(jsonFile);
            }
            else
            {
                Debug.LogWarning("[JsonHelper] File not found!");
                return null;
            }
        }

        public static void SaveToJsonFile<T>(string filename, T[] data)
        {
            SaveToJsonFile<T>(filename, data, false);
        }

        public static void SaveToJsonFile<T>(string filename, T[] data, bool prettyPrint)
        {
            if (filename.EndsWith(".json") == false)
                throw new ArgumentException("Expected json file");

            string jsonData = JsonHelper.ToJson<T>(data, true);
            File.WriteAllText(filename, jsonData);
        }

        [Serializable]
        private class Wrapper<T>
        {
            public T[] Items;
        }
    }
}