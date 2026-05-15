<?php
declare(strict_types=1);

// AiCats SDK utility: result_headers

class AiCatsResultHeaders
{
    public static function call(AiCatsContext $ctx): ?AiCatsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
