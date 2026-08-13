<?php
declare(strict_types=1);

// CatImage entity test

require_once __DIR__ . '/../aicats_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CatImageEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AiCatsSDK::test(null, null);
        $ent = $testsdk->CatImage(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = cat_image_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "cat_image." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AI_CATS_TEST_CAT_IMAGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $cat_image_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.cat_image")));
        $cat_image_ref01_data = null;
        if (count($cat_image_ref01_data_raw) > 0) {
            $cat_image_ref01_data = Helpers::to_map($cat_image_ref01_data_raw[0][1]);
        }

        // LOAD
        $cat_image_ref01_ent = $client->CatImage(null);
        $cat_image_ref01_match_dt0 = [
            "id" => $cat_image_ref01_data["id"],
        ];
        $cat_image_ref01_data_dt0_loaded = $cat_image_ref01_ent->load($cat_image_ref01_match_dt0, null);
        $cat_image_ref01_data_dt0_load_result = Helpers::to_map(is_object($cat_image_ref01_data_dt0_loaded) && method_exists($cat_image_ref01_data_dt0_loaded, 'data_get') ? $cat_image_ref01_data_dt0_loaded->data_get() : $cat_image_ref01_data_dt0_loaded);
        $this->assertNotNull($cat_image_ref01_data_dt0_load_result);
        $this->assertEquals($cat_image_ref01_data_dt0_load_result["id"], $cat_image_ref01_data["id"]);

    }
}

function cat_image_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/cat_image/CatImageTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AiCatsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["cat_image01", "cat_image02", "cat_image03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AI_CATS_TEST_CAT_IMAGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AI_CATS_TEST_CAT_IMAGE_ENTID" => $idmap,
        "AI_CATS_TEST_LIVE" => "FALSE",
        "AI_CATS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AI_CATS_TEST_CAT_IMAGE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["AI_CATS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new AiCatsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["AI_CATS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["AI_CATS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
