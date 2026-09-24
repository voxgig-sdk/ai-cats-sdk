

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


describe('InteractionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_CATS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_CATS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiCatsSDK.test()
    const ent = testsdk.Interaction()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_CATS_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'interaction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"catId":{"a":true,"h":"Cat Id","n":"catId","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"ID of the cat","t":"`$STRING`","key$":"catId","index$":0},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"sh":"Duration of the interaction in minutes","t":"`$INTEGER`","key$":"duration","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the interaction","t":"`$STRING`","key$":"id","index$":2},"notes":{"a":true,"h":"Notes","n":"notes","r":false,"sh":"Additional notes about the interaction","t":"`$STRING`","key$":"notes","index$":3},"quality":{"a":true,"h":"Quality","n":"quality","r":false,"sh":"Quality rating of the interaction","t":"`$STRING`","key$":"quality","index$":4},"timestamp":{"a":true,"fo":"date-time","h":"Timestamp","n":"timestamp","r":false,"sh":"When the interaction occurred","t":"`$STRING`","key$":"timestamp","index$":5},"type":{"a":true,"h":"Type","n":"type","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Type of interaction","t":"`$STRING`","key$":"type","index$":6}},"id":{"field":"id","name":"id"},"name":"interaction","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /interactions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/interactions","q":{},"r":{},"s":[{"lit":"interactions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /interactions","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cat_id","or":"cat_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/interactions","q":{"exist":["cat_id","end_date","start_date"]},"r":{},"s":[{"lit":"interactions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"interaction","name__orig":"interaction","Name":"Interaction","name_":"interaction","name-":"interaction","NAME":"INTERACTION","index$":3}, {"active":true,"entity":"interaction","key$":"BasicInteractionFlow","kind":"basic","name":"BasicInteractionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"interaction_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"interaction_ref01"}}],"index$":1}]}, 'Interaction', {"POST /interactions":{"protocol":"http","operationId":"recordInteraction","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["catId","type"],"properties":{"catId":{"type":"string","description":"ID of the cat","key$":"catId"},"type":{"type":"string","enum":["play","feeding","grooming","medical"],"description":"Type of interaction","key$":"type"},"duration":{"type":"integer","description":"Duration of the interaction in minutes","key$":"duration"},"quality":{"type":"string","enum":["poor","fair","good","excellent"],"description":"Quality rating of the interaction","key$":"quality"},"notes":{"type":"string","description":"Additional notes about the interaction","key$":"notes"}},"x-ref":"#/components/schemas/InteractionInput","index$":1}}}},"responses":{"201":{"description":"Interaction successfully recorded","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Unique identifier for the interaction","key$":"id"},"catId":{"type":"string","description":"ID of the cat","key$":"catId"},"type":{"type":"string","enum":["play","feeding","grooming","medical"],"description":"Type of interaction","key$":"type"},"duration":{"type":"integer","description":"Duration of the interaction in minutes","key$":"duration"},"quality":{"type":"string","enum":["poor","fair","good","excellent"],"description":"Quality rating of the interaction","key$":"quality"},"notes":{"type":"string","description":"Additional notes about the interaction","key$":"notes"},"timestamp":{"type":"string","format":"date-time","description":"When the interaction occurred","key$":"timestamp"}},"x-ref":"#/components/schemas/Interaction"}}}},"400":{"description":"Invalid input","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /interactions":{"protocol":"http","operationId":"getInteractions","responses":{"200":{"description":"Successful response with interaction data","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique identifier for the interaction","key$":"id"},"catId":{"type":"string","description":"ID of the cat","key$":"catId"},"type":{"type":"string","enum":["play","feeding","grooming","medical"],"description":"Type of interaction","key$":"type"},"duration":{"type":"integer","description":"Duration of the interaction in minutes","key$":"duration"},"quality":{"type":"string","enum":["poor","fair","good","excellent"],"description":"Quality rating of the interaction","key$":"quality"},"notes":{"type":"string","description":"Additional notes about the interaction","key$":"notes"},"timestamp":{"type":"string","format":"date-time","description":"When the interaction occurred","key$":"timestamp"}},"x-ref":"#/components/schemas/Interaction","index$":0}}}}}},"parameters":[{"name":"catId","in":"query","required":false,"description":"Filter by cat ID","schema":{"type":"string"},"index$":0},{"name":"startDate","in":"query","required":false,"description":"Start date for filtering interactions","schema":{"type":"string","format":"date-time"},"index$":1},{"name":"endDate","in":"query","required":false,"description":"End date for filtering interactions","schema":{"type":"string","format":"date-time"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const interaction_ref01_ent = client.Interaction()
    let interaction_ref01_data = setup.data.new.interaction['interaction_ref01']

    interaction_ref01_data = (await interaction_ref01_ent.create(interaction_ref01_data)).data()
    assert(null != interaction_ref01_data.id)


    // LIST
    const interaction_ref01_match: any = {}

    const interaction_ref01_list = (await interaction_ref01_ent.list(interaction_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(interaction_ref01_list, { id: interaction_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/interaction/InteractionTestData.json')

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
    ['interaction01','interaction02','interaction03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_CATS_TEST_INTERACTION_ENTID': idmap,
    'AI_CATS_TEST_LIVE': 'FALSE',
    'AI_CATS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_CATS_TEST_INTERACTION_ENTID']

  const live = 'TRUE' === env.AI_CATS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_CATS_TEST_INTERACTION_ENTID']
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
  
