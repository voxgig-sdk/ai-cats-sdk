<?php
declare(strict_types=1);

// AiCats SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AiCatsMakeContext
{
    public static function call(array $ctxmap, ?AiCatsContext $basectx): AiCatsContext
    {
        return new AiCatsContext($ctxmap, $basectx);
    }
}
