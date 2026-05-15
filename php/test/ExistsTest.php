<?php
declare(strict_types=1);

// AiCats SDK exists test

require_once __DIR__ . '/../aicats_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AiCatsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
