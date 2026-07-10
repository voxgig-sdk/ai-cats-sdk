# AiCats Golang SDK Reference

Complete API reference for the AiCats Golang SDK.


## AiCatsSDK

### Constructor

```go
func NewAiCatsSDK(options map[string]any) *AiCatsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *AiCatsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *AiCatsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Cat(data map[string]any) AiCatsEntity`

Create a new `Cat` entity instance. Pass `nil` for no initial data.

#### `CatImage(data map[string]any) AiCatsEntity`

Create a new `CatImage` entity instance. Pass `nil` for no initial data.

#### `Health(data map[string]any) AiCatsEntity`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `Interaction(data map[string]any) AiCatsEntity`

Create a new `Interaction` entity instance. Pass `nil` for no initial data.

#### `Training(data map[string]any) AiCatsEntity`

Create a new `Training` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CatEntity

```go
cat := client.Cat(nil)
fmt.Println(cat.GetName()) // "cat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `height` | `int` | No |  |
| `id` | `string` | No |  |
| `url` | `string` | No |  |
| `width` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Cat(nil).Load(map[string]any{"id": "cat_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CatImageEntity

```go
catImage := client.CatImage(nil)
fmt.Println(catImage.GetName()) // "cat_image"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `height` | `int` | No |  |
| `id` | `string` | No |  |
| `url` | `string` | No |  |
| `width` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CatImage(nil).Load(map[string]any{"id": "cat_image_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CatImageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HealthEntity

```go
health := client.Health(nil)
fmt.Println(health.GetName()) // "health"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity_level` | `string` | No |  |
| `cat_id` | `string` | No |  |
| `heart_rate` | `int` | No |  |
| `id` | `string` | No |  |
| `temperature` | `float64` | No |  |
| `timestamp` | `string` | No |  |
| `weight` | `float64` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `activity_level` | - | - |
| `cat_id` | - | Yes |
| `heart_rate` | - | - |
| `id` | - | - |
| `temperature` | - | - |
| `timestamp` | - | - |
| `weight` | - | Yes |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Health(nil).Load(map[string]any{"id": "health_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Health(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InteractionEntity

```go
interaction := client.Interaction(nil)
fmt.Println(interaction.GetName()) // "interaction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | `string` | Yes |  |
| `duration` | `int` | No |  |
| `id` | `string` | No |  |
| `note` | `string` | No |  |
| `quality` | `string` | No |  |
| `timestamp` | `string` | No |  |
| `type` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `cat_id` | Yes | - |
| `duration` | - | - |
| `id` | - | - |
| `note` | - | - |
| `quality` | - | - |
| `timestamp` | - | - |
| `type` | Yes | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Interaction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Interaction(nil).Create(map[string]any{
    "cat_id": "example_cat_id",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrainingEntity

```go
training := client.Training(nil)
fmt.Println(training.GetName()) // "training"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | `string` | Yes |  |
| `duration` | `int` | Yes |  |
| `id` | `string` | No |  |
| `note` | `string` | No |  |
| `success` | `bool` | No |  |
| `timestamp` | `string` | No |  |
| `type` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `cat_id` | Yes | - |
| `duration` | Yes | - |
| `id` | - | - |
| `note` | - | - |
| `success` | - | - |
| `timestamp` | - | - |
| `type` | Yes | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Training(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Training(nil).Create(map[string]any{
    "cat_id": "example_cat_id",
    "duration": 1,
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrainingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewAiCatsSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

