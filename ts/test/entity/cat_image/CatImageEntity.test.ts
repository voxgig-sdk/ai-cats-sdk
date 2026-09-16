

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


describe('CatImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_CATS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiCatsSDK.test()
    const ent = testsdk.CatImage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cat_image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Timestamp when the image was generated","type":"`$STRING`","index$":0},{"active":true,"name":"height","req":false,"short":"Height of the image in pixels","type":"`$INTEGER`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the cat image","type":"`$STRING`","index$":2},{"active":true,"format":"uri","name":"url","req":false,"short":"URL of the AI-generated cat image","type":"`$STRING`","index$":3},{"active":true,"name":"width","req":false,"short":"Width of the image in pixels","type":"`$INTEGER`","index$":4}],"id":{"field":"id","name":"id"},"name":"cat_image","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /cats/random","json":"{\"operationId\":\"getRandomCat\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the image was generated\",\"format\":\"date-time\",\"type\":\"string\"},\"height\":{\"description\":\"Height of the image in pixels\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the cat image\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the AI-generated cat image\",\"format\":\"uri\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the image in pixels\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with cat image\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cats/random","segments":[{"lit":"cats"},{"lit":"random"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cat_image","name__orig":"cat_image","Name":"CatImage","name_":"cat_image","name-":"cat-image","NAME":"CAT_IMAGE","index$":1}, {"active":true,"entity":"cat_image","key$":"BasicCatImageFlow","kind":"basic","name":"BasicCatImageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"cat_image_ref01","srcdatavar":"cat_image_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cat_image_ref01"}}],"index$":0}]}, 'CatImage')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cat_image_ref01_data = Object.values(setup.data.existing.cat_image)[0] as any

    // LOAD
    const cat_image_ref01_ent = client.CatImage()
    const cat_image_ref01_match_dt0: any = {}
    cat_image_ref01_match_dt0.id = cat_image_ref01_data.id
    const cat_image_ref01_data_dt0 = (await cat_image_ref01_ent.load(cat_image_ref01_match_dt0)).data()
    assert(cat_image_ref01_data_dt0.id === cat_image_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cat_image/CatImageTestData.json')

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
    ['cat_image01','cat_image02','cat_image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_CATS_TEST_CAT_IMAGE_ENTID': idmap,
    'AI_CATS_TEST_LIVE': 'FALSE',
    'AI_CATS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_CATS_TEST_CAT_IMAGE_ENTID']

  const live = 'TRUE' === env.AI_CATS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_CATS_TEST_CAT_IMAGE_ENTID']
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
  
