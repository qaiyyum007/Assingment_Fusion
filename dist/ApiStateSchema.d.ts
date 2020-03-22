import { Request, Response } from 'express';
export declare class StateSchema {
    static createState(): import("express-validator").ValidationChain[];
    static getState(): import("express-validator").ValidationChain[];
    static updateState(): import("express-validator").ValidationChain[];
    static handlesError(req: Request, res: Response, next: Function): void;
}
