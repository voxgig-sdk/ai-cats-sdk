"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('InteractionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AI_CATS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AiCatsSDK.test();
        const ent = testsdk.Interaction();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'interaction.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "catId", "op": { "list": { "req": false, "type": "`$STRING`" } }, "req": true, "short": "ID of the cat", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "duration", "req": false, "short": "Duration of the interaction in minutes", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the interaction", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "notes", "req": false, "short": "Additional notes about the interaction", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "quality", "req": false, "short": "Quality rating of the interaction", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "timestamp", "req": false, "short": "When the interaction occurred", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "type", "op": { "list": { "req": false, "type": "`$STRING`" } }, "req": true, "short": "Type of interaction", "type": "`$STRING`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "interaction", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /interactions", "json": "{\"operationId\":\"recordInteraction\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the interaction in minutes\",\"type\":\"integer\"},\"notes\":{\"description\":\"Additional notes about the interaction\",\"type\":\"string\"},\"quality\":{\"description\":\"Quality rating of the interaction\",\"enum\":[\"poor\",\"fair\",\"good\",\"excellent\"],\"type\":\"string\"},\"type\":{\"description\":\"Type of interaction\",\"enum\":[\"play\",\"feeding\",\"grooming\",\"medical\"],\"type\":\"string\"}},\"required\":[\"catId\",\"type\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the interaction in minutes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the interaction\",\"type\":\"string\"},\"notes\":{\"description\":\"Additional notes about the interaction\",\"type\":\"string\"},\"quality\":{\"description\":\"Quality rating of the interaction\",\"enum\":[\"poor\",\"fair\",\"good\",\"excellent\"],\"type\":\"string\"},\"timestamp\":{\"description\":\"When the interaction occurred\",\"format\":\"date-time\",\"type\":\"string\"},\"type\":{\"description\":\"Type of interaction\",\"enum\":[\"play\",\"feeding\",\"grooming\",\"medical\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Interaction successfully recorded\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid input\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/interactions", "segments": [{ "lit": "interactions" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "cat_id", "orig": "cat_id", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "end_date", "orig": "end_date", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "start_date", "orig": "start_date", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /interactions", "json": "{\"operationId\":\"getInteractions\",\"parameters\":[{\"description\":\"Filter by cat ID\",\"in\":\"query\",\"name\":\"catId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date for filtering interactions\",\"in\":\"query\",\"name\":\"startDate\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End date for filtering interactions\",\"in\":\"query\",\"name\":\"endDate\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the interaction in minutes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the interaction\",\"type\":\"string\"},\"notes\":{\"description\":\"Additional notes about the interaction\",\"type\":\"string\"},\"quality\":{\"description\":\"Quality rating of the interaction\",\"enum\":[\"poor\",\"fair\",\"good\",\"excellent\"],\"type\":\"string\"},\"timestamp\":{\"description\":\"When the interaction occurred\",\"format\":\"date-time\",\"type\":\"string\"},\"type\":{\"description\":\"Type of interaction\",\"enum\":[\"play\",\"feeding\",\"grooming\",\"medical\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with interaction data\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/interactions", "segments": [{ "lit": "interactions" }], "select": { "exist": ["cat_id", "end_date", "start_date"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "interaction", "name__orig": "interaction", "Name": "Interaction", "name_": "interaction", "name-": "interaction", "NAME": "INTERACTION", "index$": 3 }, { "active": true, "entity": "interaction", "key$": "BasicInteractionFlow", "kind": "basic", "name": "BasicInteractionFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "interaction_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "interaction_ref01" } }], "index$": 1 }] }, 'Interaction');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const interaction_ref01_ent = client.Interaction();
        let interaction_ref01_data = setup.data.new.interaction['interaction_ref01'];
        interaction_ref01_data = (await interaction_ref01_ent.create(interaction_ref01_data)).data();
        (0, node_assert_1.default)(null != interaction_ref01_data.id);
        // LIST
        const interaction_ref01_match = {};
        const interaction_ref01_list = (await interaction_ref01_ent.list(interaction_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(interaction_ref01_list, { id: interaction_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/interaction/InteractionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AiCatsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['interaction01', 'interaction02', 'interaction03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AI_CATS_TEST_INTERACTION_ENTID': idmap,
        'AI_CATS_TEST_LIVE': 'FALSE',
        'AI_CATS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AI_CATS_TEST_INTERACTION_ENTID'];
    const live = 'TRUE' === env.AI_CATS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AI_CATS_TEST_INTERACTION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AiCatsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AI_CATS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=InteractionEntity.test.js.map