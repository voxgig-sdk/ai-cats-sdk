# AiCats SDK utility: feature_add
module AiCatsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
