

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AiCatsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('HealthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_CATS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiCatsSDK.test()
    const ent = testsdk.Health()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'health.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"activityLevel","req":false,"short":"Activity level of the cat","type":"`$STRING`","index$":0},{"active":true,"name":"catId","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"ID of the cat","type":"`$STRING`","index$":1},{"active":true,"name":"heartRate","req":false,"short":"Heart rate in beats per minute","type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the health record","type":"`$STRING`","index$":3},{"active":true,"format":"float","name":"temperature","req":false,"short":"Body temperature in Celsius","type":"`$NUMBER`","index$":4},{"active":true,"format":"date-time","name":"timestamp","req":false,"short":"When the health data was recorded","type":"`$STRING`","index$":5},{"active":true,"format":"float","name":"weight","op":{"create":{"req":true,"type":"`$NUMBER`"}},"req":false,"short":"Weight of the cat in kg","type":"`$NUMBER`","index$":6}],"id":{"field":"id","name":"id"},"name":"health","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /cats/health","json":"{\"operationId\":\"recordCatHealth\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"activityLevel\":{\"description\":\"Activity level of the cat\",\"enum\":[\"low\",\"moderate\",\"high\"],\"type\":\"string\"},\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"heartRate\":{\"description\":\"Heart rate in beats per minute\",\"type\":\"integer\"},\"temperature\":{\"description\":\"Body temperature in Celsius\",\"format\":\"float\",\"type\":\"number\"},\"weight\":{\"description\":\"Weight of the cat in kg\",\"format\":\"float\",\"type\":\"number\"}},\"required\":[\"catId\",\"weight\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"activityLevel\":{\"description\":\"Activity level of the cat\",\"enum\":[\"low\",\"moderate\",\"high\"],\"type\":\"string\"},\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"heartRate\":{\"description\":\"Heart rate in beats per minute\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the health record\",\"type\":\"string\"},\"temperature\":{\"description\":\"Body temperature in Celsius\",\"format\":\"float\",\"type\":\"number\"},\"timestamp\":{\"description\":\"When the health data was recorded\",\"format\":\"date-time\",\"type\":\"string\"},\"weight\":{\"description\":\"Weight of the cat in kg\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Health data successfully recorded\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid input\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/cats/health","segments":[{"lit":"cats"},{"lit":"health"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cat_id","orig":"cat_id","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /cats/health","json":"{\"operationId\":\"getCatHealth\",\"parameters\":[{\"description\":\"Optional cat ID to filter health data\",\"in\":\"query\",\"name\":\"catId\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"activityLevel\":{\"description\":\"Activity level of the cat\",\"enum\":[\"low\",\"moderate\",\"high\"],\"type\":\"string\"},\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"heartRate\":{\"description\":\"Heart rate in beats per minute\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the health record\",\"type\":\"string\"},\"temperature\":{\"description\":\"Body temperature in Celsius\",\"format\":\"float\",\"type\":\"number\"},\"timestamp\":{\"description\":\"When the health data was recorded\",\"format\":\"date-time\",\"type\":\"string\"},\"weight\":{\"description\":\"Weight of the cat in kg\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful response with health data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cats/health","segments":[{"lit":"cats"},{"lit":"health"}],"select":{"exist":["cat_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"health","name__orig":"health","Name":"Health","name_":"health","name-":"health","NAME":"HEALTH","index$":2}, {"active":true,"entity":"health","key$":"BasicHealthFlow","kind":"basic","name":"BasicHealthFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"health_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"health_ref01","srcdatavar":"health_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-health_ref01"}}],"index$":1}]}, 'Health')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const health_ref01_ent = client.Health()
    let health_ref01_data = setup.data.new.health['health_ref01']

    health_ref01_data = (await health_ref01_ent.create(health_ref01_data)).data()
    assert(null != health_ref01_data.id)


    // LOAD
    const health_ref01_match_dt0: any = {}
    health_ref01_match_dt0.id = health_ref01_data.id
    const health_ref01_data_dt0 = (await health_ref01_ent.load(health_ref01_match_dt0)).data()
    assert(health_ref01_data_dt0.id === health_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/health/HealthTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AiCatsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['health01','health02','health03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_CATS_TEST_HEALTH_ENTID': idmap,
    'AI_CATS_TEST_LIVE': 'FALSE',
    'AI_CATS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_CATS_TEST_HEALTH_ENTID']

  const live = 'TRUE' === env.AI_CATS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_CATS_TEST_HEALTH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AiCatsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
