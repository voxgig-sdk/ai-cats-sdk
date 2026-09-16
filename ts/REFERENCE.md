# AiCats TypeScript SDK Reference

Complete API reference for the AiCats TypeScript SDK.


## AiCatsSDK

### Constructor

```ts
new AiCatsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiCatsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AiCatsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AiCatsSDK` instance in test mode.


### Instance Methods

#### `Cat(data?: object)`

Create a new `Cat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CatEntity` instance.

#### `CatImage(data?: object)`

Create a new `CatImage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CatImageEntity` instance.

#### `Health(data?: object)`

Create a new `Health` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthEntity` instance.

#### `Interaction(data?: object)`

Create a new `Interaction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InteractionEntity` instance.

#### `Training(data?: object)`

Create a new `Training` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrainingEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `AiCatsSDK.test()`.

**Returns:** `AiCatsSDK` instance in test mode.


---

## CatEntity

```ts
const cat = client.Cat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Timestamp when the image was generated |
| `height` | `number` | No | Height of the image in pixels |
| `id` | `string` | No | Unique identifier for the cat image |
| `url` | `string` | No | URL of the AI-generated cat image |
| `width` | `number` | No | Width of the image in pixels |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cat().load({ id: 'cat_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CatEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiCatsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CatImageEntity

```ts
const cat_image = client.CatImage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Timestamp when the image was generated |
| `height` | `number` | No | Height of the image in pixels |
| `id` | `string` | No | Unique identifier for the cat image |
| `url` | `string` | No | URL of the AI-generated cat image |
| `width` | `number` | No | Width of the image in pixels |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CatImage().load({ id: 'cat_image_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CatImageEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiCatsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthEntity

```ts
const health = client.Health()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activityLevel` | `string` | No | Activity level of the cat |
| `catId` | `string` | No | ID of the cat |
| `heartRate` | `number` | No | Heart rate in beats per minute |
| `id` | `string` | No | Unique identifier for the health record |
| `temperature` | `number` | No | Body temperature in Celsius |
| `timestamp` | `string` | No | When the health data was recorded |
| `weight` | `number` | No | Weight of the cat in kg |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Health().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Health().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiCatsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InteractionEntity

```ts
const interaction = client.Interaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `catId` | `string` | Yes | ID of the cat |
| `duration` | `number` | No | Duration of the interaction in minutes |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Interaction().create({
  catId: 'example_catId',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Interaction().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InteractionEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiCatsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrainingEntity

```ts
const training = client.Training()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `catId` | `string` | Yes | ID of the cat |
| `duration` | `number` | Yes | Duration of the session in minutes |
| `id` | `string` | No | Unique identifier for the training session |
| `notes` | `string` | No | Additional notes about the training session |
| `success` | `boolean` | No | Whether the training was successful |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Training().create({
  catId: 'example_catId',
  duration: 1,
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Training().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrainingEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiCatsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new AiCatsSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

