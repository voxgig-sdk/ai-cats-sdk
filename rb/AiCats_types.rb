# frozen_string_literal: true

# Typed models for the AiCats SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Cat entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Cat = Struct.new(
  :created_at,
  :height,
  :id,
  :url,
  :width,
  keyword_init: true
)

# Request payload for Cat#load.
#
# @!attribute [rw] id
#   @return [String]
CatLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# CatImage entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
CatImage = Struct.new(
  :created_at,
  :height,
  :id,
  :url,
  :width,
  keyword_init: true
)

# Request payload for CatImage#load.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
CatImageLoadMatch = Struct.new(
  :created_at,
  :height,
  :id,
  :url,
  :width,
  keyword_init: true
)

# Health entity data model.
#
# @!attribute [rw] activity_level
#   @return [String, nil]
#
# @!attribute [rw] cat_id
#   @return [String, nil]
#
# @!attribute [rw] heart_rate
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
Health = Struct.new(
  :activity_level,
  :cat_id,
  :heart_rate,
  :id,
  :temperature,
  :timestamp,
  :weight,
  keyword_init: true
)

# Request payload for Health#load.
#
# @!attribute [rw] activity_level
#   @return [String, nil]
#
# @!attribute [rw] cat_id
#   @return [String, nil]
#
# @!attribute [rw] heart_rate
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
HealthLoadMatch = Struct.new(
  :activity_level,
  :cat_id,
  :heart_rate,
  :id,
  :temperature,
  :timestamp,
  :weight,
  keyword_init: true
)

# Request payload for Health#create.
#
# @!attribute [rw] activity_level
#   @return [String, nil]
#
# @!attribute [rw] cat_id
#   @return [String, nil]
#
# @!attribute [rw] heart_rate
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
HealthCreateData = Struct.new(
  :activity_level,
  :cat_id,
  :heart_rate,
  :id,
  :temperature,
  :timestamp,
  :weight,
  keyword_init: true
)

# Interaction entity data model.
#
# @!attribute [rw] cat_id
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] quality
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
Interaction = Struct.new(
  :cat_id,
  :duration,
  :id,
  :note,
  :quality,
  :timestamp,
  :type,
  keyword_init: true
)

# Request payload for Interaction#list.
#
# @!attribute [rw] cat_id
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] quality
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
InteractionListMatch = Struct.new(
  :cat_id,
  :duration,
  :id,
  :note,
  :quality,
  :timestamp,
  :type,
  keyword_init: true
)

# Request payload for Interaction#create.
#
# @!attribute [rw] cat_id
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] quality
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
InteractionCreateData = Struct.new(
  :cat_id,
  :duration,
  :id,
  :note,
  :quality,
  :timestamp,
  :type,
  keyword_init: true
)

# Training entity data model.
#
# @!attribute [rw] cat_id
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
Training = Struct.new(
  :cat_id,
  :duration,
  :id,
  :note,
  :success,
  :timestamp,
  :type,
  keyword_init: true
)

# Request payload for Training#list.
#
# @!attribute [rw] cat_id
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
TrainingListMatch = Struct.new(
  :cat_id,
  :duration,
  :id,
  :note,
  :success,
  :timestamp,
  :type,
  keyword_init: true
)

# Request payload for Training#create.
#
# @!attribute [rw] cat_id
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
TrainingCreateData = Struct.new(
  :cat_id,
  :duration,
  :id,
  :note,
  :success,
  :timestamp,
  :type,
  keyword_init: true
)

