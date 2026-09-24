

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_CATS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiCatsSDK.test()
    const ent = testsdk.Cat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the image was generated","t":"`$STRING`","key$":"createdAt","index$":0},"height":{"a":true,"h":"Height","n":"height","r":false,"sh":"Height of the image in pixels","t":"`$INTEGER`","key$":"height","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the cat image","t":"`$STRING`","key$":"id","index$":2},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL of the AI-generated cat image","t":"`$STRING`","key$":"url","index$":3},"width":{"a":true,"h":"Width","n":"width","r":false,"sh":"Width of the image in pixels","t":"`$INTEGER`","key$":"width","index$":4}},"id":{"field":"id","name":"id"},"name":"cat","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /cats/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/cats/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"cats"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cat","name__orig":"cat","Name":"Cat","name_":"cat","name-":"cat","NAME":"CAT","index$":0}, {"active":true,"entity":"cat","key$":"BasicCatFlow","kind":"basic","name":"BasicCatFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"cat_ref01","srcdatavar":"cat_ref01_data","suffix":"_dt0"},"m":{"id":"cat01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cat_ref01"}}],"index$":0}]}, 'Cat', {"GET /cats/{id}":{"protocol":"http","operationId":"getCatById","responses":{"200":{"description":"Successful response with cat image","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier for the cat image","key$":"id","type":"string"},"url":{"description":"URL of the AI-generated cat image","format":"uri","key$":"url","type":"string"},"width":{"description":"Width of the image in pixels","key$":"width","type":"integer"},"height":{"description":"Height of the image in pixels","key$":"height","type":"integer"},"createdAt":{"description":"Timestamp when the image was generated","format":"date-time","key$":"createdAt","type":"string"}},"x-ref":"#/components/schemas/CatImage","index$":0}}}},"404":{"description":"Cat not found","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Unique identifier of the cat","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cat_ref01_data = Object.values(setup.data.existing.cat)[0] as any

    // LOAD
    const cat_ref01_ent = client.Cat()
    const cat_ref01_match_dt0: any = {}
    cat_ref01_match_dt0.id = cat_ref01_data.id
    const cat_ref01_data_dt0 = (await cat_ref01_ent.load(cat_ref01_match_dt0)).data()
    assert(cat_ref01_data_dt0.id === cat_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cat/CatTestData.json')

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
    ['cat01','cat02','cat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_CATS_TEST_CAT_ENTID': idmap,
    'AI_CATS_TEST_LIVE': 'FALSE',
    'AI_CATS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_CATS_TEST_CAT_ENTID']

  const live = 'TRUE' === env.AI_CATS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_CATS_TEST_CAT_ENTID']
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
  
