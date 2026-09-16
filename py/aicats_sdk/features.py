# AiCats SDK feature factory

from aicats_sdk.feature.base_feature import AiCatsBaseFeature
from aicats_sdk.feature.ratelimit_feature import AiCatsRatelimitFeature
from aicats_sdk.feature.retry_feature import AiCatsRetryFeature
from aicats_sdk.feature.test_feature import AiCatsTestFeature
from aicats_sdk.feature.timeout_feature import AiCatsTimeoutFeature


_FEATURES = {
    "base": lambda: AiCatsBaseFeature(),
    "ratelimit": lambda: AiCatsRatelimitFeature(),
    "retry": lambda: AiCatsRetryFeature(),
    "test": lambda: AiCatsTestFeature(),
    "timeout": lambda: AiCatsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
