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

func TestCatImageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CatImage(nil)
		if ent == nil {
			t.Fatal("expected non-nil CatImageEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := cat_imageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cat_image." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set AICATS_TEST_CAT_IMAGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		catImageRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.cat_image", setup.data)))
		var catImageRef01Data map[string]any
		if len(catImageRef01DataRaw) > 0 {
			catImageRef01Data = core.ToMapAny(catImageRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = catImageRef01Data

		// LOAD
		catImageRef01Ent := client.CatImage(nil)
		catImageRef01MatchDt0 := map[string]any{
			"id": catImageRef01Data["id"],
		}
		catImageRef01DataDt0Loaded, err := catImageRef01Ent.Load(catImageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		catImageRef01DataDt0LoadResult := core.ToMapAny(catImageRef01DataDt0Loaded)
		if catImageRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if catImageRef01DataDt0LoadResult["id"] != catImageRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func cat_imageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cat_image", "CatImageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cat_image test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cat_image test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"cat_image01", "cat_image02", "cat_image03"},
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
	entidEnvRaw := os.Getenv("AICATS_TEST_CAT_IMAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AICATS_TEST_CAT_IMAGE_ENTID": idmap,
		"AICATS_TEST_LIVE":      "FALSE",
		"AICATS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["AICATS_TEST_CAT_IMAGE_ENTID"])
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
