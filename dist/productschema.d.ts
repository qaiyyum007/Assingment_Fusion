import { Request, Response } from 'express';
export declare class productSchema {
    static createproduct(): import("express-validator").ValidationChain[];
    static getdata(): import("express-validator").ValidationChain[];
    static updatedata(): import("express-validator").ValidationChain[];
    static handlesError(req: Request, res: Response, next: Function): void;
}
