

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


describe('TrainingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_CATS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiCatsSDK.test()
    const ent = testsdk.Training()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'training.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"catId","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"short":"ID of the cat","type":"`$STRING`","index$":0},{"active":true,"name":"duration","op":{"list":{"req":false,"type":"`$INTEGER`"}},"req":true,"short":"Duration of the session in minutes","type":"`$INTEGER`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the training session","type":"`$STRING`","index$":2},{"active":true,"name":"notes","req":false,"short":"Additional notes about the training session","type":"`$STRING`","index$":3},{"active":true,"name":"success","req":false,"short":"Whether the training was successful","type":"`$BOOLEAN`","index$":4},{"active":true,"format":"date-time","name":"timestamp","req":false,"short":"When the training session occurred","type":"`$STRING`","index$":5},{"active":true,"name":"type","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"short":"Type of training session","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"training","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /training","json":"{\"operationId\":\"createTrainingSession\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the session in minutes\",\"type\":\"integer\"},\"notes\":{\"description\":\"Additional notes about the training session\",\"type\":\"string\"},\"success\":{\"description\":\"Whether the training was successful\",\"type\":\"boolean\"},\"type\":{\"description\":\"Type of training session\",\"type\":\"string\"}},\"required\":[\"catId\",\"type\",\"duration\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the session in minutes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the training session\",\"type\":\"string\"},\"notes\":{\"description\":\"Additional notes about the training session\",\"type\":\"string\"},\"success\":{\"description\":\"Whether the training was successful\",\"type\":\"boolean\"},\"timestamp\":{\"description\":\"When the training session occurred\",\"format\":\"date-time\",\"type\":\"string\"},\"type\":{\"description\":\"Type of training session\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Training session successfully created\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid input\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/training","segments":[{"lit":"training"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cat_id","orig":"cat_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /training","json":"{\"operationId\":\"getTrainingSessions\",\"parameters\":[{\"description\":\"Filter by cat ID\",\"in\":\"query\",\"name\":\"catId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"catId\":{\"description\":\"ID of the cat\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the session in minutes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the training session\",\"type\":\"string\"},\"notes\":{\"description\":\"Additional notes about the training session\",\"type\":\"string\"},\"success\":{\"description\":\"Whether the training was successful\",\"type\":\"boolean\"},\"timestamp\":{\"description\":\"When the training session occurred\",\"format\":\"date-time\",\"type\":\"string\"},\"type\":{\"description\":\"Type of training session\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with training sessions\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/training","segments":[{"lit":"training"}],"select":{"exist":["cat_id","limit"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"training","name__orig":"training","Name":"Training","name_":"training","name-":"training","NAME":"TRAINING","index$":4}, {"active":true,"entity":"training","key$":"BasicTrainingFlow","kind":"basic","name":"BasicTrainingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"training_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"training_ref01"}}],"index$":1}]}, 'Training')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const training_ref01_ent = client.Training()
    let training_ref01_data = setup.data.new.training['training_ref01']

    training_ref01_data = (await training_ref01_ent.create(training_ref01_data)).data()
    assert(null != training_ref01_data.id)


    // LIST
    const training_ref01_match: any = {}

    const training_ref01_list = (await training_ref01_ent.list(training_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(training_ref01_list, { id: training_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/training/TrainingTestData.json')

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
    ['training01','training02','training03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_CATS_TEST_TRAINING_ENTID': idmap,
    'AI_CATS_TEST_LIVE': 'FALSE',
    'AI_CATS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_CATS_TEST_TRAINING_ENTID']

  const live = 'TRUE' === env.AI_CATS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_CATS_TEST_TRAINING_ENTID']
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
  
