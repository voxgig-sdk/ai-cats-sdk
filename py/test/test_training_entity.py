# Training entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from aicats_sdk import AiCatsSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestTrainingEntity:

    def test_should_create_instance(self):
        testsdk = AiCatsSDK.test(None, None)
        ent = testsdk.Training(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _training_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "training." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set AICATS_TEST_TRAINING_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        training_ref01_ent = client.Training(None)
        training_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.training"), "training_ref01"))

        training_ref01_data_result, err = training_ref01_ent.create(training_ref01_data, None)
        assert err is None
        training_ref01_data = helpers.to_map(training_ref01_data_result)
        assert training_ref01_data is not None
        assert training_ref01_data["id"] is not None

        # LIST
        training_ref01_match = {}

        training_ref01_list_result, err = training_ref01_ent.list(training_ref01_match, None)
        assert err is None
        assert isinstance(training_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(training_ref01_list_result),
            {"id": training_ref01_data["id"]})
        assert not vs.isempty(found_item)



def _training_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/training/TrainingTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AiCatsSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["training01", "training02", "training03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "AICATS_TEST_TRAINING_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "AICATS_TEST_TRAINING_ENTID": idmap,
        "AICATS_TEST_LIVE": "FALSE",
        "AICATS_TEST_EXPLAIN": "FALSE",
        "AICATS_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("AICATS_TEST_TRAINING_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("AICATS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("AICATS_APIKEY"),
            },
            extra or {},
        ])
        client = AiCatsSDK(helpers.to_map(merged_opts))

    _live = env.get("AICATS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("AICATS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
