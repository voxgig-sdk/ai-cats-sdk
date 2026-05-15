<?php
declare(strict_types=1);

// AiCats SDK utility: result_body

class AiCatsResultBody
{
    public static function call(AiCatsContext $ctx): ?AiCatsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
