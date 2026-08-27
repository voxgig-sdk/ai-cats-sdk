# AiCats PHP SDK Reference

Complete API reference for the AiCats PHP SDK.


## AiCatsSDK

### Constructor

```php
require_once __DIR__ . '/aicats_sdk.php';

$client = new AiCatsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiCatsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AiCatsSDK::test();
```


### Instance Methods

#### `Cat($data = null)`

Create a new `CatEntity` instance. Pass `null` for no initial data.

#### `CatImage($data = null)`

Create a new `CatImageEntity` instance. Pass `null` for no initial data.

#### `Health($data = null)`

Create a new `HealthEntity` instance. Pass `null` for no initial data.

#### `Interaction($data = null)`

Create a new `InteractionEntity` instance. Pass `null` for no initial data.

#### `Training($data = null)`

Create a new `TrainingEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AiCatsUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CatEntity

```php
$cat = $client->Cat();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Cat()->load(["id" => "cat_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CatEntity`

Create a new `CatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CatImageEntity

```php
$cat_image = $client->CatImage();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CatImage()->load(["id" => "cat_image_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CatImageEntity`

Create a new `CatImageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HealthEntity

```php
$health = $client->Health();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activityLevel` | `string` | No | Activity level of the cat |
| `catId` | `string` | No | ID of the cat |
| `heartRate` | `int` | No | Heart rate in beats per minute |
| `id` | `string` | No | Unique identifier for the health record |
| `temperature` | `float` | No | Body temperature in Celsius |
| `timestamp` | `string` | No | When the health data was recorded |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Health()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Health()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HealthEntity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InteractionEntity

```php
$interaction = $client->Interaction();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Interaction()->create([
  "catId" => null, // string
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Interaction()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InteractionEntity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrainingEntity

```php
$training = $client->Training();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Training()->create([
  "catId" => null, // string
  "duration" => null, // int
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Training()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrainingEntity`

Create a new `TrainingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new AiCatsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

