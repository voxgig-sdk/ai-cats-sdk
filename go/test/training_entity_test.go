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

func TestTrainingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Training(nil)
		if ent == nil {
			t.Fatal("expected non-nil TrainingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := trainingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "training." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set AICATS_TEST_TRAINING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		trainingRef01Ent := client.Training(nil)
		trainingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "training"}, setup.data), "training_ref01"))

		trainingRef01DataResult, err := trainingRef01Ent.Create(trainingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		trainingRef01Data = core.ToMapAny(trainingRef01DataResult)
		if trainingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if trainingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		trainingRef01Match := map[string]any{}

		trainingRef01ListResult, err := trainingRef01Ent.List(trainingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		trainingRef01List, trainingRef01ListOk := trainingRef01ListResult.([]any)
		if !trainingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", trainingRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(trainingRef01List), map[string]any{"id": trainingRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func trainingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "training", "TrainingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read training test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse training test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"training01", "training02", "training03"},
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
	entidEnvRaw := os.Getenv("AICATS_TEST_TRAINING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AICATS_TEST_TRAINING_ENTID": idmap,
		"AICATS_TEST_LIVE":      "FALSE",
		"AICATS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["AICATS_TEST_TRAINING_ENTID"])
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
