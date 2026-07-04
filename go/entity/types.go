// Typed models for the AiCats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Cat is the typed data model for the cat entity.
type Cat struct {
	CreatedAt *string `json:"created_at,omitempty"`
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
	CreatedAt *string `json:"created_at,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
	Width *int `json:"width,omitempty"`
}

// CatImageLoadMatch mirrors the cat_image fields as an all-optional match
// filter (Go analog of Partial<CatImage>).
type CatImageLoadMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
	Width *int `json:"width,omitempty"`
}

// Health is the typed data model for the health entity.
type Health struct {
	ActivityLevel *string `json:"activity_level,omitempty"`
	CatId *string `json:"cat_id,omitempty"`
	HeartRate *int `json:"heart_rate,omitempty"`
	Id *string `json:"id,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// HealthLoadMatch mirrors the health fields as an all-optional match
// filter (Go analog of Partial<Health>).
type HealthLoadMatch struct {
	ActivityLevel *string `json:"activity_level,omitempty"`
	CatId *string `json:"cat_id,omitempty"`
	HeartRate *int `json:"heart_rate,omitempty"`
	Id *string `json:"id,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// HealthCreateData mirrors the health fields as an all-optional match
// filter (Go analog of Partial<Health>).
type HealthCreateData struct {
	ActivityLevel *string `json:"activity_level,omitempty"`
	CatId *string `json:"cat_id,omitempty"`
	HeartRate *int `json:"heart_rate,omitempty"`
	Id *string `json:"id,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// Interaction is the typed data model for the interaction entity.
type Interaction struct {
	CatId string `json:"cat_id"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Note *string `json:"note,omitempty"`
	Quality *string `json:"quality,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type string `json:"type"`
}

// InteractionListMatch mirrors the interaction fields as an all-optional match
// filter (Go analog of Partial<Interaction>).
type InteractionListMatch struct {
	CatId *string `json:"cat_id,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Note *string `json:"note,omitempty"`
	Quality *string `json:"quality,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type *string `json:"type,omitempty"`
}

// InteractionCreateData mirrors the interaction fields as an all-optional match
// filter (Go analog of Partial<Interaction>).
type InteractionCreateData struct {
	CatId *string `json:"cat_id,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Note *string `json:"note,omitempty"`
	Quality *string `json:"quality,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Training is the typed data model for the training entity.
type Training struct {
	CatId string `json:"cat_id"`
	Duration int `json:"duration"`
	Id *string `json:"id,omitempty"`
	Note *string `json:"note,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type string `json:"type"`
}

// TrainingListMatch mirrors the training fields as an all-optional match
// filter (Go analog of Partial<Training>).
type TrainingListMatch struct {
	CatId *string `json:"cat_id,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Note *string `json:"note,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TrainingCreateData mirrors the training fields as an all-optional match
// filter (Go analog of Partial<Training>).
type TrainingCreateData struct {
	CatId *string `json:"cat_id,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *string `json:"id,omitempty"`
	Note *string `json:"note,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Type *string `json:"type,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
