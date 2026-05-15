<?php
declare(strict_types=1);

// AiCats SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AiCatsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AiCatsBaseFeature();
            case "test":
                return new AiCatsTestFeature();
            default:
                return new AiCatsBaseFeature();
        }
    }
}
