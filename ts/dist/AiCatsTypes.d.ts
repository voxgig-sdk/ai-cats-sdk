export interface Cat {
    createdAt?: string;
    height?: number;
    id?: string;
    url?: string;
    width?: number;
}
export interface CatLoadMatch {
    id: string;
}
export interface CatImage {
    createdAt?: string;
    height?: number;
    id?: string;
    url?: string;
    width?: number;
}
export interface CatImageLoadMatch {
    createdAt?: string;
    height?: number;
    id: string;
    url?: string;
    width?: number;
}
export interface Health {
    activityLevel?: string;
    catId?: string;
    heartRate?: number;
    id?: string;
    temperature?: number;
    timestamp?: string;
    weight?: number;
}
export interface HealthLoadMatch {
    cat_id?: string;
}
export interface HealthCreateData {
    activityLevel?: string;
    catId?: string;
    heartRate?: number;
    id?: string;
    temperature?: number;
    timestamp?: string;
    weight?: number;
}
export interface Interaction {
    catId: string;
    duration?: number;
    id?: string;
    notes?: string;
    quality?: string;
    timestamp?: string;
    type: string;
}
export interface InteractionListMatch {
    cat_id?: string;
    end_date?: string;
    start_date?: string;
}
export interface InteractionCreateData {
    catId: string;
    duration?: number;
    id?: string;
    notes?: string;
    quality?: string;
    timestamp?: string;
    type: string;
}
export interface Training {
    catId: string;
    duration: number;
    id?: string;
    notes?: string;
    success?: boolean;
    timestamp?: string;
    type: string;
}
export interface TrainingListMatch {
    cat_id?: string;
    limit?: number;
}
export interface TrainingCreateData {
    catId: string;
    duration: number;
    id?: string;
    notes?: string;
    success?: boolean;
    timestamp?: string;
    type: string;
}
