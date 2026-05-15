<?php
declare(strict_types=1);

// AiCats SDK utility: feature_add

class AiCatsFeatureAdd
{
    public static function call(AiCatsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
