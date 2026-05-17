package voxgigaicatssdk

import (
	"github.com/voxgig-sdk/ai-cats-sdk/go/core"
	"github.com/voxgig-sdk/ai-cats-sdk/go/entity"
	"github.com/voxgig-sdk/ai-cats-sdk/go/feature"
	_ "github.com/voxgig-sdk/ai-cats-sdk/go/utility"
)

// Type aliases preserve external API.
type AiCatsSDK = core.AiCatsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AiCatsEntity = core.AiCatsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AiCatsError = core.AiCatsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCatEntityFunc = func(client *core.AiCatsSDK, entopts map[string]any) core.AiCatsEntity {
		return entity.NewCatEntity(client, entopts)
	}
	core.NewCatImageEntityFunc = func(client *core.AiCatsSDK, entopts map[string]any) core.AiCatsEntity {
		return entity.NewCatImageEntity(client, entopts)
	}
	core.NewHealthEntityFunc = func(client *core.AiCatsSDK, entopts map[string]any) core.AiCatsEntity {
		return entity.NewHealthEntity(client, entopts)
	}
	core.NewInteractionEntityFunc = func(client *core.AiCatsSDK, entopts map[string]any) core.AiCatsEntity {
		return entity.NewInteractionEntity(client, entopts)
	}
	core.NewTrainingEntityFunc = func(client *core.AiCatsSDK, entopts map[string]any) core.AiCatsEntity {
		return entity.NewTrainingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAiCatsSDK = core.NewAiCatsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
