# AiCats SDK exists test

require "minitest/autorun"
require_relative "../AiCats_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AiCatsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
