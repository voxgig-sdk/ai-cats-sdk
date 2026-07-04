# AiCats PHP SDK Reference

Complete API reference for the AiCats PHP SDK.


## AiCatsSDK

### Constructor

```php
require_once __DIR__ . '/ai-cats_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
| `created_at` | ``$STRING`` | No |  |
| `height` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `width` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Cat()->load(["id" => "cat_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CatEntity`

Create a new `CatEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CatImageEntity

```php
$cat_image = $client->CatImage();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CatImage()->load(["id" => "cat_image_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CatImageEntity`

Create a new `CatImageEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HealthEntity

```php
$health = $client->Health();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Health()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Health()->load(["id" => "health_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HealthEntity`

Create a new `HealthEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InteractionEntity

```php
$interaction = $client->Interaction();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Interaction()->create([
  "cat_id" => /* `$STRING` */,
  "type" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Interaction()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InteractionEntity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TrainingEntity

```php
$training = $client->Training();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Training()->create([
  "cat_id" => /* `$STRING` */,
  "duration" => /* `$INTEGER` */,
  "type" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Training()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TrainingEntity`

Create a new `TrainingEntity` instance with the same client and
options.

#### `getName(): string`

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

