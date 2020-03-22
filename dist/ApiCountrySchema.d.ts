import { Request, Response } from 'express';
export declare class CountrySchema {
    static createCountry(): import("express-validator").ValidationChain[];
    static getCountry(): import("express-validator").ValidationChain[];
    static updateCountry(): import("express-validator").ValidationChain[];
    static handlesError(req: Request, res: Response, next: Function): void;
}
