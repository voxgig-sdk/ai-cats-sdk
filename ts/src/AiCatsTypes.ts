// Typed models for the AiCats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cat {
  createdAt?: string
  height?: number
  id?: string
  url?: string
  width?: number
}

export interface CatLoadMatch {
  id: string
}

export interface CatImage {
  createdAt?: string
  height?: number
  id?: string
  url?: string
  width?: number
}

export interface CatImageLoadMatch {
  createdAt?: string
  height?: number
  id: string
  url?: string
  width?: number
}

export interface Health {
  activityLevel?: string
  catId?: string
  heartRate?: number
  id?: string
  temperature?: number
  timestamp?: string
  weight?: number
}

export interface HealthLoadMatch {
  activityLevel?: string
  catId?: string
  heartRate?: number
  id: string
  temperature?: number
  timestamp?: string
  weight?: number
}

export interface HealthCreateData {
  activityLevel?: string
  catId?: string
  heartRate?: number
  id?: string
  temperature?: number
  timestamp?: string
  weight?: number
}

export interface Interaction {
  catId: string
  duration?: number
  id?: string
  notes?: string
  quality?: string
  timestamp?: string
  type: string
}

export interface InteractionListMatch {
  catId?: string
  duration?: number
  id?: string
  notes?: string
  quality?: string
  timestamp?: string
  type?: string
}

export interface InteractionCreateData {
  catId: string
  duration?: number
  id?: string
  notes?: string
  quality?: string
  timestamp?: string
  type: string
}

export interface Training {
  catId: string
  duration: number
  id?: string
  notes?: string
  success?: boolean
  timestamp?: string
  type: string
}

export interface TrainingListMatch {
  catId?: string
  duration?: number
  id?: string
  notes?: string
  success?: boolean
  timestamp?: string
  type?: string
}

export interface TrainingCreateData {
  catId: string
  duration: number
  id?: string
  notes?: string
  success?: boolean
  timestamp?: string
  type: string
}

