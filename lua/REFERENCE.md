# AiCats Lua SDK Reference

Complete API reference for the AiCats Lua SDK.


## AiCatsSDK

### Constructor

```lua
local sdk = require("ai-cats_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Cat(data)`

Create a new `Cat` entity instance. Pass `nil` for no initial data.

#### `CatImage(data)`

Create a new `CatImage` entity instance. Pass `nil` for no initial data.

#### `Health(data)`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `Interaction(data)`

Create a new `Interaction` entity instance. Pass `nil` for no initial data.

#### `Training(data)`

Create a new `Training` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CatEntity

```lua
local cat = client:cat(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `height` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `width` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:cat():load({ id = "cat_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CatImageEntity

```lua
local cat_image = client:cat_image(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `height` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `width` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:cat_image():load({ id = "cat_image_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatImageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HealthEntity

```lua
local health = client:health(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity_level` | ``$STRING`` | No |  |
| `cat_id` | ``$STRING`` | No |  |
| `heart_rate` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `temperature` | ``$NUMBER`` | No |  |
| `timestamp` | ``$STRING`` | No |  |
| `weight` | ``$NUMBER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `activity_level` | - | - | - | - | - |
| `cat_id` | - | - | Yes | - | - |
| `heart_rate` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `temperature` | - | - | - | - | - |
| `timestamp` | - | - | - | - | - |
| `weight` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:health():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:health():load({ id = "health_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InteractionEntity

```lua
local interaction = client:interaction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | ``$STRING`` | Yes |  |
| `duration` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `note` | ``$STRING`` | No |  |
| `quality` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `cat_id` | - | Yes | - | - | - |
| `duration` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `note` | - | - | - | - | - |
| `quality` | - | - | - | - | - |
| `timestamp` | - | - | - | - | - |
| `type` | - | Yes | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:interaction():create({
  cat_id = --[[ `$STRING` ]],
  type = --[[ `$STRING` ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:interaction():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TrainingEntity

```lua
local training = client:training(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | ``$STRING`` | Yes |  |
| `duration` | ``$INTEGER`` | Yes |  |
| `id` | ``$STRING`` | No |  |
| `note` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `timestamp` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `cat_id` | - | Yes | - | - | - |
| `duration` | - | Yes | - | - | - |
| `id` | - | - | - | - | - |
| `note` | - | - | - | - | - |
| `success` | - | - | - | - | - |
| `timestamp` | - | - | - | - | - |
| `type` | - | Yes | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:training():create({
  cat_id = --[[ `$STRING` ]],
  duration = --[[ `$INTEGER` ]],
  type = --[[ `$STRING` ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:training():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrainingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

