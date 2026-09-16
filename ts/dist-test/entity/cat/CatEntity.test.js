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
(0, node_test_1.describe)('CatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AI_CATS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AiCatsSDK.test();
        const ent = testsdk.Cat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "createdAt", "req": false, "short": "Timestamp when the image was generated", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "height", "req": false, "short": "Height of the image in pixels", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the cat image", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "uri", "name": "url", "req": false, "short": "URL of the AI-generated cat image", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "width", "req": false, "short": "Width of the image in pixels", "type": "`$INTEGER`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "cat", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /cats/{id}", "json": "{\"operationId\":\"getCatById\",\"parameters\":[{\"description\":\"Unique identifier of the cat\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the image was generated\",\"format\":\"date-time\",\"type\":\"string\"},\"height\":{\"description\":\"Height of the image in pixels\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the cat image\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the AI-generated cat image\",\"format\":\"uri\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the image in pixels\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with cat image\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Cat not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cats/{id}", "segments": [{ "lit": "cats" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "cat", "name__orig": "cat", "Name": "Cat", "name_": "cat", "name-": "cat", "NAME": "CAT", "index$": 0 }, { "active": true, "entity": "cat", "key$": "BasicCatFlow", "kind": "basic", "name": "BasicCatFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "cat_ref01", "srcdatavar": "cat_ref01_data", "suffix": "_dt0" }, "match": { "id": "cat01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cat_ref01" } }], "index$": 0 }] }, 'Cat');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let cat_ref01_data = Object.values(setup.data.existing.cat)[0];
        // LOAD
        const cat_ref01_ent = client.Cat();
        const cat_ref01_match_dt0 = {};
        cat_ref01_match_dt0.id = cat_ref01_data.id;
        const cat_ref01_data_dt0 = (await cat_ref01_ent.load(cat_ref01_match_dt0)).data();
        (0, node_assert_1.default)(cat_ref01_data_dt0.id === cat_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cat/CatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AiCatsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cat01', 'cat02', 'cat03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AI_CATS_TEST_CAT_ENTID': idmap,
        'AI_CATS_TEST_LIVE': 'FALSE',
        'AI_CATS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AI_CATS_TEST_CAT_ENTID'];
    const live = 'TRUE' === env.AI_CATS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AI_CATS_TEST_CAT_ENTID'];
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
//# sourceMappingURL=CatEntity.test.js.map