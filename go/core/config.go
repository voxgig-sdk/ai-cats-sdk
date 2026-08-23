package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AiCats",
			"slug": "ai-cats",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://ai-cats.net/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cat": map[string]any{},
				"cat_image": map[string]any{},
				"health": map[string]any{},
				"interaction": map[string]any{},
				"training": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"short": "Timestamp when the image was generated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"short": "Height of the image in pixels",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the cat image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "URL of the AI-generated cat image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"short": "Width of the image in pixels",
						"type": "`$INTEGER`",
					},
				},
				"name": "cat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cats/{id}",
								"parts": []any{
									"cats",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"cat_image": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"short": "Timestamp when the image was generated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"short": "Height of the image in pixels",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the cat image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "URL of the AI-generated cat image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"short": "Width of the image in pixels",
						"type": "`$INTEGER`",
					},
				},
				"name": "cat_image",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/cats/random",
								"parts": []any{
									"cats",
									"random",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"health": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "activityLevel",
						"short": "Activity level of the cat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "catId",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "ID of the cat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "heartRate",
						"short": "Heart rate in beats per minute",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the health record",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temperature",
						"short": "Body temperature in Celsius",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "When the health data was recorded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weight",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$NUMBER`",
							},
						},
						"short": "Weight of the cat in kg",
						"type": "`$NUMBER`",
					},
				},
				"name": "health",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/cats/health",
								"parts": []any{
									"cats",
									"health",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cat_id",
											"orig": "cat_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cats/health",
								"parts": []any{
									"cats",
									"health",
								},
								"select": map[string]any{
									"exist": []any{
										"cat_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"interaction": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "catId",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "ID of the cat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"short": "Duration of the interaction in minutes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the interaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notes",
						"short": "Additional notes about the interaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quality",
						"short": "Quality rating of the interaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "When the interaction occurred",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "Type of interaction",
						"type": "`$STRING`",
					},
				},
				"name": "interaction",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/interactions",
								"parts": []any{
									"interactions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cat_id",
											"orig": "cat_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/interactions",
								"parts": []any{
									"interactions",
								},
								"select": map[string]any{
									"exist": []any{
										"cat_id",
										"end_date",
										"start_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"training": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "catId",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "ID of the cat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"req": true,
						"short": "Duration of the session in minutes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the training session",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notes",
						"short": "Additional notes about the training session",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"short": "Whether the training was successful",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "When the training session occurred",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "Type of training session",
						"type": "`$STRING`",
					},
				},
				"name": "training",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/training",
								"parts": []any{
									"training",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cat_id",
											"orig": "cat_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/training",
								"parts": []any{
									"training",
								},
								"select": map[string]any{
									"exist": []any{
										"cat_id",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
