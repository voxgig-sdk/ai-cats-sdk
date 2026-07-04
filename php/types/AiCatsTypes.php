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
    public ?string $created_at = null;
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
    public ?string $created_at = null;
    public ?int $height = null;
    public ?string $id = null;
    public ?string $url = null;
    public ?int $width = null;
}

/** Match filter for CatImage#load (any subset of CatImage fields). */
class CatImageLoadMatch
{
    public ?string $created_at = null;
    public ?int $height = null;
    public ?string $id = null;
    public ?string $url = null;
    public ?int $width = null;
}

/** Health entity data model. */
class Health
{
    public ?string $activity_level = null;
    public ?string $cat_id = null;
    public ?int $heart_rate = null;
    public ?string $id = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?float $weight = null;
}

/** Match filter for Health#load (any subset of Health fields). */
class HealthLoadMatch
{
    public ?string $activity_level = null;
    public ?string $cat_id = null;
    public ?int $heart_rate = null;
    public ?string $id = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?float $weight = null;
}

/** Match filter for Health#create (any subset of Health fields). */
class HealthCreateData
{
    public ?string $activity_level = null;
    public ?string $cat_id = null;
    public ?int $heart_rate = null;
    public ?string $id = null;
    public ?float $temperature = null;
    public ?string $timestamp = null;
    public ?float $weight = null;
}

/** Interaction entity data model. */
class Interaction
{
    public string $cat_id;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $note = null;
    public ?string $quality = null;
    public ?string $timestamp = null;
    public string $type;
}

/** Match filter for Interaction#list (any subset of Interaction fields). */
class InteractionListMatch
{
    public ?string $cat_id = null;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $note = null;
    public ?string $quality = null;
    public ?string $timestamp = null;
    public ?string $type = null;
}

/** Match filter for Interaction#create (any subset of Interaction fields). */
class InteractionCreateData
{
    public ?string $cat_id = null;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $note = null;
    public ?string $quality = null;
    public ?string $timestamp = null;
    public ?string $type = null;
}

/** Training entity data model. */
class Training
{
    public string $cat_id;
    public int $duration;
    public ?string $id = null;
    public ?string $note = null;
    public ?bool $success = null;
    public ?string $timestamp = null;
    public string $type;
}

/** Match filter for Training#list (any subset of Training fields). */
class TrainingListMatch
{
    public ?string $cat_id = null;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $note = null;
    public ?bool $success = null;
    public ?string $timestamp = null;
    public ?string $type = null;
}

/** Match filter for Training#create (any subset of Training fields). */
class TrainingCreateData
{
    public ?string $cat_id = null;
    public ?int $duration = null;
    public ?string $id = null;
    public ?string $note = null;
    public ?bool $success = null;
    public ?string $timestamp = null;
    public ?string $type = null;
}

