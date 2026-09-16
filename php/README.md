# AiCats PHP SDK



The PHP SDK for the AiCats API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Cat()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ai-cats-sdk/releases](https://github.com/voxgig-sdk/ai-cats-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'aicats_sdk.php';

$client = new AiCatsSDK();
```

### 3. Load a cat

```php
try {
    // load() returns the ENTITY — call data_get() for the Cat record (throws on error).
    $cat = $client->Cat()->load(["id" => "example_id"]);
    print_r($cat->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $trainings = $client->Training()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = AiCatsSDK::test([
    "entity" => ["cat" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$cat = $client->Cat()->load(["id" => "test01"]);
print_r($cat->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new AiCatsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
AI_CATS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### AiCatsSDK

```php
require_once 'aicats_sdk.php';
$client = new AiCatsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = AiCatsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### AiCatsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Cat` | `($data): CatEntity` | Create a Cat entity instance. |
| `CatImage` | `($data): CatImageEntity` | Create a CatImage entity instance. |
| `Health` | `($data): HealthEntity` | Create a Health entity instance. |
| `Interaction` | `($data): InteractionEntity` | Create an Interaction entity instance. |
| `Training` | `($data): TrainingEntity` | Create a Training entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Cat

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp when the image was generated |
| `height` | Height of the image in pixels |
| `id` | Unique identifier for the cat image |
| `url` | URL of the AI-generated cat image |
| `width` | Width of the image in pixels |

Operations: Load.

API path: `/cats/{id}`

#### CatImage

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp when the image was generated |
| `height` | Height of the image in pixels |
| `id` | Unique identifier for the cat image |
| `url` | URL of the AI-generated cat image |
| `width` | Width of the image in pixels |

Operations: Load.

API path: `/cats/random`

#### Health

| Field | Description |
| --- | --- |
| `activityLevel` | Activity level of the cat |
| `catId` | ID of the cat |
| `heartRate` | Heart rate in beats per minute |
| `id` | Unique identifier for the health record |
| `temperature` | Body temperature in Celsius |
| `timestamp` | When the health data was recorded |
| `weight` | Weight of the cat in kg |

Operations: Create, Load.

API path: `/cats/health`

#### Interaction

| Field | Description |
| --- | --- |
| `catId` | ID of the cat |
| `duration` | Duration of the interaction in minutes |
| `id` | Unique identifier for the interaction |
| `notes` | Additional notes about the interaction |
| `quality` | Quality rating of the interaction |
| `timestamp` | When the interaction occurred |
| `type` | Type of interaction |

Operations: Create, List.

API path: `/interactions`

#### Training

| Field | Description |
| --- | --- |
| `catId` | ID of the cat |
| `duration` | Duration of the session in minutes |
| `id` | Unique identifier for the training session |
| `notes` | Additional notes about the training session |
| `success` | Whether the training was successful |
| `timestamp` | When the training session occurred |
| `type` | Type of training session |

Operations: Create, List.

API path: `/training`



## Entities


### Cat

Create an instance: `$cat = $client->Cat();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the image was generated |
| `height` | `int` | Height of the image in pixels |
| `id` | `string` | Unique identifier for the cat image |
| `url` | `string` | URL of the AI-generated cat image |
| `width` | `int` | Width of the image in pixels |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Cat record (throws on error).
$cat = $client->Cat()->load(["id" => "cat_id"]);
```


### CatImage

Create an instance: `$cat_image = $client->CatImage();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the image was generated |
| `height` | `int` | Height of the image in pixels |
| `id` | `string` | Unique identifier for the cat image |
| `url` | `string` | URL of the AI-generated cat image |
| `width` | `int` | Width of the image in pixels |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CatImage record (throws on error).
$cat_image = $client->CatImage()->load(["id" => "cat_image_id"]);
```


### Health

Create an instance: `$health = $client->Health();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activityLevel` | `string` | Activity level of the cat |
| `catId` | `string` | ID of the cat |
| `heartRate` | `int` | Heart rate in beats per minute |
| `id` | `string` | Unique identifier for the health record |
| `temperature` | `float` | Body temperature in Celsius |
| `timestamp` | `string` | When the health data was recorded |
| `weight` | `float` | Weight of the cat in kg |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Health record (throws on error).
$health = $client->Health()->load();
```

#### Example: Create

```php
$health = $client->Health()->create([
]);
```


### Interaction

Create an instance: `$interaction = $client->Interaction();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `catId` | `string` | ID of the cat |
| `duration` | `int` | Duration of the interaction in minutes |
| `id` | `string` | Unique identifier for the interaction |
| `notes` | `string` | Additional notes about the interaction |
| `quality` | `string` | Quality rating of the interaction |
| `timestamp` | `string` | When the interaction occurred |
| `type` | `string` | Type of interaction |

#### Example: List

```php
// list() returns an array of Interaction records (throws on error).
$interactions = $client->Interaction()->list();
```

#### Example: Create

```php
$interaction = $client->Interaction()->create([
    "catId" => null, // string
    "type" => null, // string
]);
```


### Training

Create an instance: `$training = $client->Training();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `catId` | `string` | ID of the cat |
| `duration` | `int` | Duration of the session in minutes |
| `id` | `string` | Unique identifier for the training session |
| `notes` | `string` | Additional notes about the training session |
| `success` | `bool` | Whether the training was successful |
| `timestamp` | `string` | When the training session occurred |
| `type` | `string` | Type of training session |

#### Example: List

```php
// list() returns an array of Training records (throws on error).
$trainings = $client->Training()->list();
```

#### Example: Create

```php
$training = $client->Training()->create([
    "catId" => null, // string
    "duration" => null, // int
    "type" => null, // string
]);
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── aicats_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`aicats_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$training = $client->Training();
$training->list();

// $training->data_get() now returns the training data from the last list
// $training->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
