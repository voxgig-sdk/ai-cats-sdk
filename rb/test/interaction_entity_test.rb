# Interaction entity test

require "minitest/autorun"
require "json"
require_relative "../AiCats_sdk"
require_relative "runner"

class InteractionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AiCatsSDK.test(nil, nil)
    ent = testsdk.Interaction(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = interaction_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "interaction." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set AICATS_TEST_INTERACTION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    interaction_ref01_ent = client.Interaction(nil)
    interaction_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.interaction"), "interaction_ref01"))

    interaction_ref01_data_result, err = interaction_ref01_ent.create(interaction_ref01_data, nil)
    assert_nil err
    interaction_ref01_data = Helpers.to_map(interaction_ref01_data_result)
    assert !interaction_ref01_data.nil?
    assert !interaction_ref01_data["id"].nil?

    # LIST
    interaction_ref01_match = {}

    interaction_ref01_list_result, err = interaction_ref01_ent.list(interaction_ref01_match, nil)
    assert_nil err
    assert interaction_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(interaction_ref01_list_result),
      { "id" => interaction_ref01_data["id"] })
    assert !Vs.isempty(found_item)

  end
end

def interaction_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "interaction", "InteractionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AiCatsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["interaction01", "interaction02", "interaction03"],
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
  entid_env_raw = ENV["AICATS_TEST_INTERACTION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AICATS_TEST_INTERACTION_ENTID" => idmap,
    "AICATS_TEST_LIVE" => "FALSE",
    "AICATS_TEST_EXPLAIN" => "FALSE",
    "AICATS_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["AICATS_TEST_INTERACTION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AICATS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["AICATS_APIKEY"],
      },
      extra || {},
    ])
    client = AiCatsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AICATS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AICATS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
