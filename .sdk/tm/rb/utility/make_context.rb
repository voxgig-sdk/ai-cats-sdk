# AiCats SDK utility: make_context
require_relative '../core/context'
module AiCatsUtilities
  MakeContext = ->(ctxmap, basectx) {
    AiCatsContext.new(ctxmap, basectx)
  }
end
