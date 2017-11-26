using System;

namespace UnityActorSimulator
{
    /// <summary>
    ///  Simple class used to store actor configuration properties loaded from a json file
    /// </summary>
    [Serializable]
    public class SettingsSetupInfo
    {
        public static readonly string DEFAULT_ASSEMBLY = "Assembly-CSharp";
        public static readonly string DEFAULT_FILENAME = "";
        public static readonly string DEFAULT_TYPE = "";

        public string filename;
        public string jsonWrapper;
        public string jsonWrapperAssembly;
        public string mapper;
        public string mapperAssembly;

        public SettingsSetupInfo()
        {
            filename = DEFAULT_FILENAME;
            jsonWrapper = DEFAULT_TYPE;
            jsonWrapperAssembly = DEFAULT_ASSEMBLY;
            mapper = DEFAULT_TYPE;
            mapperAssembly = DEFAULT_ASSEMBLY;
        }

        public SettingsSetupInfo(string filename, string jsonWrapper, string mapper)
        {
            if (filename.EndsWith(".json") == false)
                throw new ArgumentException("Expected a json file");

            this.filename = filename;
            this.jsonWrapper = jsonWrapper;
            this.jsonWrapperAssembly = DEFAULT_ASSEMBLY;
            this.mapper = mapper;
            this.mapperAssembly = DEFAULT_ASSEMBLY;
        }

        public SettingsSetupInfo(string filename, string jsonWrapper, string jsonWrapperAssembly, string mapper, string mapperAssembly)
        {
            if (filename.EndsWith(".json") == false)
                throw new ArgumentException("Expected a json file");

            this.filename = filename;
            this.jsonWrapper = jsonWrapper;
            this.jsonWrapperAssembly = jsonWrapperAssembly;
            this.mapper = mapper;
            this.mapperAssembly = mapperAssembly;
        }

        public override string ToString()
        {
            return "Setup info: " + Environment.NewLine
                + "Filename: " + filename + Environment.NewLine
                + "Json Wrapper: " + jsonWrapper + Environment.NewLine
                + "Json Wrapper Assembly: " + jsonWrapperAssembly + Environment.NewLine
                + "Mapper: " + mapper + Environment.NewLine
                + "Mapper Assembly: " + mapperAssembly + Environment.NewLine;
        }

        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;

            if (obj is SettingsSetupInfo == false)
                return false;

            var converted = obj as SettingsSetupInfo;

            return converted.filename.Equals(this.filename)
                && converted.jsonWrapper.Equals(this.jsonWrapper)
                && converted.jsonWrapperAssembly.Equals(this.jsonWrapperAssembly)
                && converted.mapper.Equals(this.mapper)
                && converted.mapperAssembly.Equals(this.mapperAssembly);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}