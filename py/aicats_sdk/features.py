# AiCats SDK feature factory

from aicats_sdk.feature.base_feature import AiCatsBaseFeature
from aicats_sdk.feature.test_feature import AiCatsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AiCatsBaseFeature(),
        "test": lambda: AiCatsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
