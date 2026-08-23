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
| `createdAt` | `str` | No | Timestamp when the image was generated |
| `height` | `int` | No | Height of the image in pixels |
| `id` | `str` | No | Unique identifier for the cat image |
| `url` | `str` | No | URL of the AI-generated cat image |
| `width` | `int` | No | Width of the image in pixels |

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
| `createdAt` | `str` | No | Timestamp when the image was generated |
| `height` | `int` | No | Height of the image in pixels |
| `id` | `str` | No | Unique identifier for the cat image |
| `url` | `str` | No | URL of the AI-generated cat image |
| `width` | `int` | No | Width of the image in pixels |

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
| `activityLevel` | `str` | No | Activity level of the cat |
| `catId` | `str` | No | ID of the cat |
| `heartRate` | `int` | No | Heart rate in beats per minute |
| `id` | `str` | No | Unique identifier for the health record |
| `temperature` | `float` | No | Body temperature in Celsius |
| `timestamp` | `str` | No | When the health data was recorded |
| `weight` | `float` | No | Weight of the cat in kg |

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
| `catId` | `str` | Yes | ID of the cat |
| `duration` | `int` | No | Duration of the interaction in minutes |
| `id` | `str` | No | Unique identifier for the interaction |
| `notes` | `str` | No | Additional notes about the interaction |
| `quality` | `str` | No | Quality rating of the interaction |
| `timestamp` | `str` | No | When the interaction occurred |
| `type` | `str` | Yes | Type of interaction |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Interaction().create({
    "catId": "example_catId",  # str
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
| `catId` | `str` | Yes | ID of the cat |
| `duration` | `int` | Yes | Duration of the session in minutes |
| `id` | `str` | No | Unique identifier for the training session |
| `notes` | `str` | No | Additional notes about the training session |
| `success` | `bool` | No | Whether the training was successful |
| `timestamp` | `str` | No | When the training session occurred |
| `type` | `str` | Yes | Type of training session |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Training().create({
    "catId": "example_catId",  # str
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

