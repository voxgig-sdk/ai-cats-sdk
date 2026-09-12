import { Context } from './Context';
declare class AiCatsError extends Error {
    isAiCatsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AiCatsError };
