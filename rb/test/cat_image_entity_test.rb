# CatImage entity test

require "minitest/autorun"
require "json"
require_relative "../AiCats_sdk"
require_relative "runner"

class CatImageEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AiCatsSDK.test(nil, nil)
    ent = testsdk.CatImage(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = cat_image_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "cat_image." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set AI_CATS_TEST_CAT_IMAGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    cat_image_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.cat_image")))
    cat_image_ref01_data = nil
    if cat_image_ref01_data_raw.length > 0
      cat_image_ref01_data = Helpers.to_map(cat_image_ref01_data_raw[0][1])
    end

    # LOAD
    cat_image_ref01_ent = client.CatImage(nil)
    cat_image_ref01_match_dt0 = {
      "id" => cat_image_ref01_data["id"],
    }
    cat_image_ref01_data_dt0_loaded = cat_image_ref01_ent.load(cat_image_ref01_match_dt0, nil)
    cat_image_ref01_data_dt0_load_result = Helpers.to_map(cat_image_ref01_data_dt0_loaded.respond_to?(:data_get) ? cat_image_ref01_data_dt0_loaded.data_get : cat_image_ref01_data_dt0_loaded)
    assert !cat_image_ref01_data_dt0_load_result.nil?
    assert_equal cat_image_ref01_data_dt0_load_result["id"], cat_image_ref01_data["id"]

  end
end

def cat_image_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "cat_image", "CatImageTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AiCatsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["cat_image01", "cat_image02", "cat_image03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["AI_CATS_TEST_CAT_IMAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AI_CATS_TEST_CAT_IMAGE_ENTID" => idmap,
    "AI_CATS_TEST_LIVE" => "FALSE",
    "AI_CATS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["AI_CATS_TEST_CAT_IMAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AI_CATS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = AiCatsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AI_CATS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AI_CATS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
