# AiCats Ruby SDK



The Ruby SDK for the AiCats API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ai-cats-sdk/releases](https://github.com/voxgig-sdk/ai-cats-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "AiCats_sdk"

client = AiCatsSDK.new
```

### 3. Load a cat

```ruby
begin
  # load returns the bare Cat record (raises on error).
  cat = client.Cat.load({ "id" => "example_id" })
  puts cat
rescue => err
  warn "load failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = AiCatsSDK.test({
  "entity" => { "cat" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
cat = client.Cat.load({ "id" => "test01" })
puts cat
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = AiCatsSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AI_CATS_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### AiCatsSDK

```ruby
require_relative "AiCats_sdk"
client = AiCatsSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = AiCatsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AiCatsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Cat` | `(data) -> CatEntity` | Create a Cat entity instance. |
| `CatImage` | `(data) -> CatImageEntity` | Create a CatImage entity instance. |
| `Health` | `(data) -> HealthEntity` | Create a Health entity instance. |
| `Interaction` | `(data) -> InteractionEntity` | Create an Interaction entity instance. |
| `Training` | `(data) -> TrainingEntity` | Create a Training entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `AiCatsError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Cat

| Field | Description |
| --- | --- |
| `created_at` |  |
| `height` |  |
| `id` |  |
| `url` |  |
| `width` |  |

Operations: Load.

API path: `/cats/{id}`

#### CatImage

| Field | Description |
| --- | --- |
| `created_at` |  |
| `height` |  |
| `id` |  |
| `url` |  |
| `width` |  |

Operations: Load.

API path: `/cats/random`

#### Health

| Field | Description |
| --- | --- |
| `activity_level` |  |
| `cat_id` |  |
| `heart_rate` |  |
| `id` |  |
| `temperature` |  |
| `timestamp` |  |
| `weight` |  |

Operations: Create, Load.

API path: `/cats/health`

#### Interaction

| Field | Description |
| --- | --- |
| `cat_id` |  |
| `duration` |  |
| `id` |  |
| `note` |  |
| `quality` |  |
| `timestamp` |  |
| `type` |  |

Operations: Create, List.

API path: `/interactions`

#### Training

| Field | Description |
| --- | --- |
| `cat_id` |  |
| `duration` |  |
| `id` |  |
| `note` |  |
| `success` |  |
| `timestamp` |  |
| `type` |  |

Operations: Create, List.

API path: `/training`



## Entities


### Cat

Create an instance: `cat = client.Cat`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `height` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `width` | ``$INTEGER`` |  |

#### Example: Load

```ruby
# load returns the bare Cat record (raises on error).
cat = client.Cat.load({ "id" => "cat_id" })
```


### CatImage

Create an instance: `cat_image = client.CatImage`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `height` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `width` | ``$INTEGER`` |  |

#### Example: Load

```ruby
# load returns the bare CatImage record (raises on error).
cat_image = client.CatImage.load({ "id" => "cat_image_id" })
```


### Health

Create an instance: `health = client.Health`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity_level` | ``$STRING`` |  |
| `cat_id` | ``$STRING`` |  |
| `heart_rate` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `temperature` | ``$NUMBER`` |  |
| `timestamp` | ``$STRING`` |  |
| `weight` | ``$NUMBER`` |  |

#### Example: Load

```ruby
# load returns the bare Health record (raises on error).
health = client.Health.load({ "id" => "health_id" })
```

#### Example: Create

```ruby
health = client.Health.create({
})
```


### Interaction

Create an instance: `interaction = client.Interaction`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cat_id` | ``$STRING`` |  |
| `duration` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `note` | ``$STRING`` |  |
| `quality` | ``$STRING`` |  |
| `timestamp` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ruby
# list returns an Array of Interaction records (raises on error).
interactions = client.Interaction.list
```

#### Example: Create

```ruby
interaction = client.Interaction.create({
  "cat_id" => nil, # `$STRING`
  "type" => nil, # `$STRING`
})
```


### Training

Create an instance: `training = client.Training`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cat_id` | ``$STRING`` |  |
| `duration` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `note` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `timestamp` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ruby
# list returns an Array of Training records (raises on error).
trainings = client.Training.list
```

#### Example: Create

```ruby
training = client.Training.create({
  "cat_id" => nil, # `$STRING`
  "duration" => nil, # `$INTEGER`
  "type" => nil, # `$STRING`
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── AiCats_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`AiCats_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
cat = client.Cat
cat.load({ "id" => "example_id" })

# cat.data_get now returns the loaded cat data
# cat.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
