# ai-cats API

The ai-cats API provides access to various functionalities related to AI and cat management, offering features such as training, health monitoring, and interaction tracking. Users can utilize this API to integrate intelligent cat care solutions into their applications.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 8 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Cat

Results: Successful response with cat image.

SDK operations: `load`.

Key fields to recognise:

- `createdAt`: Timestamp when the image was generated
- `height`: Height of the image in pixels
- `id`: Unique identifier for the cat image
- `url`: URL of the AI-generated cat image
- `width`: Width of the image in pixels

### CatImage

Results: Successful response with cat image.

SDK operations: `load`.

Key fields to recognise:

- `createdAt`: Timestamp when the image was generated
- `height`: Height of the image in pixels
- `id`: Unique identifier for the cat image
- `url`: URL of the AI-generated cat image
- `width`: Width of the image in pixels

### Health

Results: Health data successfully recorded; Successful response with health data.

SDK operations: `create`, `load`.

Key fields to recognise:

- `activityLevel`: Activity level of the cat
- `catId`: ID of the cat
- `heartRate`: Heart rate in beats per minute
- `id`: Unique identifier for the health record
- `temperature`: Body temperature in Celsius

### Interaction

Results: Interaction successfully recorded; Successful response with interaction data.

SDK operations: `create`, `list`.

Key fields to recognise:

- `catId`: ID of the cat
- `duration`: Duration of the interaction in minutes
- `id`: Unique identifier for the interaction
- `notes`: Additional notes about the interaction
- `quality`: Quality rating of the interaction

### Training

Results: Training session successfully created; Successful response with training sessions.

SDK operations: `create`, `list`.

Key fields to recognise:

- `catId`: ID of the cat
- `duration`: Duration of the session in minutes
- `id`: Unique identifier for the training session
- `notes`: Additional notes about the training session
- `success`: Whether the training was successful

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Cat | `load` | `GET /cats/{id}` | See reference |
| CatImage | `load` | `GET /cats/random` | See reference |
| Health | `create` | `POST /cats/health` | See reference |
| Health | `load` | `GET /cats/health` | See reference |
| Interaction | `create` | `POST /interactions` | See reference |
| Interaction | `list` | `GET /interactions` | See reference |
| Training | `create` | `POST /training` | See reference |
| Training | `list` | `GET /training` | See reference |

## Connect to the API

- Production server: `https://ai-cats.net/api`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `ai-cats_list`: List records for an entity. Supported entities: `interaction`, `training`.
- `ai-cats_load`: Load one record for an entity. Supported entities: `cat`, `cat_image`, `health`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

