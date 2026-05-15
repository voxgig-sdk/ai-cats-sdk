# AiCats SDK utility: make_context

from core.context import AiCatsContext


def make_context_util(ctxmap, basectx):
    return AiCatsContext(ctxmap, basectx)
