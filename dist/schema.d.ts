import { Request, Response } from 'express';
export declare class Validator {
    static signupvalidtors(): import("express-validator").ValidationChain[];
    static handleError(req: Request, res: Response, next: Function): void;
}
