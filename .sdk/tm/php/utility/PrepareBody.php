<?php
declare(strict_types=1);

// AiCats SDK utility: prepare_body

class AiCatsPrepareBody
{
    public static function call(AiCatsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
