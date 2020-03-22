import {check} from 'express-validator';
import {Request,Response} from 'express'
import {  validationResult } from 'express-validator'

export class CountrySchema{

    static createCountry(){
        return [
            
                check('country')
                .notEmpty().withMessage('country should not be empty'),
            
        ]
    }

    static getCountry(){
        return [
            check('id')
                .notEmpty().withMessage('_id should not be empty'),
        ]
    }


    static updateCountry(){
        return [
                check('country').trim()
                .notEmpty().withMessage('country should not be empty'),    
                
        ]
    }

    static handlesError(req:Request,res:Response,next:Function){
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });


            }else
             next();

    }
}



