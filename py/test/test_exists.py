# AiCats SDK exists test

import pytest
from aicats_sdk import AiCatsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AiCatsSDK.test(None, None)
        assert testsdk is not None
