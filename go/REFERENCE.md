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
| `createdAt` | `string` | No | Timestamp when the image was generated |
| `height` | `int` | No | Height of the image in pixels |
| `id` | `string` | No | Unique identifier for the cat image |
| `url` | `string` | No | URL of the AI-generated cat image |
| `width` | `int` | No | Width of the image in pixels |

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
| `createdAt` | `string` | No | Timestamp when the image was generated |
| `height` | `int` | No | Height of the image in pixels |
| `id` | `string` | No | Unique identifier for the cat image |
| `url` | `string` | No | URL of the AI-generated cat image |
| `width` | `int` | No | Width of the image in pixels |

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
| `activityLevel` | `string` | No | Activity level of the cat |
| `catId` | `string` | No | ID of the cat |
| `heartRate` | `int` | No | Heart rate in beats per minute |
| `id` | `string` | No | Unique identifier for the health record |
| `temperature` | `float64` | No | Body temperature in Celsius |
| `timestamp` | `string` | No | When the health data was recorded |
| `weight` | `float64` | No | Weight of the cat in kg |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `activityLevel` | - | - |
| `catId` | - | Yes |
| `heartRate` | - | - |
| `id` | - | - |
| `temperature` | - | - |
| `timestamp` | - | - |
| `weight` | - | Yes |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Health(nil).Load(nil, nil)
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
| `catId` | `string` | Yes | ID of the cat |
| `duration` | `int` | No | Duration of the interaction in minutes |
| `id` | `string` | No | Unique identifier for the interaction |
| `notes` | `string` | No | Additional notes about the interaction |
| `quality` | `string` | No | Quality rating of the interaction |
| `timestamp` | `string` | No | When the interaction occurred |
| `type` | `string` | Yes | Type of interaction |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `catId` | Yes | - |
| `duration` | - | - |
| `id` | - | - |
| `notes` | - | - |
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
    "catId": "example_catId",
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
| `catId` | `string` | Yes | ID of the cat |
| `duration` | `int` | Yes | Duration of the session in minutes |
| `id` | `string` | No | Unique identifier for the training session |
| `notes` | `string` | No | Additional notes about the training session |
| `success` | `bool` | No | Whether the training was successful |
| `timestamp` | `string` | No | When the training session occurred |
| `type` | `string` | Yes | Type of training session |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `catId` | Yes | - |
| `duration` | Yes | - |
| `id` | - | - |
| `notes` | - | - |
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
    "catId": "example_catId",
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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

