# AiCats SDK

Fetch, search, and find similar AI-generated cat images via a public HTTP API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About ai-cats API

[ai-cats](https://ai-cats.net/) is a free service that publishes AI-generated cat images (and videos) and exposes them through a small HTTP API at `https://ai-cats.net/api`. The community catalogue entry is on [Free Public APIs](https://freepublicapis.com/ai-cats-api).

What you can do with the API:

- Fetch a random cat image
- Look up a specific cat image by ID
- Find visually similar cat images
- Search the image collection with query parameters and get search completion suggestions
- List available themes and count images per theme
- Retrieve metadata for a given cat image

The API appears to be public and unauthenticated. CORS is enabled on some endpoints (notably theme listing and counts) and not on others. No license or rate-limit policy is published; observed response times are well under a second.

## Try it

**TypeScript**
```bash
npm install ai-cats
```

**Python**
```bash
pip install ai-cats-sdk
```

**PHP**
```bash
composer require voxgig/ai-cats-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ai-cats-sdk/go
```

**Ruby**
```bash
gem install ai-cats-sdk
```

**Lua**
```bash
luarocks install ai-cats-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AiCatsSDK } from 'ai-cats'

const client = new AiCatsSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ai-cats-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ai-cats": {
      "command": "/abs/path/to/ai-cats-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Cat** | A single cat record identifiable by ID, used for lookup and as the unit of search results. | `/cats/{id}` |
| **CatImage** | An AI-generated cat image with metadata, retrievable randomly, by ID, by similarity, or via search. | `/cats/random` |
| **Health** | Service-health information exposed by the API (the public catalogue tracks reliability and response times). | `/cats/health` |
| **Interaction** | Tracking of interactions with cat images, such as similarity matching and search completion suggestions. | `/interactions` |
| **Training** | Training-related grouping for the AI side of the service; no specific public endpoints are documented. | `/training` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from aicats_sdk import AiCatsSDK

client = AiCatsSDK({})


# Load a specific cat
cat, err = client.Cat(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'aicats_sdk.php';

$client = new AiCatsSDK([]);


// Load a specific cat
[$cat, $err] = $client->Cat(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ai-cats-sdk/go"

client := sdk.NewAiCatsSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AiCats_sdk"

client = AiCatsSDK.new({})


# Load a specific cat
cat, err = client.Cat(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ai-cats_sdk")

local client = sdk.new({})


-- Load a specific cat
local cat, err = client:Cat(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AiCatsSDK.test()
const result = await client.Cat().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AiCatsSDK.test(None, None)
result, err = client.Cat(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AiCatsSDK::test(null, null);
[$result, $err] = $client->Cat(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Cat(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AiCatsSDK.test(nil, nil)
result, err = client.Cat(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Cat(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the ai-cats API

- Upstream: [https://ai-cats.net/](https://ai-cats.net/)
- API docs: [https://ai-cats.net/api](https://ai-cats.net/api)

---

Generated from the ai-cats API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
