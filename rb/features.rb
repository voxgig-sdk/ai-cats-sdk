# AiCats SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AiCatsFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiCatsBaseFeature.new
    when "test"
      AiCatsTestFeature.new
    else
      AiCatsBaseFeature.new
    end
  end
end
