// Typed models for the AiCats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cat {
  created_at?: string
  height?: number
  id?: string
  url?: string
  width?: number
}

export interface CatLoadMatch {
  id: string
}

export interface CatImage {
  created_at?: string
  height?: number
  id?: string
  url?: string
  width?: number
}

export type CatImageLoadMatch = Partial<CatImage>

export interface Health {
  activity_level?: string
  cat_id?: string
  heart_rate?: number
  id?: string
  temperature?: number
  timestamp?: string
  weight?: number
}

export type HealthLoadMatch = Partial<Health>

export type HealthCreateData = Partial<Health>

export interface Interaction {
  cat_id: string
  duration?: number
  id?: string
  note?: string
  quality?: string
  timestamp?: string
  type: string
}

export type InteractionListMatch = Partial<Interaction>

export type InteractionCreateData = Partial<Interaction>

export interface Training {
  cat_id: string
  duration: number
  id?: string
  note?: string
  success?: boolean
  timestamp?: string
  type: string
}

export type TrainingListMatch = Partial<Training>

export type TrainingCreateData = Partial<Training>

