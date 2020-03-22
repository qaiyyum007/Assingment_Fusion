import {check} from 'express-validator';
import {Request,Response} from 'express'
import {  validationResult } from 'express-validator'

export class productSchema{

    static createproduct(){
        return [
            
                check('city')
                .notEmpty().withMessage('city should not be empty'),
            
        ]
    }

    static getData(){
        return [
            check('id')
                .notEmpty().withMessage('_id should not be empty'),
        ]
    }


    static updateData(){
        return [
                check('city').trim()
                .notEmpty().withMessage('city should not be empty'),    
                
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



