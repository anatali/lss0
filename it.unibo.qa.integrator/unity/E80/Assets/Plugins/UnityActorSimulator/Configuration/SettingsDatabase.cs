using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;

namespace UnityActorSimulator
{
    /// <summary>
    /// Simple script that loads the actors' configurations from a set of json files.
    /// </summary>
    public class SettingsDatabase : Singleton<SettingsDatabase>
    {
        private static string BASE_DIRECTORY = Environment.CurrentDirectory + @"\Assets\Configurations\";

        [Header("Configuration")]
        public string[] sourceFiles;

        private readonly IDictionary<string, object> _settings = new Dictionary<string, object>();

        public IDictionary<string, object> Settings
        {
            get { return _settings; }
        }

        /// <summary>
        /// For each file and class type specified it loads the json file and stores the read data inside a dictionary.
        /// The key used is the actor's name (1 configuration per actor)
        /// </summary>
        protected override void Awake()
        {
            base.Awake();

            List<SettingsSetupInfo> setupInfos = new List<SettingsSetupInfo>();

            foreach (string sourceFile in sourceFiles)
            {
                setupInfos.AddRange(JsonHelper.LoadFromJsonFile<SettingsSetupInfo>(BASE_DIRECTORY + sourceFile).ToList<SettingsSetupInfo>());
            }

            foreach (SettingsSetupInfo setupInfo in setupInfos)
            {
                Type wrapperType = Type.GetType(setupInfo.jsonWrapper + "," + setupInfo.jsonWrapperAssembly);

                MethodInfo method = typeof(JsonHelper).GetMethod("LoadFromJsonFile").MakeGenericMethod(wrapperType);
                var retrievedData = method.Invoke(null, new object[] { BASE_DIRECTORY + setupInfo.filename }) as BaseActorSettings[];

                foreach (BaseActorSettings setting in retrievedData)
                {
                    Type mapperType = Type.GetType(setupInfo.mapper + "," + setupInfo.mapperAssembly);
                    var instance = Activator.CreateInstance(mapperType, new object[] { setting });
                    _settings.Add(setting.actorName, instance);
                }
            }
        }

        // Update is called once per frame
        void Update()
        {

        }
    }
}