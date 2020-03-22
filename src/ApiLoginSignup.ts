import *as express from "express";
const expressRouter = express.Router();
import { Database } from "./Database";
import { Request, Response } from "express";
import { Validator } from "./ApiLoginSchema";
import * as bcrypt from 'bcrypt'

import * as jwt from "jsonwebtoken";
import { Collection } from "mongoose";
import { ObjectID } from "mongodb";
import { app } from "./app";
export class ApiLoginSignup {
    dataRouter: any
    constructor() {
        this.dataRouter = expressRouter;

        this.dataRouter.post('/signup' ,Validator.signupSchema(), Validator.handleError,async(req:Request,res:Response)=>{
            try{
              

            
                console.log(req.body)
                const salt = await bcrypt.genSalt()
               req.body.password= await bcrypt.hashSync(req.body.password,10)
               
               
                const docs =await new Database().createOne({
                    collection :'Admindb',
                    data:req.body

                })
                
               res.status(200).send(docs)
            }
            
            catch (err){
                res.status(500).send(`${err.Message}-${err.stack}`)
                console.log(`${err.Message}-${err.stack}`)

            }
        })

        this.dataRouter.post("/login", Validator.loginSchema(), Validator.handleError, async (req: Request, res: Response) => {
            try {
              
                
                const docs: any = await new Database().readOne({
                    collection: "Admindb",
                    criteria: { email: req.body.email, password: req.body.password },
                    projection: {}
                });
                if (docs) {
                    const token = jwt.sign({ "email": req.body.email }, "secretKey");
                    res.status(200).send(token)
                    console.log(token);
                } else
                    res.status(404).send(`Incorrect username/password.`)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
            };
        });




        



        this.dataRouter.get("/login",Validator.loginSchema(), Validator.handleError, async (req: Request, res: Response) => {
            try {
                const docs: any = await new Database().readOne({
                    collection: "Admindb",
                    criteria: {},
                    projection: {}
                });
                if (docs) {
                    const token = jwt.sign({ "email": req.body.email }, "secretKey");
                    res.status(200).send(token)
                    console.log(token);
                } else{
                    res.status(404).send(`Incorrect username/password.`)
                }
         }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
            };
        });

        this.dataRouter.put("/change_password",  Validator.ChangePasswordSchema(), Validator.handleError, 
        async (req:Request ,res:Response) => {
            try{
                let dat = { $set: {
                    'password' : bcrypt.hashSync(req.body.password, req.app.get('saltRounds')),
                    'updated_at' : new Date()
                } 
                };
                const updateOneParams = {
                    collection      : "Admindb",
                    criteria        : { "_id": new ObjectID(req.body.id) },
                    data            : dat
                }
                const docs = await new Database().updateOne(updateOneParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        })

    }
}
