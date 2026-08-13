# AiCats SDK utility: make_context

from aicats_sdk.core.context import AiCatsContext


def make_context_util(ctxmap, basectx):
    return AiCatsContext(ctxmap, basectx)
