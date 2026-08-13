// Typed models for the AiCats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ai-cats-sdk/go/core"
)

// Cat is the typed data model for the cat entity.
type Cat struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
	Width *int `json:"width,omitempty"`
}

// CatLoadMatch is the typed request payload for Cat.LoadTyped.
type CatLoadMatch struct {
	Id string `json:"id"`
}

// CatImage is the typed data model for the cat_image entity.
type CatImage struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
	Width *int `json:"width,omitempty"`
}

// CatImageLoadMatch is the typed request payload for CatImage.LoadTyped.
type CatImageLoadMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Height *int `json:"height,omitempty"`
	Id string `json:"id"`
	Url *string `json:"url,omitempty"`
	Width *int `json:"width,omitempty"`
}

// Health is the typed data model for the health entity.
type Health struct {
	ActivityLevel *string `json:"activityLevel,omitempty"`
	CatId *string `json:"catId,omitempty"`
	HeartRate *int `json:"heartRate,omitempty"`
	Id *string `json:"id,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	ActivityLevel *string `json:"activityLevel,omitempty"`
	CatId *string `json:"catId,omitempty"`
	HeartRate *int `json:"heartRate,omitempty"`
	Id string `json:"id"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// HealthCreateData is the typed request payload for Health.CreateTyped.
type HealthCreateData struct {
	ActivityLevel *string `json:"activityLevel,omitempty"`
	CatId *string `json:"catId,omitempty"`
	HeartRate *int `json:"heartRate,omitempty"`
	Id *string `json:"id,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// Interaction is the typed data model for the interaction entity.
type Interaction struct {
	CatId string `json:"catId"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Quality *string `json:"quality,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type string `json:"type"`
}

// InteractionListMatch is the typed request payload for Interaction.ListTyped.
type InteractionListMatch struct {
	CatId *string `json:"catId,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Quality *string `json:"quality,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type *string `json:"type,omitempty"`
}

// InteractionCreateData is the typed request payload for Interaction.CreateTyped.
type InteractionCreateData struct {
	CatId string `json:"catId"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Quality *string `json:"quality,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type string `json:"type"`
}

// Training is the typed data model for the training entity.
type Training struct {
	CatId string `json:"catId"`
	Duration int `json:"duration"`
	Id *string `json:"id,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type string `json:"type"`
}

// TrainingListMatch is the typed request payload for Training.ListTyped.
type TrainingListMatch struct {
	CatId *string `json:"catId,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TrainingCreateData is the typed request payload for Training.CreateTyped.
type TrainingCreateData struct {
	CatId string `json:"catId"`
	Duration int `json:"duration"`
	Id *string `json:"id,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type string `json:"type"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
