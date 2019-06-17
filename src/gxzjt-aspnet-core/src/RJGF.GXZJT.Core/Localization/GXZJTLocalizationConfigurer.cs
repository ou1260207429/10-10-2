using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace RJGF.GXZJT.Localization
{
    public static class GXZJTLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(GXZJTConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(GXZJTLocalizationConfigurer).GetAssembly(),
                        "RJGF.GXZJT.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
