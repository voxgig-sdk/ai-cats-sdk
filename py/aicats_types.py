# Typed models for the AiCats SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Cat(TypedDict, total=False):
    created_at: str
    height: int
    id: str
    url: str
    width: int


class CatLoadMatch(TypedDict):
    id: str


class CatImage(TypedDict, total=False):
    created_at: str
    height: int
    id: str
    url: str
    width: int


class CatImageLoadMatch(TypedDict, total=False):
    created_at: str
    height: int
    id: str
    url: str
    width: int


class Health(TypedDict, total=False):
    activity_level: str
    cat_id: str
    heart_rate: int
    id: str
    temperature: float
    timestamp: str
    weight: float


class HealthLoadMatch(TypedDict, total=False):
    activity_level: str
    cat_id: str
    heart_rate: int
    id: str
    temperature: float
    timestamp: str
    weight: float


class HealthCreateData(TypedDict, total=False):
    activity_level: str
    cat_id: str
    heart_rate: int
    id: str
    temperature: float
    timestamp: str
    weight: float


class InteractionRequired(TypedDict):
    cat_id: str
    type: str


class Interaction(InteractionRequired, total=False):
    duration: int
    id: str
    note: str
    quality: str
    timestamp: str


class InteractionListMatch(TypedDict, total=False):
    cat_id: str
    duration: int
    id: str
    note: str
    quality: str
    timestamp: str
    type: str


class InteractionCreateData(TypedDict, total=False):
    cat_id: str
    duration: int
    id: str
    note: str
    quality: str
    timestamp: str
    type: str


class TrainingRequired(TypedDict):
    cat_id: str
    duration: int
    type: str


class Training(TrainingRequired, total=False):
    id: str
    note: str
    success: bool
    timestamp: str


class TrainingListMatch(TypedDict, total=False):
    cat_id: str
    duration: int
    id: str
    note: str
    success: bool
    timestamp: str
    type: str


class TrainingCreateData(TypedDict, total=False):
    cat_id: str
    duration: int
    id: str
    note: str
    success: bool
    timestamp: str
    type: str
