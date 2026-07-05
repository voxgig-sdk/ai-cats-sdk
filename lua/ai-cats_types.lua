-- Typed models for the AiCats SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cat
---@field created_at? string
---@field height? number
---@field id? string
---@field url? string
---@field width? number

---@class CatLoadMatch
---@field id string

---@class CatImage
---@field created_at? string
---@field height? number
---@field id? string
---@field url? string
---@field width? number

---@class CatImageLoadMatch
---@field created_at? string
---@field height? number
---@field id string
---@field url? string
---@field width? number

---@class Health
---@field activity_level? string
---@field cat_id? string
---@field heart_rate? number
---@field id? string
---@field temperature? number
---@field timestamp? string
---@field weight? number

---@class HealthLoadMatch
---@field activity_level? string
---@field cat_id? string
---@field heart_rate? number
---@field id string
---@field temperature? number
---@field timestamp? string
---@field weight? number

---@class HealthCreateData
---@field activity_level? string
---@field cat_id? string
---@field heart_rate? number
---@field id? string
---@field temperature? number
---@field timestamp? string
---@field weight? number

---@class Interaction
---@field cat_id string
---@field duration? number
---@field id? string
---@field note? string
---@field quality? string
---@field timestamp? string
---@field type string

---@class InteractionListMatch
---@field cat_id? string
---@field duration? number
---@field id? string
---@field note? string
---@field quality? string
---@field timestamp? string
---@field type? string

---@class InteractionCreateData
---@field cat_id string
---@field duration? number
---@field id? string
---@field note? string
---@field quality? string
---@field timestamp? string
---@field type string

---@class Training
---@field cat_id string
---@field duration number
---@field id? string
---@field note? string
---@field success? boolean
---@field timestamp? string
---@field type string

---@class TrainingListMatch
---@field cat_id? string
---@field duration? number
---@field id? string
---@field note? string
---@field success? boolean
---@field timestamp? string
---@field type? string

---@class TrainingCreateData
---@field cat_id string
---@field duration number
---@field id? string
---@field note? string
---@field success? boolean
---@field timestamp? string
---@field type string

local M = {}

return M
