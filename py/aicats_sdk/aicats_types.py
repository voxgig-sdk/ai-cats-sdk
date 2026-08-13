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
    createdAt: str
    height: int
    id: str
    url: str
    width: int


class CatLoadMatch(TypedDict):
    id: str


class CatImage(TypedDict, total=False):
    createdAt: str
    height: int
    id: str
    url: str
    width: int


class CatImageLoadMatchRequired(TypedDict):
    id: str


class CatImageLoadMatch(CatImageLoadMatchRequired, total=False):
    createdAt: str
    height: int
    url: str
    width: int


class Health(TypedDict, total=False):
    activityLevel: str
    catId: str
    heartRate: int
    id: str
    temperature: float
    timestamp: str
    weight: float


class HealthLoadMatchRequired(TypedDict):
    id: str


class HealthLoadMatch(HealthLoadMatchRequired, total=False):
    activityLevel: str
    catId: str
    heartRate: int
    temperature: float
    timestamp: str
    weight: float


class HealthCreateData(TypedDict, total=False):
    activityLevel: str
    catId: str
    heartRate: int
    id: str
    temperature: float
    timestamp: str
    weight: float


class InteractionRequired(TypedDict):
    catId: str
    type: str


class Interaction(InteractionRequired, total=False):
    duration: int
    id: str
    notes: str
    quality: str
    timestamp: str


class InteractionListMatch(TypedDict, total=False):
    catId: str
    duration: int
    id: str
    notes: str
    quality: str
    timestamp: str
    type: str


class InteractionCreateDataRequired(TypedDict):
    catId: str
    type: str


class InteractionCreateData(InteractionCreateDataRequired, total=False):
    duration: int
    id: str
    notes: str
    quality: str
    timestamp: str


class TrainingRequired(TypedDict):
    catId: str
    duration: int
    type: str


class Training(TrainingRequired, total=False):
    id: str
    notes: str
    success: bool
    timestamp: str


class TrainingListMatch(TypedDict, total=False):
    catId: str
    duration: int
    id: str
    notes: str
    success: bool
    timestamp: str
    type: str


class TrainingCreateDataRequired(TypedDict):
    catId: str
    duration: int
    type: str


class TrainingCreateData(TrainingCreateDataRequired, total=False):
    id: str
    notes: str
    success: bool
    timestamp: str
