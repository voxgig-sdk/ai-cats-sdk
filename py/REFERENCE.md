# AiCats Python SDK Reference

Complete API reference for the AiCats Python SDK.


## AiCatsSDK

### Constructor

```python
from aicats_sdk import AiCatsSDK

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
cat = client.Cat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `height` | `int` | No |  |
| `id` | `str` | No |  |
| `url` | `str` | No |  |
| `width` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cat().load({"id": "cat_id"})
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
cat_image = client.CatImage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `height` | `int` | No |  |
| `id` | `str` | No |  |
| `url` | `str` | No |  |
| `width` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CatImage().load({"id": "cat_image_id"})
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
health = client.Health()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity_level` | `str` | No |  |
| `cat_id` | `str` | No |  |
| `heart_rate` | `int` | No |  |
| `id` | `str` | No |  |
| `temperature` | `float` | No |  |
| `timestamp` | `str` | No |  |
| `weight` | `float` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Health().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Health().load({"id": "health_id"})
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
interaction = client.Interaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | `str` | Yes |  |
| `duration` | `int` | No |  |
| `id` | `str` | No |  |
| `note` | `str` | No |  |
| `quality` | `str` | No |  |
| `timestamp` | `str` | No |  |
| `type` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Interaction().create({
    "cat_id": "example_cat_id",  # str
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Interaction().list()
for interaction in results:
    print(interaction)
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
training = client.Training()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cat_id` | `str` | Yes |  |
| `duration` | `int` | Yes |  |
| `id` | `str` | No |  |
| `note` | `str` | No |  |
| `success` | `bool` | No |  |
| `timestamp` | `str` | No |  |
| `type` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Training().create({
    "cat_id": "example_cat_id",  # str
    "duration": 1,  # int
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Training().list()
for training in results:
    print(training)
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

