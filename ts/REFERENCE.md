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
| `createdAt` | `string` | No |  |
| `height` | `number` | No |  |
| `id` | `string` | No |  |
| `url` | `string` | No |  |
| `width` | `number` | No |  |

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
| `createdAt` | `string` | No |  |
| `height` | `number` | No |  |
| `id` | `string` | No |  |
| `url` | `string` | No |  |
| `width` | `number` | No |  |

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
| `activityLevel` | `string` | No |  |
| `catId` | `string` | No |  |
| `heartRate` | `number` | No |  |
| `id` | `string` | No |  |
| `temperature` | `number` | No |  |
| `timestamp` | `string` | No |  |
| `weight` | `number` | No |  |

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
const result = await client.Health().load({ id: 'health_id' })
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
| `catId` | `string` | Yes |  |
| `duration` | `number` | No |  |
| `id` | `string` | No |  |
| `notes` | `string` | No |  |
| `quality` | `string` | No |  |
| `timestamp` | `string` | No |  |
| `type` | `string` | Yes |  |

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
| `catId` | `string` | Yes |  |
| `duration` | `number` | Yes |  |
| `id` | `string` | No |  |
| `notes` | `string` | No |  |
| `success` | `boolean` | No |  |
| `timestamp` | `string` | No |  |
| `type` | `string` | Yes |  |

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new AiCatsSDK({
  feature: {
    test: { active: true },
  }
})
```

