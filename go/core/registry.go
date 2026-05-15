package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCatEntityFunc func(client *AiCatsSDK, entopts map[string]any) AiCatsEntity

var NewCatImageEntityFunc func(client *AiCatsSDK, entopts map[string]any) AiCatsEntity

var NewHealthEntityFunc func(client *AiCatsSDK, entopts map[string]any) AiCatsEntity

var NewInteractionEntityFunc func(client *AiCatsSDK, entopts map[string]any) AiCatsEntity

var NewTrainingEntityFunc func(client *AiCatsSDK, entopts map[string]any) AiCatsEntity

