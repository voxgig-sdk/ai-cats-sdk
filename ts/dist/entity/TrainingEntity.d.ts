import { AiCatsEntityBase } from '../AiCatsEntityBase';
import type { AiCatsSDK } from '../AiCatsSDK';
import type { Control } from '../types';
import type { Training, TrainingListMatch, TrainingCreateData } from '../AiCatsTypes';
declare class TrainingEntity extends AiCatsEntityBase<Training> {
    constructor(client: AiCatsSDK, entopts: any);
    make(this: TrainingEntity): TrainingEntity;
    list(this: any, reqmatch?: TrainingListMatch, ctrl?: Control): Promise<TrainingEntity[]>;
    create(this: any, reqdata?: TrainingCreateData, ctrl?: Control): Promise<TrainingEntity>;
}
export { TrainingEntity };
