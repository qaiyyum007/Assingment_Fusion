import {check} from 'express-validator';
import {Request,Response} from 'express'
import {  validationResult } from 'express-validator'

export class StateSchema{

    static createState(){
        return [
            
                check('state')
                .notEmpty().withMessage('state should not be empty'),
            
        ]
    }

    static getState(){
        return [
            check('id')
                .notEmpty().withMessage('_id should not be empty'),
        ]
    }


    static updateState(){
        return [
                check('state').trim()
                .notEmpty().withMessage('state should not be empty'),    
                
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



