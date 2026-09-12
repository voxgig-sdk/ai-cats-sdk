import { AiCatsEntityBase } from '../AiCatsEntityBase';
import type { AiCatsSDK } from '../AiCatsSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch, HealthCreateData } from '../AiCatsTypes';
declare class HealthEntity extends AiCatsEntityBase<Health> {
    constructor(client: AiCatsSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
    create(this: any, reqdata?: HealthCreateData, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
