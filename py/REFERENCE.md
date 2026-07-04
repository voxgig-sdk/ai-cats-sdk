# AiCats Python SDK Reference

Complete API reference for the AiCats Python SDK.


## AiCatsSDK

### Constructor

```python
from ai-cats_sdk import AiCatsSDK

client = AiCatsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiCatsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AiCatsSDK.test()
```


### Instance Methods

#### `Cat(data=None)`

Create a new `CatEntity` instance. Pass `None` for no initial data.

#### `CatImage(data=None)`

Create a new `CatImageEntity` instance. Pass `None` for no initial data.

#### `Health(data=None)`

Create a new `HealthEntity` instance. Pass `None` for no initial data.

#### `Interaction(data=None)`

Create a new `InteractionEntity` instance. Pass `None` for no initial data.

#### `Training(data=None)`

Create a new `TrainingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CatEntity

```python
cat = client.cat
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.cat.load({"id": "cat_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CatImageEntity

```python
cat_image = client.cat_image
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.cat_image.load({"id": "cat_image_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatImageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HealthEntity

```python
health = client.health
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.health.create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.health.load({"id": "health_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InteractionEntity

```python
interaction = client.interaction
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.interaction.create({
    "cat_id": # `$STRING`,
    "type": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.interaction.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InteractionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrainingEntity

```python
training = client.training
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.training.create({
    "cat_id": # `$STRING`,
    "duration": # `$INTEGER`,
    "type": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.training.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrainingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = AiCatsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

