package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ai-cats-sdk/go"
	"github.com/voxgig-sdk/ai-cats-sdk/go/core"

	vs "github.com/voxgig-sdk/ai-cats-sdk/go/utility/struct"
)

func TestHealthEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Health(nil)
		if ent == nil {
			t.Fatal("expected non-nil HealthEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := healthBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "health." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AICATS_TEST_HEALTH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		healthRef01Ent := client.Health(nil)
		healthRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "health"}, setup.data), "health_ref01"))

		healthRef01DataResult, err := healthRef01Ent.Create(healthRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		healthRef01Data = core.ToMapAny(healthRef01DataResult)
		if healthRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if healthRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		healthRef01MatchDt0 := map[string]any{
			"id": healthRef01Data["id"],
		}
		healthRef01DataDt0Loaded, err := healthRef01Ent.Load(healthRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		healthRef01DataDt0LoadResult := core.ToMapAny(healthRef01DataDt0Loaded)
		if healthRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if healthRef01DataDt0LoadResult["id"] != healthRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func healthBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "health", "HealthTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read health test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse health test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"health01", "health02", "health03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AICATS_TEST_HEALTH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AICATS_TEST_HEALTH_ENTID": idmap,
		"AICATS_TEST_LIVE":      "FALSE",
		"AICATS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["AICATS_TEST_HEALTH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AICATS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewAiCatsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AICATS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AICATS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
