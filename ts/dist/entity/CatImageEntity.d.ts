import { AiCatsEntityBase } from '../AiCatsEntityBase';
import type { AiCatsSDK } from '../AiCatsSDK';
import type { Control } from '../types';
import type { CatImage, CatImageLoadMatch } from '../AiCatsTypes';
declare class CatImageEntity extends AiCatsEntityBase<CatImage> {
    constructor(client: AiCatsSDK, entopts: any);
    make(this: CatImageEntity): CatImageEntity;
    load(this: any, reqmatch?: CatImageLoadMatch, ctrl?: Control): Promise<CatImageEntity>;
}
export { CatImageEntity };
