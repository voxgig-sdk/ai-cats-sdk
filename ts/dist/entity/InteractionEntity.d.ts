import { AiCatsEntityBase } from '../AiCatsEntityBase';
import type { AiCatsSDK } from '../AiCatsSDK';
import type { Control } from '../types';
import type { Interaction, InteractionListMatch, InteractionCreateData } from '../AiCatsTypes';
declare class InteractionEntity extends AiCatsEntityBase<Interaction> {
    constructor(client: AiCatsSDK, entopts: any);
    make(this: InteractionEntity): InteractionEntity;
    list(this: any, reqmatch?: InteractionListMatch, ctrl?: Control): Promise<InteractionEntity[]>;
    create(this: any, reqdata?: InteractionCreateData, ctrl?: Control): Promise<InteractionEntity>;
}
export { InteractionEntity };
