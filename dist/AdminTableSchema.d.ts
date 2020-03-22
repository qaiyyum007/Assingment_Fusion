import { Request, Response } from 'express';
export declare class productSchema {
    static createproduct(): import("express-validator").ValidationChain[];
    static getData(): import("express-validator").ValidationChain[];
    static updateData(): import("express-validator").ValidationChain[];
    static handlesError(req: Request, res: Response, next: Function): void;
}
