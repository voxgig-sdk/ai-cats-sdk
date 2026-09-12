import { CatEntity } from './entity/CatEntity';
import { CatImageEntity } from './entity/CatImageEntity';
import { HealthEntity } from './entity/HealthEntity';
import { InteractionEntity } from './entity/InteractionEntity';
import { TrainingEntity } from './entity/TrainingEntity';
export type * from './AiCatsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AiCatsEntityBase } from './AiCatsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AiCatsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Cat(entopts?: Record<string, any>): CatEntity;
    CatImage(entopts?: Record<string, any>): CatImageEntity;
    Health(entopts?: Record<string, any>): HealthEntity;
    Interaction(entopts?: Record<string, any>): InteractionEntity;
    Training(entopts?: Record<string, any>): TrainingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AiCatsSDK;
    tester(testopts?: any, sdkopts?: any): AiCatsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AiCatsSDK;
export { stdutil, config, BaseFeature, AiCatsEntityBase, AiCatsSDK, SDK, };
