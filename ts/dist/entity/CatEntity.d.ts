import { AiCatsEntityBase } from '../AiCatsEntityBase';
import type { AiCatsSDK } from '../AiCatsSDK';
import type { Control } from '../types';
import type { Cat, CatLoadMatch } from '../AiCatsTypes';
declare class CatEntity extends AiCatsEntityBase<Cat> {
    constructor(client: AiCatsSDK, entopts: any);
    make(this: CatEntity): CatEntity;
    load(this: any, reqmatch?: CatLoadMatch, ctrl?: Control): Promise<CatEntity>;
}
export { CatEntity };
