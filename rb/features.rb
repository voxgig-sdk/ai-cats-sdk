# AiCats SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AiCatsFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiCatsBaseFeature.new
    when "ratelimit"
      AiCatsRatelimitFeature.new
    when "retry"
      AiCatsRetryFeature.new
    when "test"
      AiCatsTestFeature.new
    when "timeout"
      AiCatsTimeoutFeature.new
    else
      AiCatsBaseFeature.new
    end
  end
end
