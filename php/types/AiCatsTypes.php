<?php
declare(strict_types=1);

// Typed models for the AiCats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cat entity data model. */
class Cat
{
    public ?string $createdAt = null;
    public ?int $height = null;
    public ?string $id = null;
    public ?string $url = null;
    public ?int $width = null;
}

/** Request payload for Cat#load. */
class CatLoadMatch
{
    public string $id;
}

/** CatImage entity data model. */
class CatImage
{
    public ?string $createdAt = null;
    public ?int $height = null;
    public ?string $id = null;
    public ?string $url = null;
    public ?int $width = null;
}

/** Request payload for CatImage#load. */
class CatImageLoadMatch
{
    public ?string $createdAt = null;
    public ?int $height = null;
    public string $id;
    public ?string $url = null;
    public ?int $width = null;
}

/** Health entity data model. */
class Health
{
    public ?string $activityLevel = null;
    public ?string $catId = null;
    public ?int $heartRate = null;
    public ?string $id = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?float $weight = null;
}

/** Request payload for Health#load. */
class HealthLoadMatch
{
    public ?string $activityLevel = null;
    public ?string $catId = null;
    public ?int $heartRate = null;
    public string $id;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?float $weight = null;
}

/** Request payload for Health#create. */
class HealthCreateData
{
    public ?string $activityLevel = null;
    public ?string $catId = null;
    public ?int $heartRate = null;
    public ?string $id = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?float $weight = null;
}

/** Interaction entity data model. */
class Interaction
{
    public string $catId;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $notes = null;
    public ?string $quality = null;
    public ?string $timestamp = null;
    public string $type;
}

/** Request payload for Interaction#list. */
class InteractionListMatch
{
    public ?string $catId = null;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $notes = null;
    public ?string $quality = null;
    public ?string $timestamp = null;
    public ?string $type = null;
}

/** Request payload for Interaction#create. */
class InteractionCreateData
{
    public string $catId;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $notes = null;
    public ?string $quality = null;
    public ?string $timestamp = null;
    public string $type;
}

/** Training entity data model. */
class Training
{
    public string $catId;
    public int $duration;
    public ?string $id = null;
    public ?string $notes = null;
    public ?bool $success = null;
    public ?string $timestamp = null;
    public string $type;
}

/** Request payload for Training#list. */
class TrainingListMatch
{
    public ?string $catId = null;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $notes = null;
    public ?bool $success = null;
    public ?string $timestamp = null;
    public ?string $type = null;
}

/** Request payload for Training#create. */
class TrainingCreateData
{
    public string $catId;
    public int $duration;
    public ?string $id = null;
    public ?string $notes = null;
    public ?bool $success = null;
    public ?string $timestamp = null;
    public string $type;
}

