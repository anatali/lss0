using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace UnityActorSimulator
{

    public static class ReflectionExtensionMethods
    {
        /// <summary>
        /// Finds all non-abstract classes types that inherit from type T.
        /// Implementing IComparable is mandatory since the list is sorted.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static IList<Type> GetInheritedTypes(this Type instance)
        {
            List<Type> types = new List<Type>();
            foreach (Type type in
                Assembly.GetAssembly(instance).GetTypes()
                .Where(myType => myType.IsClass && !myType.IsAbstract && myType.IsSubclassOf(instance)))
            {
                types.Add(type);
            }
            types.Sort();
            return types;
        }

    }
}