# AiCats Ruby SDK Reference

Complete API reference for the AiCats Ruby SDK.


## AiCatsSDK

### Constructor

```ruby
require_relative 'AiCats_sdk'

client = AiCatsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiCatsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AiCatsSDK.test
```


### Instance Methods

#### `Cat(data = nil)`

Create a new `Cat` entity instance. Pass `nil` for no initial data.

#### `CatImage(data = nil)`

Create a new `CatImage` entity instance. Pass `nil` for no initial data.

#### `Health(data = nil)`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `Interaction(data = nil)`

Create a new `Interaction` entity instance. Pass `nil` for no initial data.

#### `Training(data = nil)`

Create a new `Training` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CatEntity

```ruby
cat = client.Cat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `height` | `Integer` | No |  |
| `id` | `String` | No |  |
| `url` | `String` | No |  |
| `width` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cat.load({ "id" => "cat_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CatImageEntity

```ruby
cat_image = client.CatImage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `height` | `Integer` | No |  |
| `id` | `String` | No |  |
| `url` | `String` | No |  |
| `width` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CatImage.load({ "id" => "cat_image_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CatImageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HealthEntity

```ruby
health = client.Health
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity_level` | `String` | No |  |
| `cat_id` | `String` | No |  |
| `heart_rate` | `Integer` | No |  |
| `id` | `String` | No |  |
| `temperature` | `Float` | No |  |
| `timestamp` | `String` | No |  |
| `weight` | `Float` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Health.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Health.load({ "id" => "health_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InteractionEntity

```ruby
interaction = client.Interaction
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | `String` | Yes |  |
| `duration` | `Integer` | No |  |
| `id` | `String` | No |  |
| `note` | `String` | No |  |
| `quality` | `String` | No |  |
| `timestamp` | `String` | No |  |
| `type` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Interaction.create({
  "cat_id" => "example_cat_id", # String
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Interaction.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrainingEntity

```ruby
training = client.Training
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | `String` | Yes |  |
| `duration` | `Integer` | Yes |  |
| `id` | `String` | No |  |
| `note` | `String` | No |  |
| `success` | `Boolean` | No |  |
| `timestamp` | `String` | No |  |
| `type` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Training.create({
  "cat_id" => "example_cat_id", # String
  "duration" => 1, # Integer
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Training.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrainingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = AiCatsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

