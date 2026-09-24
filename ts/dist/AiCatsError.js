"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiCatsError = void 0;
class AiCatsError extends Error {
    isAiCatsError = true;
    sdk = 'AiCats';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AiCatsError = AiCatsError;
//# sourceMappingURL=AiCatsError.js.map