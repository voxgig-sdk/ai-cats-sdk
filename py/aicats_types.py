# Typed models for the AiCats SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Cat:
    created_at: Optional[str] = None
    height: Optional[int] = None
    id: Optional[str] = None
    url: Optional[str] = None
    width: Optional[int] = None


@dataclass
class CatLoadMatch:
    id: str


@dataclass
class CatImage:
    created_at: Optional[str] = None
    height: Optional[int] = None
    id: Optional[str] = None
    url: Optional[str] = None
    width: Optional[int] = None


@dataclass
class CatImageLoadMatch:
    created_at: Optional[str] = None
    height: Optional[int] = None
    id: Optional[str] = None
    url: Optional[str] = None
    width: Optional[int] = None


@dataclass
class Health:
    activity_level: Optional[str] = None
    cat_id: Optional[str] = None
    heart_rate: Optional[int] = None
    id: Optional[str] = None
    temperature: Optional[float] = None
    timestamp: Optional[str] = None
    weight: Optional[float] = None


@dataclass
class HealthLoadMatch:
    activity_level: Optional[str] = None
    cat_id: Optional[str] = None
    heart_rate: Optional[int] = None
    id: Optional[str] = None
    temperature: Optional[float] = None
    timestamp: Optional[str] = None
    weight: Optional[float] = None


@dataclass
class HealthCreateData:
    activity_level: Optional[str] = None
    cat_id: Optional[str] = None
    heart_rate: Optional[int] = None
    id: Optional[str] = None
    temperature: Optional[float] = None
    timestamp: Optional[str] = None
    weight: Optional[float] = None


@dataclass
class Interaction:
    cat_id: str
    type: str
    duration: Optional[int] = None
    id: Optional[str] = None
    note: Optional[str] = None
    quality: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class InteractionListMatch:
    cat_id: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[str] = None
    note: Optional[str] = None
    quality: Optional[str] = None
    timestamp: Optional[str] = None
    type: Optional[str] = None


@dataclass
class InteractionCreateData:
    cat_id: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[str] = None
    note: Optional[str] = None
    quality: Optional[str] = None
    timestamp: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Training:
    cat_id: str
    duration: int
    type: str
    id: Optional[str] = None
    note: Optional[str] = None
    success: Optional[bool] = None
    timestamp: Optional[str] = None


@dataclass
class TrainingListMatch:
    cat_id: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[str] = None
    note: Optional[str] = None
    success: Optional[bool] = None
    timestamp: Optional[str] = None
    type: Optional[str] = None


@dataclass
class TrainingCreateData:
    cat_id: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[str] = None
    note: Optional[str] = None
    success: Optional[bool] = None
    timestamp: Optional[str] = None
    type: Optional[str] = None

